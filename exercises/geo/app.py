import inspect
import os
import sqlite3
from flask import Flask, request, render_template
from pathlib import Path


app = Flask(__name__)


def get_data_from_db(query: str) -> list:

    path = os.path.abspath(inspect.getfile(get_data_from_db))
    parentDir = Path(path).parent.absolute()

    """retrieve data from the database and return to the user"""
    with sqlite3.connect(f'{parentDir}/world.sqlite3') as connection:
        cur = connection.cursor()
        cur.execute(query)

        returnObject = []
        for record in cur:
            returnObject.append(record)

        return returnObject


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        # display links to 3 options (country / region / continent)
        return render_template("index.html")
    
    scope = list(request.form.keys())[0]
    value = request.form.get(scope)

    # retrieve data from the database based on the selected option and present it to the user
    data = get_data_from_db(f'SELECT * FROM country WHERE {scope}="{value}";')

    return render_template("index.html", data=data)



@app.route("/<string:scope>")
def search(scope: str):
    if scope == "country":
        # get countries from the database and populate options of the drop-down menu
        countries = get_data_from_db("SELECT name FROM country;")
        return render_template("country.html", items=countries)
    
    elif scope == "region":
        # get regions from the database and populate options of the drop-down menu
        regions = get_data_from_db("SELECT DISTINCT region FROM country;")
        return render_template("region.html", items=regions)
    
    elif scope == "continent":
        # get continents from the database and populate options of the drop-down menu
        continents = get_data_from_db("SELECT DISTINCT continent FROM country;")
        return render_template("continent.html", items=continents)
