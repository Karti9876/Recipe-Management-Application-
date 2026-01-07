from pydantic import BaseModel
class RecipeCreate(BaseModel):
    name: str
    ingredients: str
    cuisine: str
    difficulty: str
    instructions: str

class RecipeOut(RecipeCreate):
    id: int
    class Config:
        from_attributes = True