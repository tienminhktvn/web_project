import AnimalItem from "./AnimalItem";

const Box = ({ animals = [], colors = [] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 border-2 p-2 pb-10 max-w-[80%]">
      {animals.map((animal, index) => (
        <AnimalItem
          key={index}
          animal={animal}
          color={colors[index % colors.length]}
        />
      ))}
    </div>
  );
};

export default Box;
