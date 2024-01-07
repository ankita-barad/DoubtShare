import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getDoubt } from "../services/doubt.api.js";
import { getUser } from "../lib/utils.js";
import { ChatWindow } from "../components/chat-window.jsx";

const DoubtDetail = () => {
  const { doubtId } = useParams();
  const [doubtDetails, setDoubtDetails] = useState(null);

  const user = getUser();

  useEffect(() => {
    getDoubt(doubtId).then((d) => {
      setDoubtDetails(d);
    });
  }, [doubtId]);

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doubt Detail</h1>

      {doubtDetails && (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Doubt Title: {doubtDetails.content}
          </h2>
          <h2>CreatedBy:{doubtDetails.created_by?.name}</h2>
          <h2></h2>
          <p className="text-gray-700 mb-4">{doubtDetails.description}</p>

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
