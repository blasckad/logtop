import { request } from "./request.js";

export const saveservice = async (token, data) => {

  const formData = {"token": token,
                    "data": data}
  const path = '/api/admin/create';

  return request(path, formData)

};

export const checkAdmin = (token) => {

  const formData = {"token": token};
  const path = '/api/admin/check';

  return request(path, formData)
}
export const getAllOrders = async (token) => {
  const formData = {"token": token};
  const path = '/api/admin/getorders';
  return request(path, formData)
  
}

export const updateOrderLevel = async (token, id) => {
  const formData = {"token": token, "id": id};
  const path = '/api/admib/updateorderlevel';
  return request(path, formData)
  
}