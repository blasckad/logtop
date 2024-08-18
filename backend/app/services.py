from typing import TYPE_CHECKING, List
from sqlalchemy.engine.reflection import Inspector as _inspector
from sqlalchemy import select

import database
import models
import schemas
import security
import smtplib

if TYPE_CHECKING:
    from sqlalchemy.orm import Session


smtpObj = smtplib.SMTP('smtp.gmail.com', 587)
smtpObj.starttls()
smtpObj.login('blasckad@gmail.com','fkyq qpsm ixpq vhdb')

def send_code(email: str):
    code = security.create_confirm_code(email=email)
    smtpObj.sendmail("logtop", email, code)

def add_tables():
    inspector = _inspector.from_engine(database.engine)
    # if (not models.User.__tablename__ in inspector.get_table_names()):
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

async def login_user(email: str, db: "Session") -> bool:
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return False
    return True

async def get_services( db: "Session"):
    super_types = db.query(models.SuperType)
    services_types = db.query(models.ServiceType)
    services = db.query(models.Service)
    result = []
    i = 0
    for super_type in super_types:
        result.append({"super_type": super_type.name, "super_type_id": super_type.id, "data": []})

        j = 0
        for type in services_types:

            if type.super_type == super_type.id:
                result[i]["data"].append({"type": type.name, "type_id": type.id, "data": []})

                for service in services:

                    if service.type == type.id:
                        result[i]["data"][j]["data"].append({"name": service.name, "cost": service.cost, "id": service.id, "count": ""})
                j += 1
        i += 1
    return result


# async def get_all_orders(db: "Session"):
#     orders = db.query(models.Order)
#     orders_info = []
#     i = 0
#     for order in orders:
#         user = db.query(models.User).filter(models.User.id == order.id_user)
#         orders_info.append({"user": user, "data": [], "is_completed": order.is_completed, "in_work": order.in_work})
#         info = db.query(models.OrderInfos).filter(models.OrderInfos.id_order == order.id)
#         for service in info: 
#             super_name = db.query(models.SuperType).filter(models.SuperType.id == service.id_super_type)
#             type_name = db.query(models.ServiceType).filter(models.ServiceType.id == service.id_type)
#             service_name = db.query(models.Service).filter(models.Service.id == service.id_service)
#             orders_info[i]["data"].append({"service_name": service_name, "type_name": type_name, "super_name": super_name, "count": service.count})
#     i += 1

#     return orders_info



async def check_superuser(token: str, db: "Session"):
    access_token = security.decode_access_token(token=token)
    User = db.query(models.User).filter(models.User.email == access_token["email"])
    if not User:
        return False
    if User[0].is_superuser == True:
        return True
    return False

async def create_services(data: {}, db: "Session"):
    if data["type"] == "super":
        if data["id"] == '':
            base_super = schemas.BaseSuperType(name=data["name"], annotation=data["annotation"])
            super = models.SuperType(**base_super.dict())
            db.add(super)
            db.commit()
            db.refresh(super)
        else:
            super = db.query(models.SuperType).filter(models.SuperType.id == data["id"]).first()
            super.name = data["name"]
            super.annotation = data["annotation"]
            db.commit()
            db.refresh(super)

    
    if data["type"] == "type":
        if data["id"] == '':
            base_type = schemas.BaseType(name=data["name"], annotation=data["annotation"], super_type=data["super_type_id"])
            type = models.ServiceType(**base_type.dict())
            db.add(type)
            db.commit()
            db.refresh(type)
        else:
            type = db.query(models.ServiceType).filter(models.ServiceType.id == data["id"]).first()
            type.name = data["name"]
            type.annotation = data["annotation"]
            type.super_type = data["super_type_id"]
            db.commit()
            db.refresh(type)

    if data["type"] == "service":
        if data["id"] == '':
            base_service = schemas.BaseService(name=data["name"], annotation=data["annotation"], cost=data["cost"], type=data["type_id"])
            service = models.Service(**base_service.dict())
            db.add(service)
            db.commit()
            db.refresh(service)
        else:
            service = db.query(models.Service).filter(models.Service.id == data["id"]).first()
            service.name = data["name"]
            service.annotation = data["annotation"]
            service.type = data["type_id"]
            service.cost = data["cost"]
            db.commit()
            db.refresh(service)


