import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
import pytest
from flask.testing import FlaskClient
from websites import create_app, db
from websites.model import User, Recipe

@pytest.fixture
def app() -> FlaskClient:
    app = create_app()
    app.config['TESTING'] = True
    app.config['SECRET_KEY'] = 'mnvifugbceldichxwsdj'
    app.config['SQLALCHEMY_DATABASE_URI']=f'mysql://root:password@localhost:3306/assignment' 
    app.config['WTF_CSRF_ENABLED'] = False  
    app_context = app.app_context()
    app_context.push()
    db.create_all()

    yield app

    # Teardown
    db.session.remove()
    db.drop_all()
    app_context.pop()

@pytest.fixture
def client(app: FlaskClient) -> FlaskClient:
    return app.test_client()


