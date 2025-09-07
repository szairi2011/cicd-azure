#!/usr/bin/env python3
# step-08-invoice_tools.py
# Defining the invoice-related tools for the invoice information sub-agent

from langchain_core.tools import tool
import sys
import os

# Add parent directory to path for imports when running directly
if __name__ == "__main__":
    sys.path.append('..')

# Try to import the database
try:
    # Use dynamic imports to handle module structure
    import importlib.util
    
    # Helper function for importing modules
    def import_module(name, path):
        spec = importlib.util.spec_from_file_location(name, path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module
    
    # Import database module
    base_path = os.path.dirname(os.path.abspath(__file__))
    db_module = import_module("step_02_database_setup", 
                              os.path.join(base_path, "step-02-database_setup.py"))
    db = db_module.db
    
except Exception as e:
    print(f"Error importing database module: {e}")
    sys.exit(1)

@tool 
def get_invoices_by_customer_sorted_by_date(customer_id: str) -> str:
    """
    Look up all invoices for a customer using their ID.
    The invoices are sorted in descending order by invoice date, which helps when the customer wants to view their most recent/oldest invoice, or if 
    they want to view invoices within a specific date range.
    
    Args:
        customer_id (str): customer_id, which serves as the identifier.
    
    Returns:
        str: A formatted list of invoices for the customer.
    """
    # Executes a SQL query to retrieve all invoice details for a given customer ID,
    # ordered by invoice date in descending order (most recent first).
    return db.run(f"SELECT * FROM Invoice WHERE CustomerId = {customer_id} ORDER BY InvoiceDate DESC;")


@tool 
def get_invoices_sorted_by_unit_price(customer_id: str) -> str:
    """
    Use this tool when the customer wants to know the details of one of their invoices based on the unit price/cost of the invoice.
    This tool looks up all invoices for a customer, and sorts the unit price from highest to lowest. In order to find the invoice associated with the customer, 
    we need to know the customer ID.
    
    Args:
        customer_id (str): customer_id, which serves as the identifier.
    
    Returns:
        str: A formatted list of invoices sorted by unit price.
    """
    # Executes a SQL query to retrieve invoice details along with the unit price of items in those invoices,
    # for a given customer ID, ordered by unit price in descending order (highest unit price first).
    query = f"""
        SELECT Invoice.*, InvoiceLine.UnitPrice
        FROM Invoice
        JOIN InvoiceLine ON Invoice.InvoiceId = InvoiceLine.InvoiceId
        WHERE Invoice.CustomerId = {customer_id}
        ORDER BY InvoiceLine.UnitPrice DESC;
    """
    return db.run(query)


@tool
def get_employee_by_invoice_and_customer(invoice_id: str, customer_id: str) -> str:
    """
    This tool will take in an invoice ID and a customer ID and return the employee information associated with the invoice.

    Args:
        invoice_id (int): The ID of the specific invoice.
        customer_id (str): customer_id, which serves as the identifier.

    Returns:
        str: Information about the employee associated with the invoice.
    """

    # Executes a SQL query to find the employee associated with a specific invoice and customer.
    # It joins Employee, Customer, and Invoice tables to retrieve employee first name, title, and email.
    query = f"""
        SELECT Employee.FirstName, Employee.Title, Employee.Email
        FROM Employee
        JOIN Customer ON Customer.SupportRepId = Employee.EmployeeId
        JOIN Invoice ON Invoice.CustomerId = Customer.CustomerId
        WHERE Invoice.InvoiceId = ({invoice_id}) AND Invoice.CustomerId = ({customer_id});
    """
    
    employee_info = db.run(query, include_columns=True)
    
    # Checks if any employee information was found.
    if not employee_info:
        return f"No employee found for invoice ID {invoice_id} and customer identifier {customer_id}."
    return employee_info

# Aggregate all invoice-related tools into a list.
invoice_tools = [
    get_invoices_by_customer_sorted_by_date, 
    get_invoices_sorted_by_unit_price, 
    get_employee_by_invoice_and_customer
]

# Test the tools when running the script directly
if __name__ == "__main__":
    # Import llm module
    try:
        llm_module = import_module("step_01_setup_ollama", 
                                  os.path.join(base_path, "step-01-setup_ollama.py"))
        llm = llm_module.llm
        
        # Test the invoice tools
        print("\nTesting invoice tools...")
        
        # Test get_invoices_by_customer_sorted_by_date
        print("\n1. Getting invoices for customer 1:")
        result = get_invoices_by_customer_sorted_by_date("1")
        print(result)
        
        # Test get_invoices_sorted_by_unit_price
        print("\n2. Getting invoices for customer 1, sorted by price:")
        result = get_invoices_sorted_by_unit_price("1")
        print(result)
        
        # Test get_employee_by_invoice_and_customer
        print("\n3. Getting employee for invoice 1 and customer 1:")
        result = get_employee_by_invoice_and_customer("1", "1")
        print(result)
        
    except Exception as e:
        print(f"Error testing invoice tools: {e}")
