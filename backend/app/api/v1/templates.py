from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.template import Template, TemplateCreate, TemplateUpdate
from app.services.template_service import TemplateService, TemplateNotFoundError, TemplateServiceError

router = APIRouter()

def get_template_service(db: Session = Depends(get_db)) -> TemplateService:
    return TemplateService(db)

@router.get("", response_model=List[Template])
def get_templates(service: TemplateService = Depends(get_template_service)):
    try:
        return service.get_templates()
    except TemplateServiceError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{template_id}", response_model=Template)
def get_template(template_id: int, service: TemplateService = Depends(get_template_service)):
    try:
        return service.get_template(template_id)
    except TemplateNotFoundError:
        raise HTTPException(status_code=404, detail="Template not found")
    except TemplateServiceError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", response_model=Template, status_code=201)
def create_template(template: TemplateCreate, service: TemplateService = Depends(get_template_service)):
    try:
        return service.create_template(template)
    except TemplateServiceError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{template_id}", response_model=Template)
def update_template(template_id: int, template: TemplateUpdate, service: TemplateService = Depends(get_template_service)):
    try:
        return service.update_template(template_id, template)
    except TemplateNotFoundError:
        raise HTTPException(status_code=404, detail="Template not found")
    except TemplateServiceError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{template_id}", status_code=204)
def delete_template(template_id: int, service: TemplateService = Depends(get_template_service)):
    try:
        return service.delete_template(template_id)
    except TemplateNotFoundError:
        raise HTTPException(status_code=404, detail="Template not found")
    except TemplateServiceError as e:
        raise HTTPException(status_code=500, detail=str(e)) 
