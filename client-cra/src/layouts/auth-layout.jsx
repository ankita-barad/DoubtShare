import { Outlet, Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/utils.js";

export default function AuthLayout() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="m-10">
      <nav>
        <ul className="flex gap-2">
          <li className="underline">
            <Link to="/auth/login">Login</Link>
          </li>
          <li className="underline">
            <Link to="/auth/register">Register</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
