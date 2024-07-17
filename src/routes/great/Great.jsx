import React from "react";
import "./Great.css";
import Object from "../object/Object";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { BsArrowRightCircleFill } from "react-icons/bs";

export default function Great() {
  const navigate = useNavigate();

  const location = useLocation();

  function goToNextRoute() {
    document.getElementById('great-el').classList.add('slide-out');
    console.log(location.state);
    navigate('/dois', {
      state: { forbidden: location.state.index }
    });
  }

  return (
    <div id="great-el" className="slide-in">
      <div className="great-question-div">
        <h1 className="great-question">Ótimo</h1>
      </div>
      <ul id="list-cards-el">
        <li className="list-cards-li slide-in" key={location.state.name}>
          <Object file={location.state.file} name={location.state.name} clickable={false} navigable={false} />
        </li>
      </ul>
      <BsArrowRightCircleFill
        className="btn-age-send"
        onClick={goToNextRoute}
      />
    </div>
  );
}
