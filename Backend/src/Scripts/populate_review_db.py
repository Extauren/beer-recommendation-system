import sys
from typing import Optional

import click
from tqdm import tqdm
from mysql.connector import MySQLConnection

from src.Database.Exceptions import TableNotFound
from src.Database.query import execute_query
from src.Scripts.init_database import connect_to_database, init_database, create_review_table


def insert_reviews_in_data_base(connection: MySQLConnection, content: str) -> None:
    elems = content.split("\n\n")
    index: int = 0
    for elem in tqdm(elems, unit="Review"):
        lines = elem.split("\n")
        json_format = {}
        for line in lines:
            infos = line.split(": ")
            json_format[infos[0]] = "".join(infos[1::])
        try:
            query: str = f'''
                    INSERT INTO Review VALUES (
                    {index}, 
                    "{json_format["beer/name"]}",
                    {int(json_format["review/appearance"].split("/")[0])},
                    {int(json_format["review/aroma"].split("/")[0])},
                    {int(json_format["review/palate"].split("/")[0])}, 
                    {int(json_format["review/taste"].split("/")[0])},
                    {int(json_format["review/overall"].split("/")[0])} 
                    );
                '''
        except:
            continue
        try:
            execute_query(connection, query)
        except TableNotFound:
            create_review_table()
            execute_query(connection, query)
        index += 1


@click.command()
@click.option("--file", "-f", help="Folder where the json files are located", required=True, type=str)
def CLI(file):
    connection: Optional[MySQLConnection] = connect_to_database()

    if connection is None:
        init_database()
        create_review_table()
        connection = connect_to_database()
    if connection is None:
        sys.exit(1)
    with open(file, errors='ignore') as f:
        insert_reviews_in_data_base(connection, f.read())


if __name__ == "__main__":
    CLI()
