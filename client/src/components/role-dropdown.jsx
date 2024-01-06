const ROLES = {
  STUDENT: "STUDENT",
  TUTOR: "TUTOR",
};

// eslint-disable-next-line react/prop-types
export const RoleDropdown = ({ role, setRole }) => {
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="role" className="block text-sm font-medium text-gray-600">
        Role
      </label>
      <select
        id="grade"
        className="mt-1 p-2 w-full border rounded-md"
        value={role}
        onChange={handleRoleChange}
      >
        <option value="" disabled>
          Select Grade
        </option>
        {Object.values(ROLES).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};
