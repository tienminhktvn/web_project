import Button from "./Button";

const Sidebar = ({
  currentCategory,
  setCurrentCategory,
  navigateTo,
  highlight,
  setHighlight,
}) => {
  const textColor = "text-[#7f9bba]";

  const categories = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  const onClick = (category) => {
    if (category === currentCategory) {
      setCurrentCategory("");
      setHighlight("");
    } else {
      setCurrentCategory(category);
      setHighlight(category);
    }
    navigateTo("home");
  };

  return (
    <div className="bg-[#fcf3d6] rounded-md flex flex-col p-5 gap-6">
      {categories.map((category) => {
        return (
          <Button
            text={category}
            className={`text-sm ${textColor} text-left pr-15 pl-1`}
            onClick={() => onClick(category)}
            highlight={highlight}
          ></Button>
        );
      })}
    </div>
  );
};

export default Sidebar;
