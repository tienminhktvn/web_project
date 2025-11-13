import Search from "./Search";

const Navbar = ({ setSearchKeyword }) => {
  return (
    <div className="flex justify-between rounded-sm px-5 py-3 select-none bg-[#f8f9fa] items-center">
      <button className="w-8 h-8">
        <img src="./assets/home.png" alt="Home Button" />
      </button>

      <Search setSearchKeyword={setSearchKeyword}></Search>
    </div>
  );
};

export default Navbar;
