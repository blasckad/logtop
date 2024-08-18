from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
import fastapi
from fastapi import FastAPI
from fastapi import APIRouter, Depends, HTTPException, status
import uvicorn
import services
import schemas
import models
import sqlalchemy.orm as _orm
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone    
import jwt
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
import security

app = FastAPI()

# KEY_TEMPLATE = "user_account-{user_id}-{account_id}" 
# CACHE_TTL_SECONDS = 24 * 60 * 60  # 24 hours
# cache = CacheStorage()



@app.get("/api/")
async def root():
    return {"message": "Logtop"}

@app.post("/api/confirmsingup")
async def confirmsingup(item: dict):
    services.send_code(email=item["email"])

@app.post("/api/singup")
async def singup(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):

    if security.check_code(email=item["email"], code=item["code"]):
        user_data = schemas.BaseUser(email=item["email"], name=item["name"], telegram=item["telegram"], is_superuser=False)
        await services.create_user(user=user_data, db=db)

        token = security.create_access_token(data={"email": item["email"]})
        return {"token": token}
    else:
        return "Error Code"

@app.post("/api/confirmlogin")
async def login(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):

    auth = await services.login_user(email=item["email"], db=db)

    if auth:
        services.send_code(email=item["email"])
    else:
        return "Not User"
    return "User Exist"

@app.post("/api/login")
async def login(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):

    if security.check_code(email=item["email"], code=item["code"]):

        token = security.create_access_token(data={"email": item["email"]})
        return {"token": token}
    else:
        return "Error Code"

@app.post("/api/token")
async def token(item: dict):
    return security.decode_access_token(token=item["token"])
    # return item["token"]

@app.get("/api/servicesdata")
async def get_services_data(db: _orm.Session = fastapi.Depends(services.get_db)):
    data = await services.get_services(db=db)
    return data

@app.post("/api/admin/create")
async def create_services(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):
    if services.check_superuser(token=item["token"], db=db):
        return await services.create_services(data=item["data"], db=db)
        # return(1)
  
@app.post("/api/admin/check")
async def create_services(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):
    return await services.check_superuser(token=item["token"], db=db)
    # return "133"


@app.post("/api/createorder")
async def create_services(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):
    await services.create_order(data=item, db=db)

@app.post("/api/getorders")
async def create_services(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):
    return await services.get_orders(data=item, db=db)

@app.post("/api/admin/getorders")
async def create_services(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):
    if await services.check_superuser(token=item["token"], db=db):
        return await services.get_all_orders(db=db)

@app.post("/api/deleteorder")
async def delete_order(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):
    await services.delete_order(data=item, db=db)


@app.post("/api/admib/updateorderlevel")
async def delete_order(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):
    if await services.check_superuser(token=item["token"], db=db):
        await services.update_order_level(data=item, db=db)



if __name__ == "__main__":
    # services.add_tables()
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
