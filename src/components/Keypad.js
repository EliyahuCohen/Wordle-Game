import React, { useEffect } from "react";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

export default function Keypad({ usedKeys, handleKeyUp }) {
  const keypadKeys = [
    { key: "Q" },
    { key: "W" },
    { key: "E" },
    { key: "R" },
    { key: "T" },
    { key: "Y" },
    { key: "U" },
    { key: "I" },
    { key: "O" },
    { key: "P" },
    { key: "A" },
    { key: "S" },
    { key: "D" },
    { key: "F" },
    { key: "G" },
    { key: "H" },
    { key: "J" },
    { key: "K" },
    { key: "L" },
    { key: "Z" },
    { key: "Backspace" },
    { key: "X" },
    { key: "C" },
    { key: "V" },
    { key: "B" },
    { key: "N" },
    { key: "M" },
    { key: "Enter" },
  ];
  return (
    <div className="keypad">
      {keypadKeys.map((letter) => {
        let color = usedKeys[letter.key.toLowerCase()];
        return (
          <div
            key={letter.key}
            className={color}
            onClick={() => {
              if (letter.key === "Enter") {
                handleKeyUp(letter);
              } else if (letter.key === "Backspace") {
                handleKeyUp(letter);
              } else {
                let newLetter = { key: letter.key.toLowerCase() };
                handleKeyUp(newLetter);
              }
            }}
          >
            {letter.key == "Backspace" ? <BackspaceOutlinedIcon /> : letter.key}
          </div>
        );
      })}
    </div>
  );
}
