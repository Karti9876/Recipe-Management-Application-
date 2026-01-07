import os
from fastapi import APIRouter
from dotenv import load_dotenv
from pydantic import BaseModel
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

router = APIRouter()


class ImproveRequest(BaseModel):
    recipe: str


class GenerateRequest(BaseModel):
    ingredient: str


@router.post("/improve")
def improve_recipe(req: ImproveRequest):
    prompt = f"""
You are a professional chef.

Recipe:
{req.recipe}

Improve the taste, make it healthier, and suggest one variation.
"""

    response = client.models.generate_content(
        model="gemini-flash-latest", contents=prompt
    )

    return {"ai_suggestion": response.text}


@router.post("/generate")
def generate_recipe(req: GenerateRequest):
    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=f"Create a recipe using {req.ingredient}",
    )

    return {"recipe": response.text}
