import React, { useState, useEffect } from "react";
import "./Table.css";
import objects from "../../assets/objects.json";

export default function Table() {
  const [sortedObjectsTable, setSortedObjectsTable] = useState({});

  const objectsTable = {
    "Bola de Futebol": 1,
    Batman: 2,
    Moedas: 4,
    Caminhão: 7,
    YouTube: 3,
    Pintar: 2,
    Slime: 4,
    Minecraft: 5,
  };

  const EVENTS = parseInt((objects.length * (objects.length - 1)) / 2) + 1;

  useEffect(() => {
    setSortedObjectsTable(
      Object.keys(objectsTable)
        .sort()
        .reduce((obj, key) => {
          obj[key] = objectsTable[key];
          return obj;
        }, {})
    );
    console.log(sortedObjectsTable);
  }, []);

  return (
    <div id="tab-el">
      <div id="tab-head-tit">
        <span className="tab-question">
          Esses são os resultados do seu teste:
        </span>
        <div className="tab-bar"></div>
      </div>
      {Object.keys(sortedObjectsTable).length > 0 ? (
        <div className="responsive-table-box">
          <table id="result-tab">
            <thead className="table-head">
              <tr className="table-head-row">
                <th className="f1">#</th>
                <th className="f5">Objeto</th>
                <th className="f3">Porcentagem</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {Object.keys(sortedObjectsTable).map((value, index) => (
                <tr className="table-body-row" key={value}>
                  <td className="f1">{index + 1}</td>
                  <td className="f5">{value}</td>
                  <td className="f3">
                    {((sortedObjectsTable[value] / EVENTS) * 100).toFixed(2)} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
