import React from "react";
import { useLocation } from "react-router";

export default function ErrorPage() {
  const location = useLocation();

  return (
    <div id="error-page">
      <div id="error-box">
      <a href="https://juntos.art.br/" target="_blank" rel="noreferrer">
        <img
          className="juntos-logo"
          src={require("./assets/logo_Juntos.png")}
          alt="Logo JunTOs Metaversos Terapêuticos"
        />
      </a>
      <p><strong>404.</strong> <span className="grey-color">Isso foi um erro!</span></p>
      <p>A URL {location.pathname} solicitada não foi encontrada no servidor. <br/><span className="grey-color">Isso é tudo que sabemos.</span></p>
      </div>
    </div>
  );
}
