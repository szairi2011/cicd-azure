#!/usr/bin/env python3
# run_all_steps.py
# Script to run all steps in sequence to demonstrate the multi-agent system

import os
import sys
import importlib.util
import time

# Set working directory to the script's location
os.chdir(os.path.dirname(os.path.abspath(__file__)))

def import_module(name, path):
    """Import a module from a file path"""
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

def run_step(step_number, step_name):
    """Run a single step and display its result"""
    step_file = f"steps/step-{step_number:02d}-{step_name}.py"
    print(f"\n{'='*80}")
    print(f"RUNNING STEP {step_number}: {step_name}")
    print(f"{'='*80}\n")
    
    try:
        # Import the module but don't run the main block
        module_name = f"step_{step_number:02d}_{step_name}"
        module = import_module(module_name, step_file)
        
        # Look for a test_* function in the module and run it if found
        test_funcs = [func for func in dir(module) if callable(getattr(module, func)) and func.startswith("test_")]
        
        if test_funcs:
            print(f"Running test function: {test_funcs[0]}")
            getattr(module, test_funcs[0])()
        else:
            print(f"No test function found in {step_file}")
        
        print(f"\nStep {step_number} completed successfully.")
        time.sleep(1)  # Brief pause between steps
        return True
    except Exception as e:
        print(f"Error in step {step_number}: {e}")
        return False

def main():
    print("MULTI-AGENT AI SYSTEM: STEP-BY-STEP RUNNER")
    print("This script will run all steps in sequence to demonstrate the multi-agent system.\n")
    
    # Define all steps
    steps = [
        (1, "setup_ollama"),
        (2, "database_setup"),
        (3, "memory_setup"),
        (4, "state_definition"),
        (5, "music_tools"),
        (6, "music_assistant_node"),
        (7, "music_react_graph"),
        (8, "invoice_tools"),
        (9, "invoice_agent_prebuilt"),
        (10, "supervisor_agent")
    ]
    
    # Ask if user wants to run all steps or just basic components
    print("Choose which steps to run:")
    print("1. Basic components (steps 1-10)")
    print("2. Full system with human-in-the-loop and memory (steps 1-12)")
    print("3. Complete implementation including swarm and evaluation (steps 1-14)")
    
    choice = input("Enter your choice (1-3): ").strip()
    
    if choice == "2":
        steps.extend([
            (11, "human_in_the_loop"),
            (12, "long_term_memory")
        ])
    elif choice == "3":
        steps.extend([
            (11, "human_in_the_loop"),
            (12, "long_term_memory"),
            (13, "swarm_agents"),
            (14, "evaluation")
        ])
    
    # Run all selected steps
    success_count = 0
    for step_number, step_name in steps:
        if run_step(step_number, step_name):
            success_count += 1
    
    # Print summary
    print(f"\n{'-'*80}")
    print(f"EXECUTION COMPLETE: {success_count}/{len(steps)} steps succeeded")
    print(f"{'-'*80}\n")

if __name__ == "__main__":
    main()
