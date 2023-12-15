export const singup = async (email, password, name, telegram, code) => {

  // const formData = new FormData();

  // formData.append('email', email);
  // formData.append('password', password);

  const formData = {"email": email, "password": password, "name": name, "telegram": telegram, "code": code}
  

  const request = new Request('/api/singup', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const response = await fetch(request);

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  return data;
};

export const confirm = async (email) => {
  const formData = {"email": email}
  

  const request = new Request('/api/confirmsingup', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const response = await fetch(request);

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  return data;
}


export const login = async (email, password) => {

  const formData = {"email": email, "password": password}
  

  const request = new Request('/api/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const response = await fetch(request);

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  return data;
};

export const token = async (token) => {

  const formData = {"token": token}

  const request = new Request('/api/token', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const response = await fetch(request);

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  return data;
};