export const isAuthenticated = () => {
  return localStorage.getItem("dstoken");
};

export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
  } catch (error) {
    console.log(error);
  }
  return;
};
