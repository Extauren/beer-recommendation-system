import sys
from typing import Optional

from mysql.connector import Error
# from mysql.connector.cursor_cext import CMySQLCursor


def execute_query(connection, query: str) -> None:
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
    except Error as err:
        if err.errno == 1146:
            execute_query(connection, '''CREATE TABLE Beer (
                                        id INT PRIMARY KEY,
                                        name VARCHAR(128),
                                        description VARCHAR(6000),
                                        abv FLOAT,
                                        ibu FLOAT,
                                        icon VARCHAR(256),
                                        style_description VARCHAR(6000),
                                        style_name VARCHAR(64),
                                        type VARCHAR(64)
                                      )''')
            cursor.execute(query)
            connection.commit()
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
