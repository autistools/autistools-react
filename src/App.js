import React, { RouterProvider, createHashRouter } from "react-router-dom";
import ErrorPage from "./error_page";
import Base from "./routes/base/Base";
import Welcome from "./routes/welcome/Welcome";
import Age from "./routes/age/Age";
import Name from "./routes/name/Name";
import Message from "./routes/message/Message";
import Card from "./routes/card/Card";
import List from "./routes/list/List";
import Two from "./routes/two/Two";
import Great from "./routes/great/Great";
import Table from "./routes/table/Table";
import Favorite from "./routes/favorite/Favorite";
import objects from "./assets/objects.json";

const router = createHashRouter([
  {
    path: "/",
    element: <Base />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "seja-bem-vindo",
        element: <Welcome />,
      },
      {
        path: "idade",
        element: <Age />,
      },
      {
        path: "nome",
        element: <Name />,
      },
      {
        path: "descricao",
        element: (
          <Message
            phrase={
              "Esta é uma atividade para descobrir as suas preferências, aquilo que você mais gosta"
            }
            next={"/conheca"}
            milli={11000}
          />
        ),
      },
      {
        path: "conheca",
        element: (
          <Message
            phrase={"Primeiro, quero que você conheça cada um dos objetos"}
            next={"/batman"}
            milli={9000}
          />
        ),
      },
      ...objects.map(({ path, file, name, next }) => {
        return {
          path: path,
          element: <Card file={file} name={name} next={next} />,
        };
      }),
      {
        path: "escolha",
        element: (
          <Message phrase={"Escolha um objeto preferido"} next={"/lista"} />
        ),
      },
      {
        path: "lista",
        element: <List />,
      },
      {
        path: "preparacao",
        element: (
          <Message
            phrase={"Agora, escolha entre dois objetos"}
            next={"/dois"}
          />
        ),
      },
      {
        path: "dois",
        element: <Two />,
      },
      {
        path: "ausencia",
        element: <Message phrase={"Ausência de escolha"} next={"/dois"} />,
      },
      {
        path: "otimo",
        element: <Great />,
      },
      {
        path: "preferido",
        element: <Favorite />,
      },
      {
        path: "tabela",
        element: <Table />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
