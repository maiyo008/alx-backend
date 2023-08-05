#!/usr/bin/env python3
"""
Get locale from request
"""
from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)


babel = Babel(app)


class Config():
    """
    Class with language attributes
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """
    Get the user's preferred language
    using request.accept_languages
    """
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(
        app.config['LANGUAGES']
    )


@app.route('/', strict_slashes=False)
def index():
    """
    Render index html file
    """
    return render_template('3-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
