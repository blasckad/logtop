import datetime as _dt
from email.policy import default
from tkinter import NO
import sqlalchemy as _sql
import database

class User(database.Base):
    __tablename__ = "users"

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True)
    password = _sql.Column(_sql.String)
    name = _sql.Column(_sql.String)
    telegram = _sql.Column(_sql.String)
    is_superuser = _sql.Column(_sql.Boolean)

class Order(database.Base):
    __tablename__ = "orders"

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    id_user = _sql.Column(_sql.Integer)
    sum = _sql.Column(_sql.Integer)
    date = _sql.Column(_sql.Date)
    in_work = _sql.Column(_sql.Boolean)
    is_completed = _sql.Column(_sql.Boolean)
