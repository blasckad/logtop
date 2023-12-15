from tkinter.messagebox import NO
from typing import Optional
import pydantic

class BaseUser(pydantic.BaseModel):
    email : str
    password : str
    name: str
    telegram: str
    is_superuser: bool
    # def __init__(self, email: str, password: str, name: str, telegram: str, is_superuser: bool):
    #     self.email = email
    #     self.password = password
    #     self.name = name
    #     self.telegram = telegram
    #     self.is_superuser = is_superuser


class User(BaseUser):
    id : int
    class Config:
        orm_mode = True

class CreateUser(BaseUser):
    def to_str(self):
        return ("{ " + f"email : {self.email}, "
                f"password : {self.password}, "
                 + " }")
    pass 