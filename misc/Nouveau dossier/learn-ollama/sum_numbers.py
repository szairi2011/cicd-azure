"""
sum_numbers.py - A simple script to perform the sum of two numbers

Author: e1079458
Date: May 8, 2025
"""

def sum_numbers(a: float, b: float) -> float:
    """
    Sum two numbers together.
    
    Args:
        a: First number
        b: Second number
        
    Returns:
        The sum of the two numbers
    """
    return a + b

def main() -> None:
    """
    Main function that demonstrates the sum_numbers function.
    Gets user input and displays the result.
    """
    try:
        print("Sum of Two Numbers")
        print("------------------")
        
        # Get input from user
        first_number = float(input("Enter first number: "))
        second_number = float(input("Enter second number: "))
        
        # Calculate sum
        result = sum_numbers(first_number, second_number)
        
        # Display result
        print(f"The sum of {first_number} and {second_number} is: {result}")
        
    except ValueError as error:
        print(f"Error: Invalid input. Please enter numeric values. Details: {error}")
    except Exception as error:
        print(f"An unexpected error occurred: {error}")

if __name__ == "__main__":
    main()