import React, { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error_page";
import Base from "./routes/base/Base";
import Age from "./routes/age/Age";
import Name from "./routes/name/Name";
import Message from "./routes/message/Message";
import Object from "./routes/object/Object";
import List from "./routes/list/List";
import Two from "./routes/two/Two";
import Great from "./routes/great/Great";
import Table from "./routes/table/Table";

import objects from './assets/objects.json'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    errorElement: <ErrorPage />,
    children: [
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
          element: <Object file={file} name={name} next={next}/>,
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
        path: 'preparacao',
        element: (
          <Message phrase={'Agora, escolha entre dois objetos'} next={'/dois'}/>
        )
      },
      {
        path: "dois",
        element: <Two/>
      },
      {
        path: "otimo",
        element: <Great/>
      },
      {
        path: 'tabela',
        element: <Table/>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
