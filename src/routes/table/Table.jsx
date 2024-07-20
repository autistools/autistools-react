import React, { useState, useEffect } from "react";
import "./Table.css";
import { useLocation } from "react-router";
import { BsDownload, BsClipboard, BsClipboardCheck } from "react-icons/bs";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router";

export default function Table() {
  const location = useLocation();

  const [sortedObjectsTable, setSortedObjectsTable] = useState([]);

  const [copyClipboardClicked, setCopyClipboardClicked] = useState(false);
  const [downloadTableClicked, setDownloadTableClicked] = useState(false);

  const navigate = useNavigate();

  function copyToClipboard() {
    setCopyClipboardClicked(true);
    const description = document.getElementById("result-tab");
    const innerText = description.innerText;
    const split = innerText.split("\n");
    const cleanSplit = split.slice(0, split.length - 2);
    let result = "";
    for (let i = 0, j = 1; i < cleanSplit.length; i++, j++) {
      result += cleanSplit[i];
      if (i !== 0 && j === 3) {
        result += "\n";
        j = 0;
      } else if (i < cleanSplit.length - 1) {
        result += " ";
      }
    }
    navigator.clipboard.writeText(result);
    setTimeout(() => setCopyClipboardClicked(false), 2000);
  }

  function downloadTable() {
    setDownloadTableClicked(true);
    let csvData = []; // Download CSV.
    let xlsxData = [];
    let rows = [...document.getElementsByTagName("tr")];
    rows = rows.slice(0, rows.length - 1); // Ignore the <tr> of the buttons.
    for (let i = 0; i < rows.length; i++) {
      let cols = rows[i].querySelectorAll("td,th");
      let csvRow = [];
      let xlsxRow = [];
      for (let j = 0; j < cols.length; j++) {
        csvRow.push(cols[j].innerText);
        xlsxRow.push(cols[j].innerText);
      }
      csvData.push(csvRow.join(","));
      xlsxData.push(xlsxRow);
    }
    csvData = csvData.join("\n");
    const csvFile = new Blob([csvData], {
      type: "text/csv",
    });
    let tempLink = document.createElement("a");
    tempLink.download = "tabela.csv";
    let url = window.URL.createObjectURL(csvFile);
    tempLink.href = url;
    tempLink.style.display = "none";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    const worksheet = XLSX.utils.json_to_sheet(xlsxData); // Download XLSX.
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tabela 1");
    XLSX.writeFile(workbook, "tabela.xlsx");
    setTimeout(() => setDownloadTableClicked(false), 2000);
  }

  useEffect(() => {
    setSortedObjectsTable(
      Object.keys(location.state.objectsTable)
        .map((val) => [
          val,
          (location.state.objectsTable[val].chosen /
            location.state.objectsTable[val].showed) *
            100,
        ])
        .sort((val1, val2) => val2[1] - val1[1])
        .map((val) => {
          return { [val[0]]: val[1] };
        })
    );
  }, [location.state.objectsTable]);

  function doAgain() {
    window.history.replaceState({}, "");
    if (document.getElementById("tab-el")) {
      document.getElementById("tab-el").classList.add("slide-out");
    }
    navigate("/idade", {
      replace: true,
    });
  }

  return (
    <div id="tab-el" className="slide-in">
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
              {sortedObjectsTable.map((obj, index) => (
                <tr className="table-body-row" key={Object.keys(obj)[0]}>
                  <td className="f1">{index + 1}</td>
                  <td className="f5">{Object.keys(obj)[0]}</td>
                  <td className="f3">
                    {obj[Object.keys(obj)[0]].toFixed(2)} %
                  </td>
                </tr>
              ))}
              <tr className="table-foot-row">
                <td className="copy-td">
                  {copyClipboardClicked ? (
                    <button className="tab-btn-clicked">
                      Copiado&nbsp;
                      <BsClipboardCheck size={24} color={"#FFFFFF"} />
                    </button>
                  ) : (
                    <button className="tab-btn" onClick={copyToClipboard}>
                      Copiar dados&nbsp;
                      <BsClipboard size={24} color={"#7ABA74"} />
                    </button>
                  )}
                </td>
                <td className="download-td">
                  {downloadTableClicked ? (
                    <button className="tab-btn-clicked">
                      Baixado&nbsp;
                      <BsDownload size={24} color={"#FFFFFF"} />
                    </button>
                  ) : (
                    <button className="tab-btn" onClick={downloadTable}>
                      Baixar tabela&nbsp;
                      <BsDownload size={24} color={"#7ABA74"} />
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
      <div className="btn-again-wrapper">
        <button className="tab-btn-again" onClick={doAgain}>
          Refazer teste
        </button>
      </div>
    </div>
  );
}
