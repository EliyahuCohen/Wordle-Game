import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution }) {
  const [error, setError] = useState(false);
  const {
    currentGuess,
    handleKeyUp,
    errorMessage,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    setErrorMessage,
  } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      window.removeEventListener("keyup", handleKeyUp);
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }
    if (errorMessage) {
      setError(true);
      setTimeout(() => {
        setErrorMessage(false);
        setError(false);
      }, 1000);
    }

    if (turn > 5) {
      window.removeEventListener("keyup", handleKeyUp);
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, turn, isCorrect]);

  if (error) {
    return <h1 style={{ color: "red" }}>This is not a real word!!!</h1>;
  }
  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} handleKeyUp={handleKeyUp} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
}
