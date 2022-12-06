# from __main__ import app
import json
import random
from typing import Any

from src.RateBeer_API.BeerInfos import BeerReviewInfos

from flask import request, jsonify, Blueprint

from src.Database.query import read_query
from src.Database.connection import create_db_connection
from src.Scripts.init_database import connect_to_database

bp = Blueprint('recommendation', __name__, url_prefix='')

def get_type(survey, connection):
    return read_query(connection,
                      "SELECT * FROM Beer WHERE `type` LIKE '%{}%' AND `abv` >= '{}' AND `abv` <= '{}' AND `organic` = '{}'".format(
                          survey["type"], survey["abvMin"], survey["abvMax"], survey["organic"]))
    # return read_query(connection, "SELECT * FROM Beer WHERE `type` = '{}'".format(survey["type"]))


def get_abv(survey, connection):
    return read_query(connection, "SELECT * FROM Beer WHERE `abv` = '{}'".format(survey["abv"]))


def get_ibu(survey, connection):
    return read_query(connection, "SELECT * FROM Beer WHERE `ibu` = '{}'".format(survey["ibu"]))


def get_organic(survey, connection):
    return read_query(connection, "SELECT * FROM Beer WHERE `organic` = '{}'".format(survey["organic"]))


@bp.route("/recommendation", methods=(['POST']))
def recommendation_post():
    survey = request.get_json(force=True)

    # connection = create_db_connection("db", 3306, "user", "password", "beer_database")
    connection = connect_to_database()
    beer_list = get_type(survey, connection)
    # for i in range(len(beer_list)):
    #     if (beer_list[i][3] >= float(survey["abvMin"]) and beer_list[i][3] <= float(survey["abvMax"])) \
    #     and beer_list[i][9] == int(survey["organic"]):
    #         recommended_beer_list.append(beer_list[i])
    random_recommended_beer: list = random.sample(beer_list, 10)
    beer_notes: dict[str, int] = {
        beer.name: n
        for n, beer in enumerate(sorted([BeerReviewInfos(connection, beer[1]) for beer in random_recommended_beer],
                                        key=lambda beer: beer.average_overall, reverse=True))}
    recommended_beer_list: list[tuple] = random_recommended_beer.copy()
    for beer in random_recommended_beer:
        recommended_beer_list[beer_notes[beer[1]]] = beer
    connection.close()
    return jsonify([{
        "id": beer[0],
        "name": beer[1],
        "description": beer[2],
        "abv": beer[3],
        "ibu": beer[4],
        "icon": beer[5],
        "style_description": beer[6],
        "style": beer[7],
        "type": beer[8],
        "organic": beer[9]
    } for beer in recommended_beer_list]), 200
