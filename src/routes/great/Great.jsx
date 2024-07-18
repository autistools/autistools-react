import React from "react";
import "./Great.css";
import Object from "../object/Object";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { BsArrowRightCircleFill } from "react-icons/bs";
import objects from "../../assets/objects.json";

export default function Great() {
  const MAX_COUPLES = parseInt(objects.length * (objects.length - 1) / 2);

  const navigate = useNavigate();

  const location = useLocation();

  console.log(location.state);

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

  function goToNextRoute() {
    if (document.getElementById("great-el")) {
      document.getElementById("great-el").classList.add("slide-out");
    }
    if (location.state.couples.length === MAX_COUPLES) {
      navigate("/tabela", {
        state: location.state,
      });
    } else {
      navigate("/dois", {
        state: { 
          forbidden: location.state.index, 
          couples: location.state.couples,
          objectsTable: location.state.objectsTable 
        },
      });
    }
  }

  return (
    <div id="great-el" className="slide-in">
      <div className="great-question-div">
        <h1 className="great-question">Ótimo</h1>
      </div>
      <ul id="list-cards-el">
        <li className="list-cards-li slide-in" key={location.state.name}>
          <Object
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
