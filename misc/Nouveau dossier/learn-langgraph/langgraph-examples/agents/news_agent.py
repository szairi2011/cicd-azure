"""Example of a future news agent implementation."""

from typing import Any, List
from .base_agent import BaseAgent


class NewsAgent(BaseAgent):
    """Example agent for news queries (not implemented - for future use)."""
    
    def get_tools(self) -> List[Any]:
        """Get news-specific tools.
        
        Returns:
            List of news tools (placeholder)
        """
        # Future implementation would include news tools
        # from tools import get_news, search_headlines
        # return [get_news, search_headlines]
        return []
    
    def get_default_prompt(self) -> str:
        """Get the default news agent prompt.
        
        Returns:
            Default news prompt
        """
        return """
        You are a helpful news assistant that provides current news and information.
        
        When responding to news queries:
        1. Always use the news tools to get current, accurate information
        2. Present information in a clear, readable format
        3. Include relevant details like date, source, and summary
        4. Provide context when appropriate
        5. If the topic is not found, suggest related topics or ask for clarification
        
        Your responses should be informative, accurate, and unbiased.
        """
    
    def get_headlines(self, category: str = "general", verbose: bool = True) -> str:
        """Get headlines for a specific category.
        
        Args:
            category: News category (e.g., "technology", "sports", "politics")
            verbose: Whether to show detailed output
            
        Returns:
            News headlines (placeholder implementation)
        """
        query = f"Get the latest {category} news headlines"
        # Future implementation would use actual news tools
        return f"News agent not yet implemented. Query was: {query}"
    
    def search_news(self, topic: str, verbose: bool = True) -> str:
        """Search for news about a specific topic.
        
        Args:
            topic: Topic to search for
            verbose: Whether to show detailed output
            
        Returns:
            News search results (placeholder implementation)
        """
        query = f"Search for news about {topic}"
        # Future implementation would use actual news tools
        return f"News agent not yet implemented. Query was: {query}"
