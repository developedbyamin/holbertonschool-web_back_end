#!/usr/bin/env python3
''' module to learn i18n
'''
from flask import Flask, render_template
from flask_babel import Babel


class Config():
    ''' Configuration class
    '''
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_TIMEZONE = 'UTC'
    BABEL_DEFAULT_LOCALE = 'en'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def index():
    ''' returns index.html file
    '''
    return render_template('0-index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
