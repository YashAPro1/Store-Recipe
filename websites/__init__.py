from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
from flask_cors import CORS

db = SQLAlchemy()
DB_NAME = "assignment"


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'mnvifugbceldichxwsdj'
    app.config['SQLALCHEMY_DATABASE_URI']=f'mysql://root:password@localhost:3306/recipe_db'
    CORS(app)
    db.init_app(app)

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .model import Recipe, User
    
    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app


def create_database(app):
    if not path.exists('websites/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database!')