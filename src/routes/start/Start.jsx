import React from "react";
import "./Start.css";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router";

export default function Start() {
  const navigate = useNavigate();

  function goToNextRoute() {
    if (document.getElementById("star-el")) {
      document.getElementById("star-el").classList.add("slide-out");
    }
    setTimeout(() => {
      navigate("/seja-bem-vindo", {
        replace: true,
      });
    }, 1000);
  }

  return (
    <div id="star-el" className="slide-in">
      <div id="star-head-tit">
        <span className="star-question">Vamos começar?</span>
        <div className="star-bar"></div>
      </div>
      <BsArrowRightCircleFill className="star-start" onClick={goToNextRoute} />
    </div>
  );
}
