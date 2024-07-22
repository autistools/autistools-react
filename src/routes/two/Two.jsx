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
  const [tout, settout] = useState(null);

  useEffect(() => {
    if (two.length < 2) {
      let couple = location.state.couples.find(
        ({ couple, available }) =>
          couple.indexOf(location.state.forbidden) === -1 && available
      );
      if (!couple) {
        couple = location.state.couples.find(({ available }) => available);
      }
      two.push(objects[couple.couple[0]], objects[couple.couple[1]]);
      couple.available = false;
      location.state.objectsTable[objects[couple.couple[0]].name].showed++;
      location.state.objectsTable[objects[couple.couple[1]].name].showed++;
    }
  }, [two, location.state]);

  useEffect(() => {
    if (two.length === 2) {
      if (index < two.length) {
        setTimeout(() => setIndex(index + 1), 1000);
      } else {
        setClickable(true);
        settout(
          setTimeout(() => {
            navigate("/ausencia", {
              replace: true,
              state: location.state,
            });
          }, 16000)
        );
      }
    }
  }, [index, two, navigate, location.state]);

  function chooseFavorite(favorite) {
    if (document.getElementById("two-el")) {
      document.getElementById("two-el").classList.add("slide-out");
    }
    location.state.objectsTable[favorite.name].chosen++;
    setTimeout(() => {
      if (tout) {
        clearTimeout(tout);
      }
      navigate("/otimo", {
        state: {
          ...favorite,
          ...location.state,
        },
        replace: true,
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
                      ),
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
