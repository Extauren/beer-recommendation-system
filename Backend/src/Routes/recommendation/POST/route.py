# from __main__ import app
import json
import random
from typing import Any

from src.RateBeer_API.BeerInfos import BeerReviewInfos

from flask import request, jsonify, Blueprint

from src.Database.query import read_query
from src.Database.connection import create_db_connection
from src.Scripts.init_database import connect_to_database

import re

bp = Blueprint('recommendation', __name__, url_prefix='')


def get_abv_min_and_max(abv: str) -> tuple:
    if abv == "Lite":
        return "0", "4"
    elif abv == "Normal":
        return "5", "6"
    elif abv == "Strong":
        return "7", "14"
    else:
        return "0", "14"


def get_is_organic(organic: str) -> str:
    if organic == "Yes":
        return "1"
    elif organic == "No":
        return "0"
    else:
        return "0"


def get_ibu_min_and_max(ibu: str) -> tuple:
    if ibu == "Low":
        return "5", "30"
    elif ibu == "Medium":
        return "30", "50"
    elif ibu == "High":
        return "50", "100"
    else:
        return "0", "100"


def tranform_type(type: str) -> str:
    if type == "IPA":
        return "India Pale Ale"
    elif type == "Fruity":
        return "Fruit"
    else:
        return type


def get_type(type, abvMin, abvMax, ibuMin, ibuMax, organic, connection):
    return [(*beer, 100) for beer in read_query(connection,
                      "SELECT * FROM Beer WHERE `style_name` LIKE '%{}%' AND `abv` >= '{}' AND `abv` <= '{}' AND `ibu` >= '{}' AND `ibu` <= '{}' AND `organic` = '{}'".format(
                          type, abvMin, abvMax, ibuMin, ibuMax, organic))]


def change_abv_value(survey: dict, connection) -> list:
    map_increase_abv = {
        "Lite": "Normal",
        "Normal": "Strong",
        "Strong": "Normal"
    }
    abvMin, abvMax = get_abv_min_and_max(map_increase_abv(survey["abv"]))
    return get_type(tranform_type(survey["type"]), abvMin, abvMax, ibuMin, ibuMax,
                    get_is_organic(survey["organic"]), connection)


def change_ibu_value(survey: dict, connection) -> list:
    map_increase_ibu = {
        "Low": "Medium",
        "Medium": "High",
        "High": "Medium"
    }
    ibuMin, ibuMax = get_abv_min_and_max(map_increase_ibu(survey["ibu"]))
    return get_type(tranform_type(survey["type"]), abvibu, abvMax, ibuMin, ibuMax,
                    get_is_organic(survey["organic"]), connection)


@bp.route("/recommendation", methods=(['POST']))
def recommendation_post():
    survey = request.get_json(force=True)

    connection = connect_to_database()
    abvMin, abvMax = get_abv_min_and_max(survey["abv"])
    ibuMin, ibuMax = get_ibu_min_and_max(survey["ibu"])
    beer_list = get_type(tranform_type(survey["type"]), abvMin, abvMax,
                        ibuMin, ibuMax, get_is_organic(survey["organic"]),
                        connection)
    if not beer_list:
        return [], 200
    random_recommended_beer: list = random.sample(beer_list, 5 if len(
        beer_list) >= 5 else len(beer_list))

    if len(random_recommended_beer) < 5:
        beer_list = change_abv_value(survey, connection)
        beer_list = [(*elem[0:10], elem[10] - 25) for elem in random.sample(beer_list, 5 - len(random_recommended_beer) if len(beer_list) >= 5 - len(random_recommended_beer) else len(beer_list))]
        random_recommended_beer += beer_list

    if len(random_recommended_beer) < 5:
        beer_list = change_ibu_value(survey, connection)
        beer_list = [(*elem[0:10], elem[10] - 25) for elem in random.sample(beer_list, 5 - len(random_recommended_beer) if len(beer_list) >= 5 - len(random_recommended_beer) else len(beer_list))]
        random_recommended_beer += beer_list

    beer_notes: dict[str, int] = {
        beer.name: n
        for n, beer in enumerate(sorted(
            [BeerReviewInfos(connection, beer[1]) for beer in
             random_recommended_beer],
            key=lambda beer: beer.average_overall, reverse=True))}
    recommended_beer_list: list[tuple] = random_recommended_beer.copy()
    for beer in random_recommended_beer:
        recommended_beer_list[beer_notes[beer[1]]] = beer
    new_recommended_beer_list: list[tuple] = []
    for beer in recommended_beer_list:
        new_recommended_beer_list.append((*beer[0:10], beer[10] - (0 if re.search(
            tranform_type(survey["type"]), beer[7], re.IGNORECASE) else 25)))
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
        "organic": beer[9],
        "percentage": str(beer[10])
    } for beer in new_recommended_beer_list]), 200
