/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const DoubtCard = ({
  content,
  id,
  subject,
  created_by,
  resolved,
  tutored_by,
}) => {
  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <Link to={`/doubt/${id}`}>
        <h2 className="text-2xl font-semibold mb-4 underline">Doubt #{id}</h2>
      </Link>
      <p className="text-gray-600 mb-4">{content}</p>

      <div className="flex justify-between mb-4">
        <div>
          <p className="font-semibold">Subject: {subject?.name}</p>
          <p className="text-gray-600">Created by: {created_by?.name}</p>
        </div>

        <div>
          {resolved ? (
            <span className="bg-green-500 text-white p-2 rounded-md">
              Resolved
            </span>
          ) : (
            <span className="bg-red-500 text-white p-2 rounded-md">
              Unresolved
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-600">Tutored by: {tutored_by?.name}</p>
    </div>
  );
};
