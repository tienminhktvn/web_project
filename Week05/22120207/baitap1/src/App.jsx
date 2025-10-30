import AnimalItem from "./components/AnimalItem";
import Box from "./components/Box";

function App() {
  const animals = [
    "🐁",
    "🐃",
    "🐅",
    "🐈",
    "🐉",
    "🐍",
    "🐎",
    "🐐",
    "🐒",
    "🐔",
    "🐕",
    "🐖",
  ];

  const colors = [
    ["#5eba6d", "#a0c856"],
    ["#c54ba8", "#cc1120"],
    ["#71b6fb", "#4599ef"],
    ["#f0aba2", "#fcbd0c"],
    ["#af8fe5", "#f5c4ed"],
    ["#f5e0a9", "#e0912b"],
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <Box animals={animals} colors={colors}></Box>
    </div>
  );
}

export default App;
