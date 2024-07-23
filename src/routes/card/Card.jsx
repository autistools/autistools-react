import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import "./Card.css";

export default function Card({
  file,
  name,
  next = null,
  navigable = true,
  millis = 3000,
  clickable = false,
  onClick = null,
}) {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (next && navigable) {
      setTimeout(() => {
        if (document.getElementById("card-el")) {
          document.getElementById("card-el").classList.add("slide-out");
        }
        setTimeout(() => {
          if (document.getElementById("card-el")) {
            document.getElementById("card-el").classList.remove("slide-out");
          }
          navigate(next, { state: location.state, replace: true });
        }, 1000);
      }, millis);
    }
  }, [next, navigable, millis, navigate, location]);

  return (
    <div id="card-el" className="slide-in">
      <div
        id="card-div"
        style={
          clickable
            ? {
                cursor: "pointer",
              }
            : {
                cursor: "default",
              }
        }
        onClick={() => {
          if (clickable && onClick) {
            onClick();
          }
        }}
      >
        <div id="inner-box">
          <img
            src={require(`../../assets/objs/${file}`)}
            alt={`Objeto '${name}'`}
            className="anim-img"
          />
        </div>
        <span className="card-name-ident">{name}</span>
      </div>
    </div>
  );
}
