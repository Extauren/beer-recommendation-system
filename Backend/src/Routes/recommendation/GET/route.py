from __main__ import app


@app.get("/recommendation")
def recommendation_get():
    return "Ok", 200
