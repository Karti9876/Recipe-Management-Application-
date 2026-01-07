print("MODELS FILE LOADED")
from sqlalchemy import Column , Integer , String , Text
from .database import Base

class Recipe(Base):
    __tablename__ = 'recipes'

    id = Column(Integer , primary_key=True , index=True)
    name = Column(String(100))
    ingredients = Column(Text)
    cuisine = Column(String(100))
    difficulty = Column(String(100))
    instructions = Column(Text)
