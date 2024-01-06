// Import necessary React and useState from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDoubt } from "../services/doubt.api";
import { SubjectDropdown } from "./subject-dropdown";
import { getSubjects } from "../services/subject.api";

// Define the RegisterForm component
export const DoubtForm = () => {
  // State variables for form fields
  const [content, setContent] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getSubjects().then((s) => setSubjects(s));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // For now, just log the form data
    console.log({
      content,
      subjectId,
    });

    await createDoubt({
      content,
      subjectId,
    });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a doubt</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Content
          </label>
          <input
            type="text"
            id="content"
            className="mt-1 p-2 w-full border rounded-md"
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <SubjectDropdown
          subjectId={subjectId}
          setSubjectId={setSubjectId}
          subjects={subjects}
        />
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Doubt
        </button>
      </form>
    </div>
  );
};
