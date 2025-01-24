from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.template import Template
from app.schemas.template import TemplateCreate, TemplateUpdate

class TemplateNotFoundError(Exception):
    pass

class TemplateServiceError(Exception):
    pass

class TemplateService:
    def __init__(self, db: Session):
        self.db = db

    def get_templates(self) -> List[Template]:
        try:
            return self.db.query(Template).order_by(Template.id).all()
        except Exception as e:
            raise TemplateServiceError(f"Error fetching templates: {str(e)}")

    def get_template(self, template_id: int) -> Template:
        try:
            template = self.db.query(Template).filter(Template.id == template_id).first()
            if not template:
                raise TemplateNotFoundError()
            return template
        except TemplateNotFoundError:
            raise
        except Exception as e:
            raise TemplateServiceError(f"Error fetching template: {str(e)}")

    def create_template(self, template: TemplateCreate) -> Template:
        try:
            db_template = Template(**template.model_dump())
            self.db.add(db_template)
            self.db.commit()
            self.db.refresh(db_template)
            return db_template
        except Exception as e:
            self.db.rollback()
            raise TemplateServiceError(f"Error creating template: {str(e)}")

    def update_template(self, template_id: int, template: TemplateUpdate) -> Template:
        try:
            db_template = self.get_template(template_id)
            for field, value in template.model_dump(exclude_unset=True).items():
                setattr(db_template, field, value)
            self.db.commit()
            self.db.refresh(db_template)
            return db_template
        except TemplateNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            raise TemplateServiceError(f"Error updating template: {str(e)}")

    def delete_template(self, template_id: int) -> None:
        try:
            template = self.get_template(template_id)
            self.db.delete(template)
            self.db.commit()
        except TemplateNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            raise TemplateServiceError(f"Error deleting template: {str(e)}") 
