import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import "./List.css";
import objects from "../../assets/objects.json";
import Card from "../card/Card";

export default function List() {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = useState(1);
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    if (index < objects.length) {
      setTimeout(() => setIndex(index + 1), 1000);
    } else {
      setClickable(true);
    }
  }, [index]);

  function chooseFavorite(favorite) {
    if (document.getElementById("list-el")) {
      document.getElementById("list-el").classList.add("slide-out");
    }
    const couples = [];
    for (let i = 0; i < objects.length - 1; i++) {
      for (let j = i + 1; j < objects.length; j++) {
        couples.push({
          couple: [i, j],
          available: true,
        });
      }
    }
    const objectsTable = {};
    for (let object of objects) {
      objectsTable[object.name] = {
        chosen: 0,
        showed: 1,
      };
      if (object.name === favorite.name) {
        objectsTable[object.name].chosen++;
      }
    }
    setTimeout(() => {
      navigate("/preparacao", {
        state: {
          ...location.state,
          forbidden: favorite.index,
          couples: couples,
          objectsTable: objectsTable,
        },
        replace: true,
      });
    }, 1000);
  }

  return (
    <div id="list-el">
      <div id="list-head-tit">
        <span className="list-question">Escolha o seu objeto preferido</span>
        <div className="list-bar"></div>
      </div>
      <ul id="list-cards-el">
        {objects.slice(0, index).map(({ file, name: localName, next }) => (
          <li className="slide-in" key={localName}>
            <Card
              file={file}
              name={localName}
              next={next}
              clickable={clickable}
              onClick={() =>
                chooseFavorite({
                  name: localName,
                  index: objects.findIndex(({ name }) => name === localName),
                })
              }
              navigable={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
