import React, { useState, useEffect } from "react";
import "./Base.css";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { useLocation } from "react-router";

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

export default function Base() {
  const navigate = useNavigate();
  const [volume, setVolume] = useState(true);
  const [ended, setEnded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    navigate("/seja-bem-vindo", { replace: true });
  }, [navigate]);

  const audioElement = () => document.getElementById("audio-element");

  useEffect(() => {
    audioElement().src = audios[pathname.slice(1)];
    setEnded(false);
  }, [setEnded, pathname, volume]);

  function toggleVolume() {
    if (!ended) {
      if (volume) {
        audioElement().pause();
      } else {
        audioElement().play();
      }
    }
    setVolume((volume) => !volume);
  }

  return (
    <div id="base-el">
      <header id="heading-el">
        <audio
          id="audio-element"
          onEnded={() => setEnded(true)}
          preload="auto"
          autoPlay={volume ? true : false}
          loop={false}
        >
          <source src={audios["idade"]} type="audio/mpeg" />
        </audio>
        <h1 className="app-name">AutisTools</h1>
        <a href="https://juntos.art.br/" target="_blank" rel="noreferrer">
          <img
            className="juntos-logo"
            src={require("../../assets/logo_Juntos.png")}
            alt="Logo JunTOs Metaversos Terapêuticos"
          />
        </a>
      </header>
      <div id="audio" onClick={toggleVolume}>
        {volume ? (
          <BsFillVolumeUpFill size={24} color={"#9F9F9F"} />
        ) : (
          <BsFillVolumeMuteFill size={24} color={"#9F9F9F"} />
        )}
      </div>
      <div id="main">
        <Outlet />
      </div>
      <footer className="footer-el">
        <p>© Copyright 2024 JuntOS Metaversos Terapêuticos</p>
      </footer>
    </div>
  );
}
