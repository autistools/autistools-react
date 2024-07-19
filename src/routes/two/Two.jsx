import React, { useState, useEffect } from "react";
import "./Two.css";
import objects from "../../assets/objects.json";
import Card from "../card/Card";
import { useNavigate, useLocation } from "react-router";

export default function Two() {
  const [index, setIndex] = useState(1);
  const [clickable, setClickable] = useState(false);
  const [two] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (two.length < 2) {
      let rand1 = null,
        rand2 = null;
      while (
        (rand1 = parseInt(Math.random() * objects.length)) ===
        location.state.forbidden
      );
      while (
        (rand2 = parseInt(Math.random() * objects.length)) === rand1 ||
        rand2 === location.state.forbidden
      );
      two.push(objects[rand1], objects[rand2]);
      location.state.couples.push(`${rand1} ${rand2}`);
    }
  }, [two, location.state]);

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
    if (document.getElementById("two-el")) {
      document.getElementById("two-el").classList.add("slide-out");
    }
    location.state.objectsTable[favorite.name]++;
    setTimeout(() => {
      navigate("/otimo", {
        state: {
          ...favorite,
          ...location.state
        },
        replace: true
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
          ? two.slice(0, index).map(({ file, name: localName }) => (
              <li className="slide-in" key={localName}>
                <Card
                  file={file}
                  name={localName}
                  clickable={clickable}
                  onClick={() =>
                    chooseFavorite({
                      file: file,
                      name: localName,
                      index: objects.findIndex(
                        ({ name }) => name === localName
                      )
                    })
                  }
                  navigable={false}
                />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
