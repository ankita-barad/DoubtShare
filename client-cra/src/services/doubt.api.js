import { isAuthenticated } from "../lib/utils.js";

export const getDoubts = async ({ resolved }) => {
  try {
    const token = isAuthenticated();
    if (!token) {
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/doubt?resolved=${!!resolved}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getDoubt = async (id) => {
  try {
    const token = isAuthenticated();
    if (!token) {
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/doubt/${id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createDoubt = async ({ content, subjectId }) => {
  try {
    const token = isAuthenticated();
    if (!token) {
      return;
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/doubt`, {
      method: "post",
      body: JSON.stringify({ content, subject_id: subjectId }),
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
