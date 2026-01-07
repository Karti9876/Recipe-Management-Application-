🍳 Smart Recipe Explorer with AI Assistance

Python Backend + MySQL + Gemini AI

A full-stack AI-powered recipe management application built using FastAPI, MySQL, and Google Gemini AI.
The application allows users to manage recipes, search and filter them, and use Generative AI to improve and generate recipes.

🚀 Features

Create, view, search and filter recipes

Store recipes in MySQL database

AI-powered recipe improvement

AI-based recipe generation from ingredients

RESTful API built using FastAPI

Interactive Swagger documentation

Simple frontend integrated with backend

Secure API key handling using environment variables

🛠 Tech Stack
Layer	Technology
Backend	FastAPI (Python)
Database	MySQL
ORM	SQLAlchemy
AI	Google Gemini (REST API)
Frontend	HTML, CSS, JavaScript
API Docs	Swagger UI
Environment	Python Virtual Environment (uv)
⚙️ Environment Setup (Using uv)

This project uses uv, a modern and fast Python package manager and virtual environment tool.

1️⃣ Create virtual environment
uv venv

2️⃣ Activate the environment

Windows

.venv\Scripts\activate


Linux / Mac

source .venv/bin/activate

📦 Install Dependencies
uv pip install -r requirements.txt

🗄 MySQL Database Setup

Login to MySQL:

mysql -u root -p


Create database:

CREATE DATABASE recipes_db;

🔐 Environment Variables

Create a .env file in project root:

DATABASE_URL=mysql+pymysql://root:yourpassword@localhost/recipes_db
GEMINI_API_KEY=YOUR_GEMINI_API_KEY


⚠ Do not commit .env to GitHub.

▶️ Run the Application
uvicorn app.main:app --reload

🌐 Access the Application
Feature	URL
API Docs	http://127.0.0.1:8000/docs

Frontend UI	http://127.0.0.1:8000/ui
📌 API Endpoints
Recipes
Method	Endpoint
POST	/recipes
GET	/recipes
GET	/recipes/search?ingredient=rice
GET	/recipes/filter?cuisine=Indian&difficulty=Easy
AI
Method	Endpoint
POST	/ai/improve
POST	/ai/generate
🤖 AI Integration

The application uses Google Gemini AI via its REST API to:

Improve recipes

Suggest healthier alternatives

Generate new recipes from ingredients

AI keys are securely stored using environment variables.

🧪 Testing

You can test all APIs using:

http://127.0.0.1:8000/docs


The frontend also consumes the same APIs.

🎯 Purpose of This Project

This project demonstrates:

Python backend development

REST API design

Database integration

Generative AI usage

Frontend-backend integration

Secure API handling

Built as a technical assessment for evaluating backend and AI integration skills.

👨‍💻 Author

Kartik Gautam
