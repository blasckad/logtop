import datetime as _dt
from email.policy import default
from tkinter import NO
import sqlalchemy as _sql
import database

class User(database.Base):
    __tablename__ = "users"

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True)
    name = _sql.Column(_sql.String)
    telegram = _sql.Column(_sql.String)
    is_superuser = _sql.Column(_sql.Boolean)

class Order(database.Base):
    __tablename__ = "orders"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    id_user = _sql.Column(_sql.Integer)
    date = _sql.Column(_sql.Date)
    in_work = _sql.Column(_sql.Boolean)
    is_completed = _sql.Column(_sql.Boolean)
    note = _sql.Column(_sql.String)

class OrderInfos(database.Base):
    __tablename__ = "order_infos"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    id_order = _sql.Column(_sql.Integer)
    id_service = _sql.Column(_sql.Integer)
    count = _sql.Column(_sql.Integer)

class Service(database.Base):
    __tablename__ = "services"

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String)
    annotation = _sql.Column(_sql.String)
    cost = _sql.Column(_sql.Integer)
    type = _sql.Column(_sql.Integer)

class ServiceType(database.Base):
    __tablename__ = "service_types"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String)
    annotation = _sql.Column(_sql.String)
    super_type = _sql.Column(_sql.Integer)

class SuperType(database.Base):
    __tablename__ = "super_types"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String)
    annotation = _sql.Column(_sql.String)