async def create_order(data: {}, db: "Session"):
    access_token = security.decode_access_token(token=data["token"])
    User = db.query(models.User).filter(models.User.email == access_token["email"])
    if not User:
        return False
    user_id = User[0].id
    base_order = schemas.BaseOrder(id_user=user_id, date=data["date"], in_work=False, is_completed=False, note=data["note"])
    order = models.Order(**base_order.dict())
    db.add(order)
    db.commit()
    db.refresh(order)

    order_info = []

    for super in data["data"]:
        for type in super["data"]:
            for service in type["data"]:
                if service["count"] != "":
                    order_info.append(schemas.BaseOrderInfo(id_order=order.id, id_service=service["id"], count=service["count"]))
    
    for s in order_info:
        info = models.OrderInfos(**s.dict())
        db.add(info)
        db.commit()
        db.refresh(info)

async def get_orders(data: {}, db: "Session"):
    email = security.decode_access_token(token=data["token"])["email"]
    User = db.query(models.User).filter(models.User.email == email).first()
    if not User:
        return False
    # return User.id
    orders = db.query(models.Order).filter(models.Order.id_user == User.id)
    result = [[],[],[]]
    for order in orders:
        order_data = {"id": order.id, "date": order.date, "in_work": order.in_work, "is_completed": order.is_completed, "cell": 0, "note": order.note, "data": []}
        order_infos = db.query(models.OrderInfos).filter(models.OrderInfos.id_order == order.id)
        cell = 0
        for order_info in order_infos:
            service = db.query(models.Service).filter(models.Service.id == order_info.id_service).first()
            type = db.query(models.ServiceType).filter(models.ServiceType.id == service.type).first()
            super = db.query(models.SuperType).filter(models.SuperType.id == type.super_type).first()
            

            order_info_data = {"count": order_info.count, "service": service.name, "type": type.name, "super_type": super.name}
            order_data["data"].append(order_info_data)
            cell += service.cost * order_info.count
        
        order_data["cell"] = cell
        if order.in_work == False and order.is_completed == False:
            result[0].append(order_data)
        if order.in_work:
            result[1].append(order_data)
        if order.is_completed:
            result[2].append(order_data)
        # result.append(order_data)
    return result


async def get_all_orders(db: "Session"):
   
    orders = db.query(models.Order)
    result = [[],[],[]]
    for order in orders:
        cell = 0
        user = db.query(models.User).filter(models.User.id == order.id_user).first()
        user_data = {"email": user.email, "telegram": user.telegram, "name": user.name}
        order_data = {"id": order.id, "user": user_data, "date": order.date, "in_work": order.in_work, "is_completed": order.is_completed, "note": order.note, "cell": 0, "data": []}
        order_infos = db.query(models.OrderInfos).filter(models.OrderInfos.id_order == order.id)
        for order_info in order_infos:
            service = db.query(models.Service).filter(models.Service.id == order_info.id_service).first()
            type = db.query(models.ServiceType).filter(models.ServiceType.id == service.type).first()
            super = db.query(models.SuperType).filter(models.SuperType.id == type.super_type).first()
            

            order_info_data = {"count": order_info.count, "service": service.name, "type": type.name, "super_type": super.name}
            order_data["data"].append(order_info_data)
            cell += service.cost * order_info.count
        order_data["cell"] = cell
        if order.in_work == False and order.is_completed == False:
            result[0].append(order_data)
        if order.in_work:
            result[1].append(order_data)
        if order.is_completed:
            result[2].append(order_data)
    return result


async def delete_order(data: {}, db: "Session"):
    email = security.decode_access_token(token=data["token"])["email"]
    User = db.query(models.User).filter(models.User.email == email).first()
    if not User:
        return False
    order = db.query(models.Order).filter(models.Order.id == data["id"]).first()
    if order.id_user == User.id:
        db.delete(order)
        db.commit()

async def update_order_level(data: {}, db: "Session"):
    order = db.query(models.Order).filter(models.Order.id == data["id"]).first()
    if (order.in_work == False and order.is_completed == False):
        order.in_work = True
        db.commit()
        db.refresh(order)
    else:
        order.in_work = False
        order.is_completed = True
        db.commit()
        db.refresh(order)



