import React, { useState, useEffect } from "react";
import "./Welcome.css";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router";

export default function Welcome() {
  const [phrase, setPhrase] = useState("Seja bem-vindo a");

  useEffect(() => {
    const timeout = setTimeout(() => {
        setPhrase("Avaliação de Item de Preferência (AIP)");
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const navigate = useNavigate();

  function goToNextRoute() {
    if (document.getElementById("wel-el")) {
      document.getElementById("wel-el").classList.add("slide-out");
    }
    setTimeout(() => {
      navigate("/idade", {
        replace: true,
      });
    }, 1000);
  }

  return (
    <div id="wel-el" className="slide-in">
      <div id="wel-head-tit">
        <span className="wel-question">{phrase}</span>
        <div className="wel-bar"></div>
      </div>
      <BsArrowRightCircleFill className="btn-start" onClick={goToNextRoute} />
    </div>
  );
}
