import sys
from typing import Optional

from mysql.connector import Error,  MySQLConnection
from mysql.connector.cursor_cext import CMySQLCursor

from src.Database.Exceptions import TableNotFound


def execute_query(connection:  MySQLConnection, query: str) -> None:
    cursor: CMySQLCursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
    except Error as err:
        if err.errno == 1146:
            raise TableNotFound("")
        else:
            print(f'Error: {err}', file=sys.stderr)


def read_query(connection: MySQLConnection, query: str) -> Optional[list[tuple]]:
    cursor: CMySQLCursor = connection.cursor()
    try:
        cursor.execute(query)
        return cursor.fetchall()
    except Error as err:
        print(f'Error: {err}', file=sys.stderr)
        return None
