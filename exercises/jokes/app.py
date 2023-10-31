#!/usr/bin/env python3
"""Flask application to use `pyjokes`"""

import random
from typing import List

import pyjokes
from flask import Flask, make_response, redirect, render_template, request

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    return render_template("base.html")


@app.route("/", methods=["POST"])
def index_jokes():

    language = request.form.get("language")
    category = request.form.get("category")
    number = request.form.get("number")

    if (number != None):
        number = int(number)

    jokes = send_joke(
        language=language, 
        category=category, 
        number=number
        )

    response = make_response(render_template(
            "jokes.html", 
            jokes=jokes
            ))
    
    return response

    


def send_joke(
    language: str = "en", category: str = "all", number: int = 1
) -> List[str]:

    if (language == None):
        return send_joke(category=category, number=number)
    
    if (category == None):
        return send_joke(language=language, number=number)
    
    if (number == None):
        return send_joke(language=language, category=category)
    

    try:
        allJokes = pyjokes.get_jokes(
            language=language,
            category=category)

    except pyjokes.pyjokes.CategoryNotFoundError:
        return ["No kidding!"]
    
    
    if (number >= len(allJokes)):
        return allJokes
    

    jokes = []

    for _ in range(number):
        jokes.append(allJokes[random.randint(0, len(allJokes) - 1)])
    
    
    return jokes
