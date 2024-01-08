import { Outlet, Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/utils.js";

export default function AuthLayout() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="bg-blue-500 p-4 h-screen">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white ">
          DOUBTSHARE
        </Link>

        {/* Navigation Buttons */}
        <div>
          <Link
            to="/auth/login"
            className="bg-blue-300 px-4 py-2 rounded-md text-white hover:bg-blue-400"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="bg-blue-300 px-4 py-2 rounded-md text-white hover:bg-blue-400 ml-4"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Content Outlet */}
      <Outlet />
    </div>
  );
}
