import React from "react";
import "./Great.css";
import Card from "../card/Card";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { BsArrowRightCircleFill } from "react-icons/bs";
// import objects from "../../assets/objects.json";

export default function Great() {
  // const MAX_COUPLES = parseInt(objects.length * (objects.length - 1) / 2);
  
  // const MAX_COUPLES = 5;

  const navigate = useNavigate();

  const location = useLocation();

  // function isFinished(couples) {
  //   const numbers = objects.map((_, index) => index);
  //   const combinations = numbers.flatMap((v, i) =>
  //     numbers.slice(i + 1).map((w) => v + " " + w)
  //   );
  //   console.log(numbers)
  //   console.log(combinations);
  //   for (let couple of couples) {
  //     if (combinations.indexOf(couple) === -1) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

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
            objectsTable: location.state.objectsTable 
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
