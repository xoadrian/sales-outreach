from fastapi import APIRouter
from app.api.v1 import contacts

router = APIRouter()
router.include_router(contacts.router, prefix="/contacts", tags=["contacts"]) 
