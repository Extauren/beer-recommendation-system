from flask import Flask

app = Flask(__name__)

from src.Routes.recommendation.GET.route import *
from src.Routes.recommendation.evaluation.POST.route import *

if __name__ == "__main__":
    app.run(debug=False)
