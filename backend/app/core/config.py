from pydantic_settings import BaseSettings
from functools import lru_cache
from pathlib import Path

# Get the absolute path to the backend directory
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    APP_NAME: str = "Sales Outreach API"
    DEBUG: bool = False
    API_V1_PREFIX: str = "/api/v1"
    
    # Database
    DATABASE_URL: str

    # Security
    SECRET_KEY: str

    class Config:
        env_file = str(BACKEND_DIR / ".env")  # This will correctly point to backend/.env

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings() 
