from __main__ import app


@app.post("/recommendation/user_evaluation")
def recommendation_user_evaluation_post():
    return "Created", 201
