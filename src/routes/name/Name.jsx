import React, { useState, useRef, useEffect } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import "./Name.css";

export default function Name() {
  const nameRef = useRef();
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const onInput = (input) => setName(input.target.value);

  useEffect(() => {
    nameRef.current.focus();
    if (document.getElementById('name-input')) {
      document.getElementById('name-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (name) {
            document.getElementById('name-el').classList.add('slide-out');
            setTimeout(() => navigate('/descricao', { replace: true }), 1000);
          }
        }
      })
    }
  }, [nameRef, name, navigate]);
  
  function goToNextRoute() {
    if (name) {
      document.getElementById('name-el').classList.add('slide-out');
      setTimeout(() => navigate('/descricao', { replace: true }), 1000);
    }
  }

  return (
    <div id="name-el" className="slide-in">
      <h1 className="name-question">Qual é o seu nome?</h1>
      <p className="name-entry-parag">
        <input
          value={name}
          ref={nameRef}
          id="name-input"
          type="text"
          placeholder="Marquinhos"
          onInput={onInput}
        />
      </p>
      <BsArrowRightCircleFill
        className="btn-name-send"
        onClick={goToNextRoute}
      />
    </div>
  );
}
