from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List, Optional
from sqlalchemy.exc import IntegrityError

from app.models.contact import Contact as ContactModel
from app.schemas.contact import ContactCreate, ContactUpdate

class ContactServiceError(Exception):
    """Base exception for contact service errors"""
    pass

class ContactNotFoundError(ContactServiceError):
    """Raised when a contact is not found"""
    pass

class DuplicateEmailError(ContactServiceError):
    """Raised when attempting to create a contact with an existing email"""
    pass

class ContactService:
    """Service for handling contact-related business logic and data access."""
    
    def __init__(self, db: Session):
        """Constructor: Initialize service with database session.
        
        Args:
            db (Session): SQLAlchemy database session
        """
        self.db = db

    def create(self, contact: ContactCreate) -> ContactModel:
        """Create a new contact.
        
        Args:
            contact (ContactCreate): Pydantic schema with contact data
            
        Returns:
            ContactModel: Created database model instance
        """
        try:
            db_contact = ContactModel(**contact.model_dump())
            self.db.add(db_contact)
            self.db.commit()
            self.db.refresh(db_contact)
            return db_contact
        except IntegrityError as e:
            self.db.rollback()
            if "ix_contacts_email" in str(e):
                raise DuplicateEmailError("A contact with this email already exists")
            raise ContactServiceError("Failed to create contact") from e

    def get_by_id(self, contact_id: int) -> ContactModel:
        """Get contact by ID.
        
        Args:
            contact_id (int): Contact's ID
            
        Returns:
            ContactModel: Found contact
            
        Raises:
            HTTPException: If contact not found
        """
        contact = self.db.query(ContactModel).filter(
            ContactModel.id == contact_id
        ).first()
        if not contact:
            raise ContactNotFoundError(f"Contact {contact_id} not found")
        return contact

    def get_all(self, skip: int = 0, limit: int = 100) -> List[ContactModel]:
        return self.db.query(ContactModel).offset(skip).limit(limit).all()

    def update(self, contact_id: int, contact_update: ContactUpdate) -> ContactModel:
        try:
            contact = self.get_by_id(contact_id)  # This might raise ContactNotFoundError
            update_data = contact_update.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(contact, field, value)
            self.db.commit()
            self.db.refresh(contact)
            return contact
        except ContactNotFoundError:
            # Re-raise ContactNotFoundError to preserve the 404 status
            raise
        except IntegrityError as e:
            self.db.rollback()
            if "ix_contacts_email" in str(e):
                raise DuplicateEmailError("A contact with this email already exists")
            raise ContactServiceError("Failed to update contact") from e
        except Exception as e:
            self.db.rollback()
            raise ContactServiceError("Failed to update contact") from e

    def delete(self, contact_id: int) -> bool:
        try:
            contact = self.get_by_id(contact_id)  # This might raise ContactNotFoundError
            self.db.delete(contact)
            self.db.commit()
            return True
        except ContactNotFoundError:
            # Re-raise ContactNotFoundError to preserve the 404 status
            raise
        except Exception as e:
            self.db.rollback()
            raise ContactServiceError("Failed to delete contact") from e 
