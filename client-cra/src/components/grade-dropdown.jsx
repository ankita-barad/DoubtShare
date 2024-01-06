const GRADES = {
  FIRST: "FIRST",
  SECOND: "SECOND",
  THIRD: "THIRD",
  FOURTH: "FOURTH",
  FIFTH: "FIFTH",
  SIXTH: "SIXTH",
  SEVENTH: "SEVENTH",
  EIGHTH: "EIGHTH",
  NINTH: "NINTH",
  TENTH: "TENTH",
};

// eslint-disable-next-line react/prop-types
export const GradeDropdown = ({ grade, setGrade }) => {
  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="grade"
        className="block text-sm font-medium text-gray-600"
      >
        Grade
      </label>
      <select
        id="grade"
        className="mt-1 p-2 w-full border rounded-md"
        value={grade}
        onChange={handleGradeChange}
      >
        <option value="" disabled>
          Select Grade
        </option>
        {Object.values(GRADES).map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </div>
  );
};
