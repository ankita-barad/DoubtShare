import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getDoubt, resolveDoubt } from "../services/doubt.api.js";
import { getUser } from "../lib/utils.js";
import { ChatWindow } from "../components/chat-window.jsx";
import { useNavigate } from "react-router-dom";

const DoubtDetail = () => {
  const { doubtId } = useParams();
  const [doubtDetails, setDoubtDetails] = useState(null);
  const navigate = useNavigate();

  const user = getUser();

  useEffect(() => {
    getDoubt(doubtId).then((d) => {
      setDoubtDetails(d);
    });
  }, [doubtId]);

  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  const handleResolved = async () => {
    await resolveDoubt(doubtId);
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doubt Detail</h1>

      {doubtDetails && (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Doubt Title: {doubtDetails.content}
              </h2>
              <h2>CreatedBy: {doubtDetails.created_by?.name}</h2>
            </div>
            <div>
              <button
                onClick={handleResolved}
                className="shadow bg-green-300 p-2 rounded"
              >
                Mark As Resolved
              </button>
            </div>
          </div>

          <ChatWindow
            doubtId={doubtId}
            userId={user.id}
            previousChats={doubtDetails.chat}
          />
        </div>
      )}
    </div>
  );
};

export default DoubtDetail;
