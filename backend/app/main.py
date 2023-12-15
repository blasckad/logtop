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
async def token(item: dict):
    services.send_code(email=item["email"])


    


@app.post("/api/singup")
async def singup(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):

    if security.check_code(email=item["email"], code=item["code"]):
        user_data = schemas.BaseUser(email=item["email"], password=security.get_password_hash(item["password"]), name=item["name"], telegram=item["telegram"], is_superuser=False)
        await services.create_user(user=user_data, db=db)

        token = security.create_access_token(data={"email": item["email"]})
        return {"token": token}
    else:
        return "Error Code"

@app.post("/api/login")
async def login(item: dict, db: _orm.Session = fastapi.Depends(services.get_db)):

    auth = await services.login_user(email=item["email"], password=item["password"], db=db)

    if auth:
        token = security.create_access_token(data={"email": item["email"]})
    else:
        return "Not User"
    return {"token": token}

@app.post("/api/token")
async def token(item: dict):
    return security.decode_access_token(token=item["token"])
    # return item["token"]


if __name__ == "__main__":
    services.add_tables()
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
