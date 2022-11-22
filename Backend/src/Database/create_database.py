from mysql.connector import Error, CMySQLConnection, MySQLConnection
from mysql.connector.cursor_cext import CMySQLCursor


def create_database(connection: CMySQLConnection | MySQLConnection, query: str) -> None:
    cursor: CMySQLCursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Database created successfully")
    except Error as err:
        print(f"Error: '{err}'")
