#!/usr/bin/env python3
# step-05-music_tools.py
# Defining the music-related tools for the music catalog sub-agent

from langchain_core.tools import tool
import ast
import sys

# Import the database if running as a script
if __name__ == "__main__":
    sys.path.append('..')  # Add parent directory to path
    # These imports assume you're running from the my-step-by-step directory
    from steps.step_02_database_setup import db
    from steps.step_01_setup_ollama import llm
else:
    # When imported from another module, assume db is already defined
    # or import it if this is the first module being imported
    try:
        # Try to access the db variable that should be already imported
        db
    except NameError:
        # If db is not defined, we need to import it
        try:
            import importlib.util
            spec = importlib.util.spec_from_file_location("step_02_database_setup",
                 "../steps/step_02_database_setup.py")
            db_module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(db_module)
            db = db_module.db
        except Exception as e:
            print(f"Error importing database: {e}")
            print("Make sure step_02_database_setup.py has been run.")
            sys.exit(1)

@tool
def get_albums_by_artist(artist: str):
    """Get albums by an artist."""
    # Execute a SQL query to retrieve album titles and artist names
    # from the Album and Artist tables, joining them and filtering by artist name.
    return db.run(
        f"""
        SELECT Album.Title, Artist.Name 
        FROM Album 
        JOIN Artist ON Album.ArtistId = Artist.ArtistId 
        WHERE Artist.Name LIKE '%{artist}%';
        """,
        include_columns=True
    )

@tool
def get_tracks_by_artist(artist: str):
    """Get songs by an artist (or similar artists)."""
    # Execute a SQL query to find tracks (songs) by a given artist, or similar artists.
    # It joins Album, Artist, and Track tables to get song names and artist names.
    return db.run(
        f"""
        SELECT Track.Name as SongName, Artist.Name as ArtistName 
        FROM Album 
        LEFT JOIN Artist ON Album.ArtistId = Artist.ArtistId 
        LEFT JOIN Track ON Track.AlbumId = Album.AlbumId 
        WHERE Artist.Name LIKE '%{artist}%';
        """,
        include_columns=True
    )

@tool
def get_songs_by_genre(genre: str):
    """
    Fetch songs from the database that match a specific genre.
    
    Args:
        genre (str): The genre of the songs to fetch.
    
    Returns:
        list[dict]: A list of songs that match the specified genre.
    """
    # First, find the GenreId for the given genre name.
    genre_id_query = f"SELECT GenreId FROM Genre WHERE Name LIKE '%{genre}%'"
    genre_ids = db.run(genre_id_query)
    
    # If no genre IDs are found, return an informative message.
    if not genre_ids:
        return f"No songs found for the genre: {genre}"
    
    # Safely evaluate the string result from db.run to get a list of tuples.
    genre_ids = ast.literal_eval(genre_ids)
    # Extract just the GenreId values and join them into a comma-separated string for the IN clause.
    genre_id_list = ", ".join(str(gid[0]) for gid in genre_ids)

    # Construct the query to get songs for the found genre IDs.
    # It joins Track, Album, and Artist tables and limits the results to 8.
    songs_query = f"""
        SELECT Track.Name as SongName, Artist.Name as ArtistName
        FROM Track
        LEFT JOIN Album ON Track.AlbumId = Album.AlbumId
        LEFT JOIN Artist ON Album.ArtistId = Artist.ArtistId
        WHERE Track.GenreId IN ({genre_id_list})
        GROUP BY Artist.Name
        LIMIT 8;
    """
    songs = db.run(songs_query, include_columns=True)
    
    # If no songs are found for the genre, return an informative message.
    if not songs:
        return f"No songs found for the genre: {genre}"
        
    # Safely evaluate the string result and format it into a list of dictionaries.
    formatted_songs = ast.literal_eval(songs)
    return [
        {"Song": song["SongName"], "Artist": song["ArtistName"]}
        for song in formatted_songs
    ]

@tool
def check_for_songs(song_title):
    """Check if a song exists by its name."""
    # Execute a SQL query to check for the existence of a song by its title.
    return db.run(
        f"""
        SELECT * FROM Track WHERE Name LIKE '%{song_title}%';
        """,
        include_columns=True
    )

# Aggregate all music-related tools into a list.
music_tools = [get_albums_by_artist, get_tracks_by_artist, get_songs_by_genre, check_for_songs]

# When running the file directly, test the tools
if __name__ == "__main__":
    # Import llm if needed
    try:
        # Try to access the llm variable that should be already imported
        llm
    except NameError:
        # If llm is not defined, we need to import it
        try:
            import importlib.util
            spec = importlib.util.spec_from_file_location("step_01_setup_ollama",
                 "../steps/step_01_setup_ollama.py")
            llm_module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(llm_module)
            llm = llm_module.llm
        except Exception as e:
            print(f"Error importing LLM: {e}")
            print("Make sure step_01_setup_ollama.py has been run.")
            sys.exit(1)
    
    # Bind the tools to our LLM model
    llm_with_music_tools = llm.bind_tools(music_tools)
    
    # Test some of the tools
    print("\nTesting music tools:")
    
    print("\n1. Getting albums by Queen:")
    result = get_albums_by_artist("Queen")
    print(result)
    
    print("\n2. Getting tracks by The Beatles:")
    result = get_tracks_by_artist("Beatles")
    print(result)
    
    print("\n3. Getting songs in Rock genre:")
    result = get_songs_by_genre("Rock")
    print(result)
    
    print("\n4. Checking for a song:")
    result = check_for_songs("Bohemian Rhapsody")
    print(result)
