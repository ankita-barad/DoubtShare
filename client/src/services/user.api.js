import { isAuthenticated } from "../lib/utils";

export const register = async ({
  email,
  password,
  role,
  language,
  grade,
  name,
}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/register`,
      {
        method: "post",
        body: JSON.stringify({
          email,
          password,
          role,
          language,
          grade,
          name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

//login
export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.token) {
      // Store the token in local storage
      localStorage.setItem("dstoken", result.token);
    } else {
      console.log("Token not found in the response");
    }
  } catch (error) {
    console.log(error);
  }
};

//me
export const getMe = async () => {
  try {
    const token = isAuthenticated();
    if (!token) {
      return;
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
