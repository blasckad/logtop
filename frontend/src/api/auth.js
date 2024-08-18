import { request } from "./request.js";

export const singup = async (email, name, telegram, code) => {

  const formData = {"email": email, "name": name, "telegram": telegram, "code": code};
  const path = '/api/singup';

  return request(path, formData)

};

export const confirmSingUP = async (email) => {
  const formData = {"email": email};
  const path = '/api/confirmsingup';
  return request(path, formData)
  
}


export const login = async (email, code) => {

  const formData = {"email": email, "code": code}
  const path = '/api/login';
  return request(path, formData)
  
};

export const confirmLogin = async (email) => {

  const formData = {"email": email}
  const path = '/api/confirmlogin';
  return request(path, formData)
  
};

export const token = async (token) => {

  const formData = {"token": token}
  const path = '/api/token'
  return request(path, formData)
};