import json
import os
import sys
from typing import Optional, Any

import click
from mysql.connector import MySQLConnection
from tqdm import tqdm

from src.Database.Exceptions import TableNotFound
from src.Database.connection import create_server_connection, create_db_connection
from src.Database.create_database import create_database
from src.Database.query import execute_query
from src.Utils.files_utils import get_files_by_extension


def init_database() -> None:
    connection: Optional[MySQLConnection] = create_server_connection(os.getenv("MYSQL_HOSTNAME", "localhost"),
                                                                     int(os.getenv("MYSQL_PORT", 3307)),
                                                                     os.getenv("MYSQL_USER", "user"),
                                                                     os.getenv("MYSQL_PASSWORD", "password")
                                                                     )
    if connection is None:
        sys.exit(1)
    create_database(connection, f'CREATE DATABASE {os.getenv("MYSQL_DATABASE")}')


def create_beer_table(connection: MySQLConnection) -> None:
    execute_query(connection, '''CREATE TABLE Beer (
                                id INT PRIMARY KEY NOT NULL ,
                                name VARCHAR(128) NOT NULL ,
                                description VARCHAR(6000) NOT NULL ,
                                abv FLOAT NOT NULL,
                                ibu FLOAT NOT NULL,
                                icon VARCHAR(256) NOT NULL ,
                                style_description VARCHAR(6000) NOT NULL ,
                                style_name VARCHAR(64) NOT NULL ,
                                type VARCHAR(64) NOT NULL ,
                                organic BOOLEAN NOT NULL
                              )''')
    execute_query(connection, '''
        CREATE TABLE User_evaluation (
            beer_id INT PRIMARY KEY NOT NULL ,
            note INT NOT NULL
        )
    ''')


def create_review_table(connection: MySQLConnection) -> None:
    execute_query(connection, '''CREATE TABLE Review (
                                id INT PRIMARY KEY,
                                beer_name VARCHAR(128),
                                appearance INT,
                                aroma INT,
                                palate INT,
                                taste INT,
                                overall INT
                              )''')


def check_key(values: dict, key: str) -> Optional[Any]:
    return values[key] if key in values else None


def format_text(text: str) -> str:
    return text.replace('\"', '').replace("\\", '')


def add_json_to_database(connection: MySQLConnection, files_path: list[str]):
    basic_query: str = f'''INSERT INTO Beer VALUES '''
    query: str = f'''INSERT INTO Beer VALUES '''
    basic_eval_query: str = f'''INSERT INTO User_evaluation VALUES '''
    eval_query: str = f'''INSERT INTO User_evaluation VALUES '''
    id: int = 0
    for file in tqdm(files_path, unit="File"):
        with open(file) as f:
            json_data: dict = json.load(f)
        for data in json_data["data"]:
            name: Optional[str] = check_key(data, "name")
            description: Optional[str] = check_key(data, "description")
            abv: Optional[str] = check_key(data, "abv")
            ibu: Optional[str] = check_key(data, "ibu")
            icon: Optional[str] = check_key(data["labels"], "large")
            style_description: Optional[str] = check_key(data["style"], "description")
            style_name: Optional[str] = check_key(data["style"], "name")
            type: Optional[str] = check_key(data["style"]["category"], "name")
            organic: Optional[str] = check_key(data, "isOrganic")

            insert: str = f'({id}, "{format_text(name)}", "{format_text(description) if description is not None else "No description"}", {float(abv) if abv is not None else 0}, {float(ibu) if ibu is not None else 0}, ' \
                          f'"{format_text(icon)}", "{format_text(style_description) if style_description is not None else "No style description"}", "{format_text(style_name) if style_name is not None else "No style name"}", ' \
                          f'"{format_text(type) if type is not None else "No type"}", {False if organic is None or organic == "N" else True}),'
            eval_query += f'({id}, 0),'
            id += 1
            query += insert
        tmp = list(query)
        tmp[-1] = ';'
        query = "".join(tmp)
        tmp = list(eval_query)
        tmp[-1] = ';'
        eval_query = "".join(tmp)
        try:
            execute_query(connection, query)
            execute_query(connection, eval_query)
        except TableNotFound:
            create_beer_table(connection)
            execute_query(connection, query)
            execute_query(connection, eval_query)
        query = basic_query
        eval_query = basic_eval_query


connect_to_database = lambda: create_db_connection(os.getenv("MYSQL_HOSTNAME"),
                                                   int(os.getenv("MYSQL_PORT")),
                                                   os.getenv("MYSQL_USER"),
                                                   os.getenv("MYSQL_PASSWORD"),
                                                   os.getenv("MYSQL_DATABASE")
                                                   )


@click.command()
@click.option("--folder", "-f", help="Folder where the json files are located", required=True, type=str)
def CLI(folder):
    files_path: list[str] = get_files_by_extension(folder, "json")
    connection: Optional[MySQLConnection] = connect_to_database()

    if connection is None:
        init_database()
        connection = connect_to_database()
        create_beer_table(connection)
    if connection is None:
        sys.exit(1)
    add_json_to_database(connection, files_path)


if __name__ == "__main__":
    CLI()
