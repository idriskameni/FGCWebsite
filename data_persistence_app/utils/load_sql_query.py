def load_sql_query(file_path):
    """
    Loads and returns the content of a SQL query from a specified file.

    This function reads a SQL file from the provided file path and returns its contents as a string.
    It's useful for keeping SQL scripts separate from Python code for better readability and maintainability.

    Parameters:
    file_path (str): The path to the SQL file. Should be a valid path to a .sql file containing the query.

    Returns:
    str: The content of the SQL file as a string. Returns an empty string if the file is empty.

    Example Usage:
    sql_query = load_sql_query('path/to/query.sql')

    Notes:
    - Assumes the file at file_path exists and is readable. Raises an IOError if the file does not exist or is not accessible.
    - It is recommended to handle exceptions when using this function, particularly for cases where the file might not exist or be accessible.
    - This function does not validate the SQL query within the file. The caller is responsible for ensuring the query's validity.
    """
    with open(file_path, 'r') as file:
        return file.read()
