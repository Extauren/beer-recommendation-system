from mysql.connector import Error, MySQLConnection
from mysql.connector.cursor import MySQLCursor


def create_database(connection: MySQLConnection, query: str) -> None:
    cursor:  MySQLCursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Database created successfully")
    except Error as err:
        print(f"Error: '{err}'")
