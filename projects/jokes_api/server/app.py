#!/usr/bin/env python3

import random

import pyjokes

from flask import Flask, request, jsonify, abort
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/api/v1/jokes", methods=['GET'])
def send_jokes():
    
    category = 'all' if request.args.get('category') == None else request.args.get('category')
    language = 'en' if request.args.get('language') == None else request.args.get('language')
    number = 1 if request.args.get('number') == None else int(request.args.get('number'))
    id = None if request.args.get('id') == None else int(request.args.get('id'))


    try:
        allJokes = pyjokes.get_jokes(
            language=language,
            category=category)

    except pyjokes.pyjokes.CategoryNotFoundError:
        return jsonify(["No kidding!"])


    if (id != None):

        if (id >= len(allJokes)):
            abort(404)

        return jsonify([allJokes[id]])
    

    if (number >= len(allJokes)):

        return jsonify(allJokes)


    jokes = []
    jokeIndices = []

    for n in range(number):

        while len(jokeIndices) <= n:

            randomIndex = random.randint(0, len(allJokes) - 1)

            if (randomIndex not in jokeIndices):

                jokeIndices.append(randomIndex)
                jokes.append(allJokes[randomIndex])


    return jsonify(jokes)




if __name__ == "__main__":
    app.run(debug=True)
