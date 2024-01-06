// eslint-disable-next-line react/prop-types
export const SubjectDropdown = ({ subjects, subjectId, setSubjectId }) => {
  const handleRoleChange = (e) => {
    setSubjectId(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="role" className="block text-sm font-medium text-gray-600">
        Subject
      </label>
      <select
        id="subject"
        className="mt-1 p-2 w-full border rounded-md"
        value={subjectId}
        onChange={handleRoleChange}
      >
        <option value="" disabled>
          Select Subject
        </option>
        {Object.values(subjects).map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>
    </div>
  );
};
