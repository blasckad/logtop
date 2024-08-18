from tkinter.messagebox import NO
from typing import Optional
import pydantic

class BaseUser(pydantic.BaseModel):
    email : str
    name: str
    telegram: str
    is_superuser: bool

class BaseSuperType(pydantic.BaseModel):
    name : str
    annotation : str

class BaseType(pydantic.BaseModel):
    name : str
    annotation : str
    super_type : int

class BaseService(pydantic.BaseModel):
    name : str
    annotation : str
    cost : int
    type : int

class BaseOrder(pydantic.BaseModel):
    id_user : int
    date : str
    in_work : bool
    is_completed : bool
    note : str

class BaseOrderInfo(pydantic.BaseModel):
    id_order : int
    id_service : int
    count : int

class User(BaseUser):
    id : int
    class Config:
        orm_mode = True

class Service(BaseService):
    id : int
    class Config:
        orm_mode = True


class Type(BaseType):
    id : int
    class Config:
        orm_mode = True


class SuperType(BaseSuperType):
    id : int
    class Config:
        orm_mode = True



class CreateUser(BaseUser):
    def to_str(self):
        return ("{ " + f"email : {self.email}, "
                f"password : {self.password}, "
                 + " }")
    pass 