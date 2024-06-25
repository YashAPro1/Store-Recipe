from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .model import Recipe, User
from . import db
import json

views = Blueprint('views', __name__)


@views.route('/allrecipe', methods=['POST'])
def addRecipe():
    if request.method == 'POST': 
        data = request.get_json() 
        title = data.get('title')
        indegrients = data.get('indegrients')
        instruction = data.get('instruction')
        userid = data.get('user')
        note = data.get('contents')#Gets the note from the HTML 

        if len(note) < 1:
            flash('recipe is too short!', category='error') 
            return {"status": "failed","error":"recipe is too short!","user":None}
        else:
            new_note = Recipe(title=title,data=note,instruction=instruction,indegrients=indegrients, user_id=userid)  #providing the schema for the note 
            db.session.add(new_note) #adding the note to the database 
            db.session.commit()
            flash('Note added!', category='success') 
            return jsonify({"status": "success", "message": "Added Succesfully"})
    

@views.route('/getrecipe', methods=['GET'])
def getRecipe():
    if request.method == "GET":
        user_id = request.args.get('user_id', type=int)
        all_recipes = Recipe.query.filter_by(user_id=user_id).all()
        recipes_list = [{"id": recipe.id, "title":recipe.title,"data": recipe.data,"indegrients":recipe.indegrients,"instruction":recipe.instruction, "user_id": recipe.user_id} for recipe in all_recipes]
        return jsonify({"status": "success", "recipes": recipes_list})
    
@views.route('/recipe-update', methods=['PUT'])
def updateRecipe():
    if request.method == "PUT":
        data = request.get_json() 
        print(data)
        id = data.get("id")
        title = data.get('title')
        indegrients = data.get('indegrients')
        instruction = data.get('instruction')
        userid = data.get('user')
        note = data.get('contents')
        existing_recipe = Recipe.query.get(id)
        if not existing_recipe:
            return jsonify({"message": "Recipe not found"}), 404

        # Update the recipe attributes
        existing_recipe.title = title
        existing_recipe.indegrients = indegrients
        existing_recipe.instruction = instruction
        existing_recipe.data = note
        existing_recipe.user_id = userid

        # Commit the changes to the database
        db.session.commit()
        return jsonify({"status": "success"})

@views.route('/delete-recipe', methods=['DELETE'])
def delete_recipe():  
    id = request.args.get('id', type=int)
    note = Recipe.query.get(id)
    if note: 
        db.session.delete(note)
        db.session.commit()

    return jsonify({})