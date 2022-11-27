from flask import Flask

app = Flask(__name__)

from src.Routes.recommendation.survey.POST.route import *
from src.Routes.recommendation.user_evaluation.POST.route import *

if __name__ == "__main__":
    app.run(debug=False, port=3000, host="0.0.0.0")
