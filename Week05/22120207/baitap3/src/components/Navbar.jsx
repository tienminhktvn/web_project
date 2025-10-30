import Button from "./Button";

const Navbar = ({ navigateTo, setCurrentCategory, setHighlight }) => {
  const textColor = "text-[#7f9bba]";

  return (
    <div className="bg-[#def2fb] py-3 flex flex-row justify-between rounded-md pl-5 pr-10">
      <Button
        text={"Home"}
        className={"text-lg font-bold"}
        onClick={() => {
          navigateTo("home");
          setCurrentCategory("");
          setHighlight("");
        }}
      ></Button>

      <div className="flex flex-row gap-10">
        <Button
          text={"About"}
          className={`text-sm font-bold ${textColor}`}
        ></Button>
        <Button
          text={"Services"}
          className={`text-sm font-bold ${textColor}`}
        ></Button>
        <Button
          text={"Contact"}
          className={`text-sm font-bold ${textColor}`}
        ></Button>
      </div>
    </div>
  );
};

export default Navbar;
