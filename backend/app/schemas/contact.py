from pydantic import BaseModel, EmailStr, ConfigDict
from pydantic.alias_generators import to_camel
from typing import Optional
from datetime import datetime

class BaseSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

class ContactBase(BaseSchema):
    first_name: str
    last_name: str
    email: EmailStr
    company: str
    position: str
    linkedin_url: Optional[str] = None
    notes: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseSchema):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    company: Optional[str] = None
    position: Optional[str] = None
    linkedin_url: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[str] = None
    is_active: Optional[bool] = None

class Contact(ContactBase):
    id: int
    status: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

class MessageResponse(BaseModel):
    message: str
