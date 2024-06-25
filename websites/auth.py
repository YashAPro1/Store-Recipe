from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from .model import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   ##means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        print(request.data)
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()    
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return jsonify({"message": "Login Succesfully", "user": user.id, "Username":user.first_name,"bool":True}), 201
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email does not exist.', category='error')

    # return {}
    return jsonify({"message": "Something Went Wrong"}), 400


@auth.route('/logout', methods=["GET",'POST'])
def logout():
    if request.method == "POST":
        logout_user()
        return jsonify({"message": "LogOut successfully", "bool": True}), 200

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        email = data.get('email')
        first_name = data.get('firstName')
        password1 = data.get('password1')
        password2 = data.get('password2')
        print(email)


        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists.', category='error')
        elif len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character.', category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(
                password1))
            db.session.add(new_user)
            db.session.commit()
            flash('Account created!', category='success')
            return jsonify({"message": "Account created successfully", "bool":True}), 201 
