// Import necessary React and useState from 'react'
import { useState } from "react";
import { RoleDropdown } from "./role-dropdown";
import { GradeDropdown } from "./grade-dropdown";
import { LanguageDropdown } from "./language-dropdown";
import { register } from "../services/user.api";

// Define the RegisterForm component
export const RegisterForm = () => {
  // State variables for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [language, setLanguage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your logic here to handle the form data, like sending it to a server

    // For now, just log the form data
    console.log({
      email,
      password,
      role,
      name,
      grade,
      language,
    });

    await register({
      email,
      password,
      role,
      name,
      grade,
      language,
    });
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role Field */}
        <RoleDropdown role={role} setRole={setRole} />

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 w-full border rounded-md"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Grade Field */}
        <GradeDropdown grade={grade} setGrade={setGrade} />

        {/* Language Field */}
        <LanguageDropdown language={language} setLanguage={setLanguage} />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};
