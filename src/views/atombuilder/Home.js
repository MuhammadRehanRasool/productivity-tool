import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";

export default function Home(props) {
  let navigate = useNavigate();
  const MAIN = "/atombuilder/";
  const options = [
    {
      display: "Button",
      path: "button",
    },
  ];
  const [search, setSearch] = useState("");

  return (
    <div className="configure-the-page f_ atom-builder">
      <span className="display-5">
        <Icon
          name="atom"
          className="me-4"
          role="button"
          onClick={() => {
            navigate("/");
          }}
        />
        Atom Builder
      </span>
      <div className="my-4"></div>
      <div className="row w-100">
        <div className="col-lg-3 col-md-4 col-sm-12">
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
                return option.display
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((option, index) => {
                return (
                  <div
                    className={`col-12 my-2`}
                    onClick={() => {
                      navigate(MAIN + option.path);
                    }}
                  >
                    <div
                      className={`option-tab small f_ ${
                        props.path === option.path ? "active" : ""
                      }`}
                    >
                      <span className="m-0 h5">{option.display}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-lg-9 col-md-8 col-sm-12">
          <div className="content">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
