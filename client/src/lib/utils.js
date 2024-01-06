export const isAuthenticated = () => {
  return localStorage.getItem("dstoken");
};

export const getUser = () => {
  return localStorage.getItem("user");
};
