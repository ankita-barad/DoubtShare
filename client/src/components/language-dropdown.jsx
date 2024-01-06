export const LANGUAGES = {
  HINDI: "HINDI",
  ENGLISH: "ENGLISH",
  KANNADA: "KANNADA",
};

export const LanguageDropdown = ({ language, setLanguage }) => {
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="language"
        className="block text-sm font-medium text-gray-600"
      >
        Language
      </label>
      <select
        id="language"
        className="mt-1 p-2 w-full border rounded-md"
        value={language}
        onChange={handleLanguageChange}
      >
        <option value="" disabled>
          Select Language
        </option>
        {Object.values(LANGUAGES).map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};
