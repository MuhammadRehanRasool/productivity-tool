import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";

export default function Home() {
  let navigate = useNavigate();
  const options = [
    {
      display: "HTML to JSX",
      path: "/htmltojsx",
      icon: "code",
      tags: "htmljsxconversioncodereactconverter",
    },
    {
      display: "React Builder",
      path: "/react",
      icon: "laptop-code",
      tags: "frontendreactjavascriptbuilder",
    },
    {
      display: "Atom Builder",
      path: "/atombuilder",
      icon: "atom",
      tags: "frontendreactjavascriptdesigningatomcomponentscssdevelopcodeintegratecustomatombuilder",
    },
  ];
  const [search, setSearch] = useState("");

  return (
    <div className="configure-the-page f_">
      <span className="display-5">
        <Icon name="tools" className="me-4" />
        Rehan's Tools
      </span>
      <div className="my-4"></div>
      <input
        type="text"
        className="form-control"
        placeholder="Searh here..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="my-2"></div>
      <div className="row option-wrapper w-100">
        {options
          .filter((option, index) => {
            return option.tags.toLowerCase().includes(search.toLowerCase());
          })
          .map((option, index) => {
            return (
              <div
                className="col-lg-3 col-md-4 col-sm-12 my-2"
                onClick={() => {
                  navigate(option.path);
                }}
              >
                <div className="option-tab f_">
                  <span className="m-0 h5">{option.display}</span>{" "}
                  <Icon name={option.icon} className="my-2 fs-3" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
