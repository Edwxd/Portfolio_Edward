import React, { JSX } from 'react';

const protectedWords = ["React", "MongoDB", "Google", "TechMaster", "Edward", "En", "Fr"]; // Add words you don’t want translated

export function protectWords(text: string): JSX.Element[] {
  return text.split(" ").map((word, index) =>
    protectedWords.includes(word) ? (
      <span key={index} className="notranslate" translate="no">
        {word}{" "}
      </span>
    ) : (
      <span key={index}>{word} </span>
    )
  );
}

