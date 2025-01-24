from fastapi import APIRouter
from app.api.v1 import contacts, templates

router = APIRouter()
router.include_router(contacts.router, prefix="/contacts", tags=["contacts"])
router.include_router(templates.router, prefix="/templates", tags=["templates"])
