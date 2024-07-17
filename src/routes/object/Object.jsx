import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Object.css";

export default function Object({
  file,
  name,
  next=null,
  navigable = true,
  millis = 5000,
  clickable = false,
  onClick = null,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (next && navigable) {
      setTimeout(() => {
        document.getElementById('obj-el').classList.add('slide-out');
        setTimeout(() => {
          document.getElementById('obj-el').classList.remove('slide-out');
          navigate(next);
        }, 1000);
      }, millis);
    }
  }, [next, navigable, millis, navigate]);

  return (
    <div id="obj-el" className="slide-in">
      <div
        id="obj-card"
        style={
          clickable
            ? {
                cursor: "pointer",
              }
            : {
              cursor: 'default'
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
        <span className="obj-name-ident">{name}</span>
      </div>
    </div>
  );
}
