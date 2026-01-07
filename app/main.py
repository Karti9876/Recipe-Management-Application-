from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import Base, engine
from app.routes import recipes, ai

app = FastAPI(title="Smart Recipe Explorer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(recipes.router, prefix="/recipes")
app.include_router(ai.router, prefix="/ai")

app.mount("/ui", StaticFiles(directory="frontend", html=True), name="frontend")
