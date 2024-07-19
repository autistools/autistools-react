import React, { useState, useEffect } from "react";
import "./Favorite.css";
import { useLocation, useNavigate } from "react-router";
import Card from "../card/Card";
import objects from "../../assets/objects.json";
import { BsTable } from "react-icons/bs";

const audioFiles = require.context("../../assets/audios/", true);
const audioPaths = audioFiles.keys().map((audioFile) => audioFiles(audioFile));
const audiosArray = audioPaths.map((audioPath) => {
  return {
    path: audioPath,
    name: [audioPath.split("/")[3].split(".")[0]],
  };
});
const audios = {};
for (let audio of audiosArray) {
  audios[audio.name] = audio.path;
}

export default function Favorite() {
  const [favorite, setFavorite] = useState(null);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function audioElement() {
    return document.getElementById("audio-element");
  }

  useEffect(() => {
    setFavorite(
      objects.find(
        ({ name: localName }) =>
          localName ===
          Object.keys(
            Object.keys(location.state.objectsTable)
              .map((val) => [val, location.state.objectsTable[val]])
              .sort((val1, val2) => val2[1] - val1[1])
              .map((val) => {
                return { [val[0]]: val[1] };
              })[0]
          )[0]
      )
    );
  }, [location.state.objectsTable]);

  useEffect(() => {
    if (audioElement() && favorite) {
      audioElement().addEventListener("ended", () => {
        if (
          new URL(audioElement().src).toString() ===
          new URL(audios.preferido, window.location.origin).toString()
        ) {
          audioElement().src = audios[favorite.path];
          audioElement().loop = false;
          setShow(true);
          audioElement().removeEventListener("ended", () => {
            audioElement().src = audios.preferido;
          });
        }
      });
    }
  }, [favorite, show]);

  function goToTable() {
    if (document.getElementById("fav-el")) {
      document.getElementById("fav-el").classList.add("slide-out");
    }
    navigate("/tabela", {
      state: location.state,
      replace: true
    });
  }

  function doAgain() {
    window.history.replaceState({}, "");
    if (document.getElementById("fav-el")) {
      document.getElementById("fav-el").classList.add("slide-out");
    }
    navigate("/idade", {
      replace: true,
    });
  }

  return (
    <div id="fav-el" className="slide-in">
      <div id="fav-head-tit">
        <span className="fav-question">O seu objeto preferido é:</span>
        <div className="fav-bar"></div>
      </div>
      {show ? (
        <div className="fav-obj-box">
          <div className="card-wrapper">
            <Card
              file={favorite.file}
              name={favorite.name}
              navigable={false}
              clickable={false}
            />
          </div>
          <div className="fav-btn-wrapper">
            <button className="fav-btn-again" onClick={doAgain}>
              Refazer teste
            </button>
            <button className="fav-btn-table" onClick={goToTable}>
              Ver tabela&nbsp;
              <BsTable size={24} color={"#7ABA74"} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
