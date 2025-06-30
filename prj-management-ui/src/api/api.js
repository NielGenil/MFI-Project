export const BASE_URL = "http://127.0.0.1:8000";

export const LoginAPI = async (formData) => {
  const credentials = Object.fromEntries(formData.entries());
  const response = await fetch(`${BASE_URL}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
};

export const TaskAPI = async (data) => {
  const response = await fetch(`${BASE_URL}/api/task/`, {
    method: "POST",
    body: data, // browser sets the correct multipart/form-data headers
  });

  return await response.json();
};

// export const getTask = async () => {
//   const response = await fetch(`${BASE_URL}/api/task/`);
//   return await response.json();
// };


export const getTask = async() => {
    const response = await fetch(`${BASE_URL}/api/task/`);
    const res = await response.json();
    console.log(res);
    return res;
};

export const getUser = async() => {
    const response = await fetch(`${BASE_URL}/api/user/`);
    const res = await response.json();
    console.log(res);
    return res;
};

export const getAssignUserTaskAPI = async() => {
    const response = await fetch(`${BASE_URL}/api/assign-user-task/`);
    const res = await response.json();
    console.log(res);
    return res;
};

export const AssignUserTaskAPI = async (data) => {
  const response = await fetch(`${BASE_URL}/api/assign-user-task/`, {
    method: "POST",
    body: data, // browser sets the correct multipart/form-data headers
  });

  return await response.json();
};