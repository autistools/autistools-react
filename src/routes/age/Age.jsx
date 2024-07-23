import React, { useState, useRef, useEffect } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import "./Age.css";

export default function Age() {
  const ageRef = useRef();
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  const onInput = (input) => {
    const val = input.target.value;
    try {
      const parsed = parseInt(val);
      if (parsed <= 0 || parsed > 50) {
        throw Error("Invalid age");
      }
      setAge(parsed.toString());
    } catch (err) {
      setAge("");
      ageRef.current.focus();
    }
  };

  useEffect(() => {
    ageRef.current.focus();
    if (document.getElementById("age-input")) {
      document
        .getElementById("age-input")
        .addEventListener("keypress", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (age.trim() && document.getElementById("age-el")) {
              document.getElementById("age-el").classList.add("slide-out");
              setTimeout(
                () =>
                  navigate("/nome", {
                    state: {
                      age: age.trim(),
                    },
                    replace: true,
                  }),
                1000
              );
            }
          }
        });
    }
  }, [ageRef, age, navigate]);

  function goToNextRoute() {
    if (age.trim() && document.getElementById("age-el")) {
      document.getElementById("age-el").classList.add("slide-out");
      setTimeout(
        () =>
          navigate("/nome", {
            state: {
              age: age.trim(),
            },
            replace: true,
          }),
        1000
      );
    }
  }

  return (
    <div id="age-el" className="slide-in">
      <h1 className="age-question">Qual é a sua idade?</h1>
      <p className="age-entry-parag">
        <input
          value={age}
          ref={ageRef}
          id="age-input"
          type="number"
          placeholder="14"
          min={"1"}
          max={"18"}
          onInput={onInput}
        />
        &nbsp;anos
      </p>
      <BsArrowRightCircleFill
        className="btn-age-send"
        onClick={goToNextRoute}
      />
    </div>
  );
}
