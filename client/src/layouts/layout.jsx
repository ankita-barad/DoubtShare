import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../lib/utils.js";
import { useEffect, useState } from "react";
import { getMe } from "../services/user.api.js";
import { getUser } from "../lib/utils.js";
import { socket } from "../socket.js";
import { NewDoubtSnack } from "../components/new-doubt-snack.jsx";
import { acceptDoubt } from "../services/doubt.api.js";

export default function Layout() {
  const navigate = useNavigate();

  const token = isAuthenticated();

  const [newDoubt, setNewDoubt] = useState(null);

  useEffect(() => {
    if (!token) return;
    getMe().then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
    });
  }, [token]);

  const user = getUser();

  useEffect(() => {
    if (!user || !user.id) return;

    socket.connect();

    function onConnect() {
      console.log("CONNECTED");
      socket.emit("online", user.id);
    }

    function onDisconnect() {
      console.log("DISCONNECTED");
      socket.emit("offline", user.id);
    }

    function handleNewDoubt(doubt) {
      console.log("GOT A DOUBT", doubt);
      setNewDoubt(doubt);
    }

    socket.on("new_doubt", handleNewDoubt);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [user]);

  if (!token) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("dstoken");
    localStorage.removeItem("user");
    socket.emit("offline", user.id);
    socket.disconnect();
    navigate(0);
  };

  const onAccept = async () => {
    await acceptDoubt(newDoubt.id);
    navigate(`/doubt/${newDoubt.id}`);
  };

  return (
    <div className="bg-gray-400">
      <div className="flex flex-col  w-4/6 mx-auto">
        <div className="bg-gray-800 text-white p-4  flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-semibold">DoubtShare</h1>
          </Link>

          <nav className="flex gap-2 underline">
            <Link to="/">Home</Link>
            {user?.role === "STUDENT" && (
              <Link to="/doubt/create">Create Doubt</Link>
            )}
          </nav>

          <div className="flex  items-center gap-2">
            <p>{user?.name}</p>
            <p>{user?.role}</p>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white underline"
            >
              Logout
            </button>
          </div>
        </div>
        {newDoubt && (
          <NewDoubtSnack
            {...newDoubt}
            onAccept={onAccept}
            onClose={() => setNewDoubt(null)}
          />
        )}
        <Outlet />
      </div>
    </div>
  );
}
