import React from "react";

export default function Row({ guess, currentGuess }) {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((l, i) => {
          return (
            <div key={i} className={l.color}>
              {l.key}
            </div>
          );
        })}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className="row current">
        {/* prints only the divs with content inside of them */}
        {letters.map((letter, i) => {
          return (
            <div key={i} className="filled">
              {letter}
            </div>
          );
        })}
        {/* and this one will print the remaining from the 5-letters that
        have been reten so if i typed 3 so its 5-3 will be 2 empty divs */}
        {[...Array(5 - letters.length)].map((_, i) => {
          return <div key={i}></div>;
        })}
      </div>
    );
  }
  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
