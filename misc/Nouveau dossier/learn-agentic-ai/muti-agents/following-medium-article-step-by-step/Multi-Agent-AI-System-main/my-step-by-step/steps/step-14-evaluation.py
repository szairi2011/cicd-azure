#!/usr/bin/env python3
# step-14-evaluation.py
# Setting up evaluations for the multi-agent system

import sys
import os
import uuid
import asyncio
import importlib.util
from typing import Dict, Any, List, TypedDict, Annotated
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.types import Command

# Add parent directory to path for imports when running directly
if __name__ == "__main__":
    sys.path.append('..')

# Helper function for importing modules
def import_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

try:
    print("Setting up evaluation framework...")
    # Import all necessary modules
    base_path = os.path.dirname(os.path.abspath(__file__))
    
    # Import LLM
    llm_module = import_module("step_01_setup_ollama", 
                              os.path.join(base_path, "step-01-setup_ollama.py"))
    llm = llm_module.llm
    
    # Import final agent graph
    memory_module = import_module("step_12_long_term_memory", 
                                  os.path.join(base_path, "step-12-long_term_memory.py"))
    multi_agent_final_graph = memory_module.multi_agent_final_graph
    
    # Import supervisor agent for single-step evaluation
    supervisor_module = import_module("step_10_supervisor_agent", 
                                     os.path.join(base_path, "step-10-supervisor_agent.py"))
    supervisor_prebuilt = supervisor_module.supervisor_prebuilt
    
    # Check for LangSmith installation and install if needed
    try:
        from langsmith import Client
    except ImportError:
        print("Installing LangSmith client...")
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "langsmith"])
        from langsmith import Client
    
    # Set LangSmith API key if not already set
    langsmith_api_key = os.environ.get("LANGSMITH_API_KEY")
    if not langsmith_api_key:
        print("Warning: LANGSMITH_API_KEY not set. Some evaluation features may not work.")
        print("You can set it using: export LANGSMITH_API_KEY=your_key")
    
    # Initialize LangSmith client
    client = Client()
    
    # Define grade criteria schema for LLM-as-a-judge evaluation
    class Grade(TypedDict):
        """Compare the expected and actual answers and grade the actual answer."""
        reasoning: Annotated[str, ..., "Explain your reasoning for whether the actual response is correct or not."]
        is_correct: Annotated[bool, ..., "True if the student response is mostly or exactly correct, otherwise False."]
    
    # Custom definition of LLM-as-judge instructions
    grader_instructions = """You are a teacher grading a quiz.

    You will be given a QUESTION, the GROUND TRUTH (correct) RESPONSE, and the STUDENT RESPONSE.

    Here is the grade criteria to follow:
    (1) Grade the student responses based ONLY on their factual accuracy relative to the ground truth answer.
    (2) Ensure that the student response does not contain any conflicting statements.
    (3) It is OK if the student response contains more information than the ground truth response, as long as it is factually accurate relative to the ground truth response.

    Correctness:
    True means that the student's response meets all of the criteria.
    False means that the student's response does not meet all of the criteria.

    Explain your reasoning in a step-by-step manner to ensure your reasoning and conclusion are correct."""
    
    # Configure the judge LLM to output structured data according to the Grade schema
    grader_llm = llm.with_structured_output(Grade, method="json_schema", strict=True)
    
    # ----------------------
    # FINAL RESPONSE EVALUATION
    # ----------------------
    
    # Define a function to run the graph and handle verification interrupts
    async def run_graph(inputs: dict):
        """Run graph and track the final response for evaluation."""
        # Creating a unique thread ID for each evaluation run to ensure isolation
        thread_id = uuid.uuid4()
        # Configuration for the graph invocation
        configuration = {"configurable": {"thread_id": thread_id, "user_id": "10"}}

        # Invoke the graph with the initial user question
        result = await multi_agent_final_graph.ainvoke(
            {"messages": [{"role": "user", "content": inputs['question']}]}, 
            config=configuration
        )
        
        # After the first invocation, if an interrupt occurred, resume it
        result = await multi_agent_final_graph.ainvoke(
            Command(resume="My customer ID is 10"), 
            config={"configurable": {"thread_id": thread_id, "user_id": "10"}}
        )
        
        # Return the content of the last message in the conversation as the final response
        return {"response": result['messages'][-1].content}
    
    # Define the custom evaluator function for final answer correctness
    async def final_answer_correct(inputs: dict, outputs: dict, reference_outputs: dict) -> bool:
        """Evaluate if the final response is equivalent to reference response."""
        # Construct the user prompt for the grader LLM
        user = f"""QUESTION: {inputs['question']}
        GROUND TRUTH RESPONSE: {reference_outputs['response']}
        STUDENT RESPONSE: {outputs['response']}"""

        # Invoke the structured grader LLM
        grade = await grader_llm.ainvoke([
            {"role": "system", "content": grader_instructions}, 
            {"role": "user", "content": user}
        ])
        
        # Return the is_correct boolean from the grader's output
        return grade["is_correct"]
    
    # ----------------------
    # SINGLE STEP EVALUATION
    # ----------------------
    
    # Define a function to evaluate just the supervisor's routing decision
    async def run_supervisor_routing(inputs: dict):
        """Runs the supervisor graph up to the point of routing and returns the chosen route."""
        # Invoke the supervisor_prebuilt graph
        result = await supervisor_prebuilt.ainvoke(
            {"messages": [HumanMessage(content=inputs['messages'])]},
            interrupt_before=["music_catalog_subagent", "invoice_information_subagent"],
            config={"configurable": {"thread_id": uuid.uuid4(), "user_id": "10"}}
        )
        
        # Return the name of the last message (the routing decision)
        return {"route": result["messages"][-1].name}
    
    # Simple exact match evaluator for single-step routing
    def correct(outputs: dict, reference_outputs: dict) -> bool:
        """Evaluator function to check if the agent chose the correct route."""
        return outputs['route'] == reference_outputs["route"]
    
    # ----------------------
    # TRAJECTORY EVALUATION
    # ----------------------
    
    # Define a function to track the full trajectory of the agent
    async def run_trajectory_graph(inputs: dict) -> dict:
        """Run graph and track the trajectory it takes along with the final response."""
        trajectory = []  # List to store the names of nodes visited
        thread_id = uuid.uuid4()  # Unique ID for the current thread
        # Configuration for the graph invocation
        configuration = {"configurable": {"thread_id": thread_id, "user_id": "10"}}

        # First, run the graph for the initial question
        async for chunk in multi_agent_final_graph.astream(
            {"messages": [{"role": "user", "content": inputs['question']}]}, 
            config=configuration, 
            stream_mode="debug"
        ):
            # Check if the chunk type is 'task' (indicating a node execution)
            if chunk['type'] == 'task':
                # Append the name of the executed node to our trajectory list
                trajectory.append(chunk['payload']['name'])

        # If the graph paused for human input, resume it with a dummy customer ID
        async for chunk in multi_agent_final_graph.astream(
            Command(resume="My customer ID is 10"), 
            config=configuration, 
            stream_mode="debug"
        ):
            if chunk['type'] == 'task':
                trajectory.append(chunk['payload']['name'])
                
        # Return the collected trajectory list
        return {"trajectory": trajectory}
    
    # Evaluator to check exact match of trajectory
    def evaluate_exact_match(outputs: dict, reference_outputs: dict):
        """Evaluate whether the trajectory exactly matches the expected output"""
        return {
            "key": "exact_match",  # The key for this evaluation metric in LangSmith
            "score": outputs["trajectory"] == reference_outputs["trajectory"]  # True if trajectories are identical
        }

    # Evaluator to count unmatched steps in trajectory
    def evaluate_extra_steps(outputs: dict, reference_outputs: dict) -> dict:
        """Evaluate the number of unmatched steps in the agent's output trajectory compared to the reference."""
        i = j = 0  # Pointers for reference trajectory (i) and actual output trajectory (j)
        unmatched_steps = 0  # Counter for steps in output not found in reference sequence

        # Iterate through both trajectories to find matches and count mismatches
        while i < len(reference_outputs['trajectory']) and j < len(outputs['trajectory']):
            if reference_outputs['trajectory'][i] == outputs['trajectory'][j]:
                i += 1  # Match found, move to the next step in reference trajectory
            else:
                unmatched_steps += 1  # Step in output is not the expected one, count as unmatched
            j += 1  # Always move to the next step in outputs trajectory

        # Count remaining unmatched steps
        unmatched_steps += len(outputs['trajectory']) - j

        return {
            "key": "unmatched_steps",  # The key for this evaluation metric
            "score": unmatched_steps,  # The count of unmatched steps
        }
    
    # ----------------------
    # DEMO EVALUATIONS
    # ----------------------
    
    # Define some example datasets for each evaluation type
    final_response_examples = [
        {
            "question": "My name is Aaron Mitchell. My number associated with my account is +1 (204) 452-6452. I am trying to find the invoice number for my most recent song purchase. Could you help me with it?",
            "response": "The Invoice ID of your most recent purchase was 342.",
        },
        {
            "question": "I'd like a refund.",
            "response": "I need additional information to help you with the refund. Could you please provide your customer identifier so that we can fetch your purchase history?",
        }
    ]
    
    single_step_examples = [
        {
            "messages": "My customer ID is 1. What's my most recent purchase? and What albums does the catalog have by U2?", 
            "route": 'transfer_to_invoice_information_subagent'
        },
        {
            "messages": "What songs do you have by U2?", 
            "route": 'transfer_to_music_catalog_subagent'
        }
    ]
    
    trajectory_examples = [
        {
            "question": "My customer ID is 1. What's my most recent purchase? and What albums does the catalog have by U2?",
            "trajectory": ["verify_info", "load_memory", "supervisor", "create_memory"],
        },
        {
            "question": "What songs do you have by U2?",
            "trajectory": ["verify_info", "human_input", "verify_info", "load_memory", "supervisor", "create_memory"],
        }
    ]
    
    # Define a demo function to run all evaluations
    async def run_demo_evaluations():
        print("\n--- DEMO EVALUATIONS ---")
        
        # Demo final response evaluation
        print("\n1. Final Response Evaluation:")
        example = final_response_examples[0]
        result = await run_graph({"question": example["question"]})
        is_correct = await final_answer_correct(
            {"question": example["question"]},
            result,
            {"response": example["response"]}
        )
        print(f"Question: {example['question']}")
        print(f"Expected response: {example['response']}")
        print(f"Actual response: {result['response']}")
        print(f"Is correct: {is_correct}")
        
        # Demo single step evaluation
        print("\n2. Single Step Evaluation:")
        example = single_step_examples[0]
        result = await run_supervisor_routing({"messages": example["messages"]})
        is_route_correct = correct(result, {"route": example["route"]})
        print(f"Input: {example['messages']}")
        print(f"Expected route: {example['route']}")
        print(f"Actual route: {result['route']}")
        print(f"Is correct: {is_route_correct}")
        
        # Demo trajectory evaluation
        print("\n3. Trajectory Evaluation:")
        example = trajectory_examples[0]
        result = await run_trajectory_graph({"question": example["question"]})
        exact_match = evaluate_exact_match(result, {"trajectory": example["trajectory"]})
        extra_steps = evaluate_extra_steps(result, {"trajectory": example["trajectory"]})
        print(f"Input: {example['question']}")
        print(f"Expected trajectory: {example['trajectory']}")
        print(f"Actual trajectory: {result['trajectory']}")
        print(f"Exact match: {exact_match['score']}")
        print(f"Unmatched steps: {extra_steps['score']}")
    
    # Run the demo if executed directly
    if __name__ == "__main__":
        asyncio.run(run_demo_evaluations())

except Exception as e:
    print(f"Error in evaluation setup: {e}")
    raise
