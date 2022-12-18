from mysql.connector import Error, MySQLConnection
from mysql.connector.cursor_cext import CMySQLCursor


def create_database(connection: MySQLConnection, query: str) -> None:
    cursor: CMySQLCursor = connection.cursor()
    # cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Database created successfully")
    except Error as err:
        print(f"Error: '{err}'")
