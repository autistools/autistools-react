import React, { useState, useEffect } from "react";
import "./Two.css";
import objects from "../../assets/objects.json";
import Object from "../object/Object";
import { useNavigate, useLocation } from "react-router";

export default function Two() {
  const [index, setIndex] = useState(1);
  const [clickable, setClickable] = useState(false);
  const [two] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (two.length < 2) {
      let rand1 = null, rand2 = null;
      while ((rand1 = parseInt(Math.random() * objects.length)) === location.state.forbidden );
      while ((rand2 = parseInt(Math.random() * objects.length)) === rand1 || rand2 === location.state.forbidden);
      two.push(objects[rand1], objects[rand2]);
    }
  }, [two, location.state.forbidden]);

  useEffect(() => {
    if (two.length === 2) {
      if (index < two.length) {
        setTimeout(() => setIndex(index + 1), 1000);
      } else {
        setClickable(true);
      }
    }
  }, [index, two]);

  function chooseFavorite(favorite) {
    document.getElementById("two-el").classList.add("slide-out");
    setTimeout(() => {
      navigate("/otimo", {
        state: favorite ,
      });
    }, 1000);
  }

  return (
    <div id="two-el" className="slide-in">
      <div className="two-question-div">
        <h1 className="two-question">Escolha o seu objeto preferido</h1>
      </div>
      <ul id="list-cards-el">
        {two.length === 2
          ? two.slice(0, index).map(({ file, name : localName}) => (
              <li className="slide-in" key={localName}>
                <Object
                  file={file}
                  name={localName}
                  clickable={clickable}
                  onClick={() => chooseFavorite({ file: file, name: localName, index: objects.findIndex(({name}) => name === localName) })}
                  navigable={false}
                />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
