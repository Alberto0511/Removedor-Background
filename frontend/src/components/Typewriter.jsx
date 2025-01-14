
import React, { useState, useEffect } from "react";

const Typewriter = ({ phrases, speed = 100, delay = 2000 }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const updateText = () => {
      if (!deleting) {
        setCurrentText((prev) =>
          currentPhrase.substring(0, prev.length + 1)
        );
        if (currentText === currentPhrase) {
          setTimeout(() => setDeleting(true), delay); 
        }
      } else {
        setCurrentText((prev) =>
          currentPhrase.substring(0, prev.length - 1)
        );
        if (currentText === "") {
          setDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const timer = setTimeout(updateText, speed);
    return () => clearTimeout(timer);
  }, [currentText, deleting, phrases, currentIndex, speed, delay]);

  return (
    <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">
      {currentText}
      <span className="border-r-2 border-purple-700 animate-blink"></span>
    </h1>
  );
};

export default Typewriter;
