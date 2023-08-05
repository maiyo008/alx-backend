#!/usr/bin/env python3
"""
Get locale from request
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel, gettext as _


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


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user(user_id):
    """
    Fetch user dictionary by id
    """
    return users.get(user_id)


@app.before_request
def before_request():
    """
    set user as global on flask.g
    """
    user_id = request.args.get('login_as', type=int)
    g.user = get_user(user_id) if user_id else None


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
    Check if a user is logged in and display the appropriate welcome message
    """
    if g.user:
        return render_template(
            '5-index.html',
            welcome_msg=_(
                "You are logged in as %(username)s."
            ) % {'username': g.user['name']}
        )
    else:
        return render_template(
            '5-index.html',
            welcome_msg=_("You are not logged in.")
        )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
