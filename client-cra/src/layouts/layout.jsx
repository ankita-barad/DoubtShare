import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../lib/utils.js";
import { useEffect } from "react";
import { getMe } from "../services/user.api.js";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    getMe().then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
    });
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("dstoken");
    localStorage.removeItem("user");
    navigate(0);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-800 text-white p-4  flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-semibold">DoubtShare</h1>
        </Link>

        <nav className="flex gap-2 underline">
          <Link to="/">Home</Link>
          <Link to="/doubt/create">Create Doubt</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="text-gray-300 hover:text-white"
        >
          Logout
        </button>
      </div>

      <Outlet />
    </div>
  );
}
