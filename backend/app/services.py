from typing import TYPE_CHECKING, List
from sqlalchemy.engine.reflection import Inspector as _inspector

import database
import models
import schemas
import security
import smtplib

if TYPE_CHECKING:
    from sqlalchemy.orm import Session


smtpObj = smtplib.SMTP('smtp.gmail.com', 587)
smtpObj.starttls()
smtpObj.login('blasckad@gmail.com','amxs fnsw kcdw jjbk')

def send_code(email: str):
    code = security.create_confirm_code(email=email)
    smtpObj.sendmail("logtop", email, code)



def add_tables():
    inspector = _inspector.from_engine(database.engine)
    if (not models.User.__tablename__ in inspector.get_table_names()) or (not models.Order.__tablename__ in inspector.get_table_names()):
        return database.Base.metadata.create_all(bind=database.engine)
    
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def create_user(user: schemas.BaseUser, db: "Session"):
    user = models.User(**user.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    # return schemas.User.from_orm(user)

async def login_user(email: str, password: str, db: "Session") -> bool:
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return False
    if security.verify_password(plain_password=password, hashed_password=user.password):
        return True
    else:
        return False
