import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import "./Message.css";

export default function Message({phrase, next, milli=5000}) {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById('msg-el')) {
        document.getElementById('msg-el').classList.add('slide-out');
      }
      setTimeout(() => {
        if (document.getElementById('msg-el')) {
          document.getElementById('msg-el').classList.remove('slide-out');
        }
        navigate(next, {
          state: location.state,
          replace: true
        });
      }, 1000);
    }, milli);
  }, [milli, navigate, next, location.state]);

  return (
    <div id="msg-el" className="slide-in">
      <h1 className="msg-question">{phrase}</h1>
    </div>
  );
}
