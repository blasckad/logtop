import jwt
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
import random

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

cacheCodes = {}

SECRET_KEY = "super_secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 300

def create_confirm_code(email: str) -> str:
    code = str(random.randint(1000, 9999))
    # cacheCodes.update([email, get_password_hash(password=code)])
    cacheCodes.update({email: code})
    return code

def check_code(email: str, code: str) -> bool:
    hashed_code = cacheCodes.get(email)
    if hashed_code == None:
        return False
    # if verify_password(plain_password=code, hashed_password=hashed_code):
    #     return True
    if hashed_code == code:
        return True
    return False

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(*, data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=300)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)