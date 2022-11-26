from __main__ import app

from flask import request

@app.post("/recommendation")
def recommendation_post():
    print(request.get_json(force=True))
    return "OK", 200
