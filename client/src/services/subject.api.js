import { isAuthenticated } from "../lib/utils.js";

export const getSubjects = async () => {
  try {
    const token = isAuthenticated();
    if (!token) {
      return;
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/subject`, {
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
