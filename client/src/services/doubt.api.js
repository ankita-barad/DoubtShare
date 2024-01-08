import { isAuthenticated } from "../lib/utils.js";

export const getDoubts = async ({ resolved }) => {
  try {
    const token = isAuthenticated();
    if (!token) {
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/doubt?resolved=${!!resolved}`,
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
      `${import.meta.env.VITE_API_URL}/doubt/${id}`,
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

export const resolveDoubt = async (id) => {
  try {
    const token = isAuthenticated();
    if (!token) {
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/doubt/${id}/resolve`,
      {
        method: "put",
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

export const acceptDoubt = async (id) => {
  try {
    const token = isAuthenticated();
    if (!token) {
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/doubt/${id}/accept`,
      {
        method: "put",
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

export const sendMessage = async ({ text, userId, doubtId }) => {
  try {
    const token = isAuthenticated();
    if (!token) {
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/doubt/${doubtId}/chat`,
      {
        method: "post",
        body: JSON.stringify({
          text,
          userId,
          doubtId,
        }),
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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/doubt`, {
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
