import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./List.css";
import objects from "../../assets/objects.json";
import Object from "../object/Object";

export default function List() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(1)
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    if (index < objects.length) {
      setTimeout(() => setIndex(index + 1), 1000);
    } else {
      setClickable(true);
    }
  }, [index]);

  function chooseFavorite(favorite) {
    document.getElementById('list-el').classList.add('slide-out');
    setTimeout(() => {
      navigate('/preparacao', {
        state: { forbidden: favorite}
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
        {objects.slice(0, index).map(({ file, name, next }, index) => (
          <li className="slide-in" key={name}>
            <Object
              file={file}
              name={name}
              next={next}
              clickable={clickable}
              onClick={() => chooseFavorite(index - 1)}
              navigable={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
