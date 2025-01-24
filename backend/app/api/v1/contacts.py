from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.contact import Contact, ContactCreate, ContactUpdate, MessageResponse
from app.services.contact_service import ContactService, ContactServiceError, DuplicateEmailError, ContactNotFoundError
from app.db.session import get_db

router = APIRouter()

def get_contact_service(db: Session = Depends(get_db)) -> ContactService:
    """Dependency that creates a new ContactService instance for each request.
    
    Args:
        db (Session): Injected database session from get_db dependency
        
    Returns:
        ContactService: New service instance with database session
    """
    return ContactService(db)

@router.post("/", response_model=Contact)
async def create_contact(
    contact: ContactCreate,  # FastAPI validates incoming JSON against this schema
    service: ContactService = Depends(get_contact_service)  # Inject service
):
    """Create a new contact.
    
    FastAPI will:
    1. Validate request body against ContactCreate schema
    2. Inject ContactService instance
    3. Convert returned SQLAlchemy model to Contact schema
    """
    try:
        return service.create(contact)
    except DuplicateEmailError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except ContactServiceError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[Contact])
async def list_contacts(
    skip: int = 0, 
    limit: int = 100, 
    service: ContactService = Depends(get_contact_service)
):
    return service.get_all(skip, limit)

@router.get("/{contact_id}", response_model=Contact)
async def get_contact(
    contact_id: int, 
    service: ContactService = Depends(get_contact_service)
):
    try:
        return service.get_by_id(contact_id)
    except ContactNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ContactServiceError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{contact_id}", response_model=Contact)
async def update_contact(
    contact_id: int,
    contact_update: ContactUpdate,
    service: ContactService = Depends(get_contact_service)
):
    try:
        return service.update(contact_id, contact_update)
    except ContactNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except DuplicateEmailError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except ContactServiceError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{contact_id}", response_model=MessageResponse)
async def delete_contact(
    contact_id: int, 
    service: ContactService = Depends(get_contact_service)
):
    try:
        service.delete(contact_id)
        return MessageResponse(message=f"Contact {contact_id} deleted successfully")
    except ContactNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ContactServiceError as e:
        raise HTTPException(status_code=500, detail=str(e)) 
