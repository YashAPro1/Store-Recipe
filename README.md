# Recipe Management System

This project is a Recipe Management System built using Flask for the backend and React for the frontend. It allows users to perform CRUD operations on recipes, manage user authentication, and interact with a MySQL database.

## Features

- **User Authentication:** Users can sign up, log in, and log out. Passwords are securely hashed before storage.
- **Recipe Management:** Users can create, read, update, and delete recipes. Each recipe contains a title, ingredients, instructions, and creation date.
- **Responsive UI:** The frontend is implemented in React, providing a responsive and dynamic user interface.
- **Database Integration:** Uses MySQL database through SQLAlchemy ORM for data storage.
- **RESTful API:** Backend API endpoints are designed to follow REST principles, enabling interaction with frontend components.

## Technologies Used

- **Backend:** Python, Flask, Flask-RESTful, Flask-Login, SQLAlchemy
- **Frontend:** JavaScript, React, Axios
- **Database:** MySQL
- **Testing:** Pytest

## Project Structure

The project directory structure is organized as follows:

```
project_root/
│
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ ├── App.js
│ ├── index.js
│ └── ...
│
├── websites/
│ ├── init.py
│ ├── auth.py
│ ├── model.py
│ ├── views.py
│ └── ...
│
├──main.py
|
├── test/
│ ├── conftest.py
│ └── test_recipe_crud.py
│
├── venv/
├── .gitignore
├── README.md
└── requirements.txt
```

## Setup Instructions

To run this project locally, follow these steps:

### Backend Setup

1. **Clone the repository:**

```
   git clone https://github.com/YashAPro1/Share-Recipe.git
   cd Share-Recipe
```

2. **Set up virtual environment:**

```
   python -m venv venv
   . venv/bin/activate # On Windows use venv\Scripts\activate
```

3. **Install dependencies:**

```
   pip install -r requirements.txt
```

4. **Set up the database:**

- Create a MySQL database (e.g., `recipe_db`).
- Update the database URI in `websites/__init__.py` or using environment variables.
- app.config['SQLALCHEMY_DATABASE_URI']=f'mysql://root:password@localhost:3306/recipe_db'

5. **Run Flask application:**

```
   main.py
```

### Frontend Setup

1. **Navigate to the frontend directory:**

```
   cd frontend
```

2. **Install dependencies:**

```
   npm install
```

3. **Start the React application:**

```
   npm start
```

4. **Access the application:**
   Open your browser and go to `http://localhost:3000` to view the Recipe Management System.

## Testing

Unit tests are implemented using Pytest for backend API endpoints. To run the tests:

1. **Activate virtual environment:**

```
   . venv/bin/activate # On Windows use venv\Scripts\activate
```

2. **Run tests:**

```
   pytest
```
