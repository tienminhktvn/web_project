import { useState } from "react";

const Search = ({ setSearchKeyword }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setSearchKeyword(inputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        className="px-3 py-2 bg-white rounded-sm border-[#dedfe1] border"
        placeholder="Search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="text-green-700 border border-green-700 rounded-sm px-5"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
