import json
import pytest
from websites.model import Recipe, User

def test_create_user(client):
    # Ensure the endpoint URL matches the registered route in your app
    response = client.post('/sign-up', json={
        'email': 'testuser@example.com',
        'firstName': 'Test',
        'password1': 'password123',
        'password2': 'password123'
    })
    assert response.status_code == 201

def test_create_recipe(client):
    # Create a test user
    test_create_user(client)

    # Login as the test user
    response = client.post('/login', json={
        'email': 'testuser@example.com',
        'password': 'password123'
    })
    assert response.status_code == 201
    user_id = json.loads(response.data)['user']

    # Create a recipe
    response = client.post('/allrecipe', json={
        'title': 'New Recipe',
        'indegrients': 'Ingredient 1, Ingredient 2',
        'instruction': 'Instruction for Recipe',
        'contents': 'Content for Recipe',
        'user': user_id
    })
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'success'

def test_get_recipe(client):
    # Create a test user and recipe
    test_create_user(client)
    create_recipe(client)

    # Retrieve the recipe
    response = client.get('/getrecipe?user_id=1')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'success'
    assert len(data['recipes']) == 1
    assert data['recipes'][0]['title'] == 'New Recipe'

def test_update_recipe(client):
    # Create a test user and recipe
    test_create_user(client)
    create_recipe(client)

    # Update the recipe
    response = client.put('/recipe-update', json={
        'id': 1,
        'title': 'Updated Recipe',
        'indegrients': 'Updated Ingredients',
        'instruction': 'Updated Instruction',
        'contents': 'Updated Content',
        'user': 1
    })
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'success'

def test_delete_recipe(client):
    # Create a test user and recipe
    test_create_user(client)
    create_recipe(client)

    # Delete the recipe
    response = client.delete('/delete-recipe?id=1')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == {}

def create_recipe(client):
    # Create a recipe for testing
    response = client.post('/allrecipe', json={
        'title': 'New Recipe',
        'indegrients': 'Ingredient 1, Ingredient 2',
        'instruction': 'Instruction for Recipe',
        'contents': 'Content for Recipe',
        'user': 1
    })
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'success'











