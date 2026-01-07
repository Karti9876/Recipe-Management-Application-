import os
import requests
from fastapi import APIRouter
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

router = APIRouter()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

class ImproveRequest(BaseModel):
    recipe: str

class GenerateRequest(BaseModel):
    ingredient: str


@router.post("/improve")
def improve_recipe(req: ImproveRequest):
    prompt = f"""
You are a professional chef.
Improve this recipe, make it healthier and suggest one variation:

{req.recipe}
"""

    response = requests.post(
        f"{GEMINI_URL}?key={GEMINI_API_KEY}",
        json={
            "contents": [
                {"parts": [{"text": prompt}]}
            ]
        }
    )

    data = response.json()
    return {"ai_suggestion": data["candidates"][0]["content"]["parts"][0]["text"]}


@router.post("/generate")
def generate_recipe(req: GenerateRequest):
    prompt = f"Create a recipe using {req.ingredient}"

    response = requests.post(
        f"{GEMINI_URL}?key={GEMINI_API_KEY}",
        json={
            "contents": [
                {"parts": [{"text": prompt}]}
            ]
        }
    )

    data = response.json()
    return {"recipe": data["candidates"][0]["content"]["parts"][0]["text"]}
