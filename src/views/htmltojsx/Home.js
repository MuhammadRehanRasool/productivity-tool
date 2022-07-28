import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
const HTMLtoJSX = require("./../../htmltojsx/htmltojsx.js");

export default function HTMLtoJSXHome() {
  let navigate = useNavigate();
  const convert = (input) => {
    let converter = new HTMLtoJSX({
      createClass: false,
      outputClassName: "",
    });
    let output = converter.convert(input);
    setJSX(output);
  };
  const [html, setHTML] = useState("");
  const [jsx, setJSX] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div className="configure-the-page f_">
      <span className="display-5">
        <Icon
          name="house-user"
          className="me-4"
          role="button"
          onClick={() => {
            navigate("/");
          }}
        />
        HTML to JSX Converter
      </span>
      <div className="my-4"></div>
      <div className="input-area f_ row">
        <div className="box col col-lg-6 col-md-6 col-sm-12">
          <label htmlFor="html" className="form-label">
            HTML (Input)
          </label>
          <textarea
            className="form-control"
            id="html"
            rows={20}
            value={html}
            onChange={(e) => {
              setHTML(e.target.value);
              if (isCopied) {
                setIsCopied(false);
              }
              convert(e.target.value);
            }}
          />
        </div>
        <div className="box col col-lg-6 col-md-6 col-sm-12">
          <label htmlFor="jsx" className="form-label">
            JSX (Output){" "}
            {isCopied ? <span className="text-success">Copied!</span> : ""}
          </label>
          <CopyToClipboard text={jsx} onCopy={() => setIsCopied(true)}>
            <textarea
              className="form-control"
              role="button"
              id="jsx"
              rows={20}
              value={jsx}
              onChange={(e) => {}}
            />
          </CopyToClipboard>
        </div>
      </div>
      <div className="row w-100 mt-5">
        {jsx !== "" ? (
          <LiveProvider code={jsx}>
            <CopyToClipboard text={jsx} onCopy={() => setIsCopied(true)}>
              <LiveEditor />
            </CopyToClipboard>
            <LiveError />
            <LivePreview />
          </LiveProvider>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
