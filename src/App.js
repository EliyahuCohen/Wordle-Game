import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { wordsArray } from "./words";
function App() {
  const [solution, setSolution] = useState(null);
  const array = wordsArray;
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
