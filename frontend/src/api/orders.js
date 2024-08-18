import { request } from "./request.js";

export const createOrder = async (token, date, note, data) => {
    const formData = {"token": token, "date": date, "note": note, "data": data};
    const path = '/api/createorder';
    return request(path, formData)
    
  }

  export const getOrders = async (token) => {
    const formData = {"token": token};
    const path = '/api/getorders';
    return request(path, formData)
    
  }

  export const deleteOrder = async (token, id) => {
    const formData = {"token": token, "id": id};
    const path = '/api/deleteorder';
    return request(path, formData)
    
  }