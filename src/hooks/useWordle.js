import { useState } from "react";
import { wordsArray } from "../words";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); //defoult 6 spaces
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); //will have keys as object inside of this
  const [errorMessage, setErrorMessage] = useState(false);

  //making every letter in the guess attempt to an object
  //of {key:'a', color:'yellow'} e.g
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });
    //checking for green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });
    //checking for yellow color

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });
    console.log("formatted guess", formattedGuess);
    return formattedGuess;
  };
  //here we will get the guess and then check for a lot of things
  const addNewGuess = (formattedGuess1) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prev) => {
      let newGuess = [...guesses];
      newGuess[turn] = formattedGuess1;
      return newGuess;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };
      formattedGuess1.forEach((l) => {
        const currentColor = newKeys[l.key];
        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color == "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };
  //getting a keyboard event from the keyboard
  const handleKeyUp = ({ key }) => {
    setErrorMessage(false);
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
        //cutting on echarecter from the string
      });
      return;
    }
    if (key === "Enter") {
      //only add guess if the trun is less the 5
      //and we want to check that he didnt submit it before
      //and the last check if he typed 5 chars
      if (turn > 5) {
        console.log("you used all of your guesses for this day");
        return;
      }
      const info = wordsArray.filter((one) => one.word == currentGuess)[0];
      if (!info) {
        setErrorMessage(true);
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("you already try so submited that word");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("you have to submit 5 letter word ");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (/^[A-Za-z]$/.test(key)) {
      //wont to check if the value of the key is in the range we want
      //testing if the key value is between a-z capital and small
      if (currentGuess.length < 5) {
        setCurrentGuess((prevGuess) => {
          return prevGuess + key;
        });
      }
    }
  };

  //at the end of all of the chcking we want to give back
  //some fidback and the result so we will do this by saying
  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyUp,
    usedKeys,
    errorMessage,
    setErrorMessage,
  };
};
export default useWordle;
