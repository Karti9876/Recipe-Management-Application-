from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Recipe
from ..schemas import RecipeCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def add_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    r = Recipe(**recipe.model_dump())
    db.add(r)
    db.commit()
    db.refresh(r)
    return r


@router.get("/")
def list_recipes(db: Session = Depends(get_db)):
    return db.query(Recipe).all()


@router.get("/search")
def search(ingredient: str, db: Session = Depends(get_db)):
    return db.query(Recipe).filter(Recipe.ingredients.contains(ingredient)).all()


@router.get("/filter")
def filter_recipes(
    cuisine: str | None = None,
    difficulty: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Recipe)
    if cuisine:
        query = query.filter(Recipe.cuisine.ilike(f"%{cuisine}%"))
    if difficulty:
        query = query.filter(Recipe.difficulty.ilike(f"%{difficulty}%"))
    return query.all()
