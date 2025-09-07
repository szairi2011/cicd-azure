#!/usr/bin/env python3
# step-02-database_setup.py
# Setting up the Chinook database for the multi-agent system

import sqlite3
import requests
import os
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from langchain_community.utilities.sql_database import SQLDatabase
from requests.exceptions import SSLError

# Define the local path for storing the Chinook SQL file
# Use a path relative to the script's location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
LOCAL_SQL_FILE = os.path.join(SCRIPT_DIR, "databases", "step-02_chinook_sqlite.sql")

def download_chinook_sql():
    """Download the Chinook SQL script from GitHub."""
    url = "https://raw.githubusercontent.com/lerocha/chinook-database/master/ChinookDatabase/DataSources/Chinook_Sqlite.sql"
    
    try:
        print("Downloading Chinook database SQL script...")
        response = requests.get(url)
        sql_script = response.text
        
        # Save the SQL script locally for future use
        with open(LOCAL_SQL_FILE, 'w', encoding='utf-8') as f:
            f.write(sql_script)
        
        return sql_script
    except SSLError as e:
        print(f"SSL Error occurred: {e}")
        return None

def get_engine_for_chinook_db(use_file_storage=False):
    """Pull sql file, populate database, and create engine.
    Will try to download first, and fall back to local file if SSL error occurs.
    
    Args:
        use_file_storage (bool): If True, creates a file-based database, otherwise uses in-memory database
    """
    
    # First, try to download the SQL script
    sql_script = download_chinook_sql()
    
    # If download failed and we have a local copy, use that instead
    if sql_script is None:
        if os.path.exists(LOCAL_SQL_FILE):
            print(f"Using local Chinook SQL file: {LOCAL_SQL_FILE}")
            with open(LOCAL_SQL_FILE, 'r', encoding='utf-8') as f:
                sql_script = f.read()
        else:
            raise FileNotFoundError(f"Could not download Chinook database and no local file found at {LOCAL_SQL_FILE}")

    if use_file_storage:
        # Create a file-based SQLite database
        db_path = os.path.join(SCRIPT_DIR, "databases", "chinook.db")
        print(f"Creating file-based SQLite database at: {db_path}")
        connection = sqlite3.connect(db_path, check_same_thread=False)
        connection_string = f"sqlite:///{db_path}"
    else:
        # Create an in-memory SQLite database
        print("Creating in-memory SQLite database...")
        connection = sqlite3.connect(":memory:", check_same_thread=False)
        connection_string = "sqlite://"
    
    # Execute the SQL script to populate the database with Chinook data
    print("Populating database with Chinook data...")
    connection.executescript(sql_script)
    
    if use_file_storage:
        connection.commit()
    
    # Create a SQLAlchemy engine for the SQLite database
    engine = create_engine(
        connection_string,
        creator=lambda: connection,
        poolclass=StaticPool,
        connect_args={"check_same_thread": False},
    )
    
    print("Database setup complete!")
    return engine

# Get the SQLAlchemy engine for our Chinook database
# engine = get_engine_for_chinook_db() # Uncomment this line to use in-memory database
engine = get_engine_for_chinook_db(True) # Use file storage for the database

# Create a LangChain SQLDatabase utility instance from the engine.
db = SQLDatabase(engine)

# Test the database connection
if __name__ == "__main__":
    # Test a simple query to ensure the database is working
    result = db.run("SELECT COUNT(*) FROM Customer;")
    print(f"\nTotal customers in database: {result}")
    
    # Test another query to get some artist information
    result = db.run("SELECT Name FROM Artist LIMIT 5;", include_columns=True)
    print("\nSample artists in database:")
    print(result)

    # Test count the number of artists
    result = db.run("SELECT COUNT(*) from Artist;", include_columns=True)
    print(f"\nTotal artists in database: {result}")

    # Test more advanced join query
    # result = db.run("SELECT artist, SUM(sales) FROM sales GROUP BY artist ORDER BY SUM(sales) DESC LIMIT 2", include_columns=True)
    # print(f"\nThe 2 top most artists that sell best are: {result}")
    # print(result)
