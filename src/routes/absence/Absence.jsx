import React from "react";
import { useLocation } from "react-router";
import Message from "../message/Message";

export default function Absence() {
  const location = useLocation();

  return (
    <Message
      phrase={"Ausência de escolha"}
      next={
        location.state.couples.find(({ available }) => available)
          ? "/dois"
          : "/preferido"
      }
    />
  );
}
