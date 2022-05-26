import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function App() {
  const [solution, setSolution] = useState(null);
  const array = [
    { word: "ninga", id: 1 },
    { word: "spade", id: 2 },
    { word: "apple", id: 3 },
    { word: "drive", id: 4 },
    { word: "relax", id: 5 },
    { word: "times", id: 6 },
    { word: "train", id: 7 },
    { word: "cores", id: 8 },
    { word: "pours", id: 9 },
    { word: "blame", id: 10 },
    { word: "banks", id: 11 },
    { word: "phone", id: 12 },
    { word: "coins", id: 13 },
    { word: "hello", id: 14 },
    { word: "click", id: 15 },
  ];
  useEffect(() => {
    const randomSolution = array[Math.floor(Math.random() * array.length)];
    setSolution(randomSolution.word); //because the random.. returns an object
  }, [setSolution]);
  //if we use this inside of the useEffect we have to put this is the dependicies list

  return (
    <div className="App">
      <div className="navbar">
        <div className="navbarIn">
          <MenuIcon />
          <HelpOutlineOutlinedIcon />
        </div>
        <h1>wordle</h1>
        <div className="navbarIn">
          <InsertChartOutlinedIcon />
          <SettingsOutlinedIcon />
        </div>
      </div>

      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
