from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from pydantic.alias_generators import to_camel


class BaseSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

class TemplateBase(BaseSchema):
    name: str
    subject: str
    body: str
    description: Optional[str] = None

class TemplateCreate(TemplateBase):
    pass

class TemplateUpdate(BaseSchema):
    name: Optional[str] = None
    subject: Optional[str] = None
    body: Optional[str] = None
    description: Optional[str] = None

class Template(TemplateBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True 
