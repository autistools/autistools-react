import React from "react";
import "./Great.css";
import Card from "../card/Card";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { BsArrowRightCircleFill } from "react-icons/bs";

export default function Great() {
  const navigate = useNavigate();

  const location = useLocation();

  function isFinished() {
    for (let { available } of location.state.couples) {
      if (available) {
        return false;
      }
    }
    return true;
  }

  function goToNextRoute() {
    if (document.getElementById("great-el")) {
      document.getElementById("great-el").classList.add("slide-out");
    }
    setTimeout(() => {
      if (isFinished()) {
        navigate("/preferido", {
          state: location.state,
          replace: true
        });
      } else {
        navigate("/dois", {
          state: { 
            forbidden: location.state.index, 
            couples: location.state.couples,
            objectsTable: location.state.objectsTable,
            username: location.state.username,
            age: location.state.age
          },
          replace: true
        });
      }
    }, 1000);
  }

  return (
    <div id="great-el" className="slide-in">
      <div className="great-question-div">
        <h1 className="great-question">Ótimo</h1>
      </div>
      <ul id="list-cards-el">
        <li className="list-cards-li slide-in" key={location.state.name}>
          <Card
            file={location.state.file}
            name={location.state.name}
            clickable={false}
            navigable={false}
          />
        </li>
      </ul>
      <BsArrowRightCircleFill
        className="btn-age-send"
        onClick={goToNextRoute}
      />
    </div>
  );
}
