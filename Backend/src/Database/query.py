import sys
from typing import Optional

from mysql.connector import Error
# from mysql.connector.cursor_cext import CMySQLCursor

from src.Database.Exceptions import TableNotFound

def execute_query(connection, query: str) -> None:
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
    except Error as err:
        if err.errno == 1146:
            raise TableNotFound("")
        else:
            print(f'Error: {err}', file=sys.stderr)


def read_query(connection, query: str) -> Optional[list[tuple]]:
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        return cursor.fetchall()
    except Error as err:
        print(f'Error: {err}', file=sys.stderr)
        return None
