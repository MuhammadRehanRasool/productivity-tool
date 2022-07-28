/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import {
  parseProperties,
  createPropertyOptions,
  transfromToCSS,
  giveComponent,
} from "./CreateOptions";
import Icon from "./../components/Icon";
import { jsx, css } from "@emotion/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "@emotion/styled";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

export default function Button() {
  // const { css } = useFela();
  const _default = {
    outline: ["none", "", "_ign", ""],
    backgroundColor: [
      ["transparent", "black", "black"],
      "white,black",
      "",
      "Color",
      true,
      true,
    ],
    color: [["black", "white", "white"], "white", "", "Color", true, true],
    padding: [".5rem 2rem", "", "_ndl", "Size"],
    border: [
      [
        "1px solid rgba(0,0,0,.1)",
        "1px solid rgba(255,255,255,.1)",
        "1px solid rgba(255,255,255,.1)",
      ],
      "",
      "_ndl",
      "Size",
      true,
      true,
    ],
    borderRadius: ["10px", "", "_ndl", "Size"],
    width: [
      "",
      "100%,inherit,fit-content,-webkit-fill-available,initial,revert",
      "",
      "Size",
    ],
    boxShadow: [
      "2px 2px 15px #0000004f",
      "0px 5px 30px rgb(65 84 241 / 40%)",
      "_ndl",
      "Color",
      true,
      true,
    ],
    fontSize: ["1em", "", "_ndl", "Text"],
    fontWeight: [
      "",
      "200,300,400,500,600,700,800,900,bold,light,bolder",
      "",
      "Text",
    ],
    textTransform: ["capitalize", "lowercase,uppercase", "", "Text"],
    backdropFilter: ["", "blur(30px)", "", "Color", true, true],
  };
  const _values = {
    value: "Log In",
    bgContainer: "white",
    presetName: "CustomButton",
  };
  // ------------------------------
  // property : [value, options, mode, category, isHover, isFocus]
  // ------------------------------
  const [toggle, setToggle] = useState({
    isNormal: true,
    isHover: false,
    isFocus: false,
  });
  const [setting, setSetting] = useState([]);
  const [values, setValues] = useState(_values);
  const [hover, setHover] = useState({});
  const [focus, setFocus] = useState({});

  const changeValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const changeHover = (e) => {
    setHover({
      ...hover,
      [e.target.name]: e.target.value,
    });
  };
  const changeFocus = (e) => {
    setFocus({
      ...focus,
      [e.target.name]: e.target.value,
    });
  };
  const changeToggle = (target) => {
    setToggle({
      ...toggle,
      [target]: !toggle[target],
    });
  };
  useEffect(() => {
    let temp = parseProperties(_default);
    setValues({
      ...values,
      ...temp[0],
    });
    setSetting(temp[1]);
    setHover(temp[2]);
    setFocus(temp[3]);
  }, []);
  return (
    <div className="atomic-showcase row w-100">
      <div className={`showDemo f_ bg-${values.bgContainer}`} id="show">
        <button
          css={css`
            ${transfromToCSS(
              [values, hover, focus],
              toggle,
              Object.keys(_values)
            )}
          `}
        >
          {values.value}
        </button>
        <div className="dummy">
          <span className="handle">
            <Icon
              name="thumbs-up"
              className={`mx-2 text-${toggle.isNormal ? "success" : "dark"}`}
              onClick={() => {
                changeToggle("isNormal");
              }}
              role="button"
            />
            <Icon
              name="hand-pointer-o"
              className={`mx-2 text-${toggle.isHover ? "success" : "dark"}`}
              onClick={() => {
                changeToggle("isHover");
              }}
              role="button"
            />
            <Icon
              name="hand-paper-o"
              className={`mx-2 text-${toggle.isFocus ? "success" : "dark"}`}
              onClick={() => {
                changeToggle("isFocus");
              }}
              role="button"
            />
          </span>
        </div>
      </div>
      <div className="mt-3"></div>
      <div className="options row">
        <span className={`w-100 text-muted`}>General</span>
        <div
          className={`col-auto atomic-property mx-1 my-1 f_ ${
            values.bgContainer !== "" ? "set" : ""
          }`}
        >
          <span className="text-muted">bgContainer</span>
          <div className="take-input">
            <select
              name={"bgContainer"}
              id={"bgContainer"}
              className={`form-select`}
              value={values.bgContainer}
              onChange={changeValues}
            >
              {["light", "dark"].map((option, j) => {
                return (
                  <option value={option} key={j}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div
          className={`col-auto atomic-property mx-1 my-1 f_ ${
            values.presetName !== "" ? "set" : ""
          }`}
        >
          <span className="text-muted">presetName</span>
          <div className="take-input">
            <input
              name={"presetName"}
              id={"presetName"}
              className={`form-control`}
              value={values.presetName}
              onChange={changeValues}
            />
          </div>
        </div>
        <div
          className={`col-auto atomic-property mx-1 my-1 f_ ${
            values.value !== "" ? "set" : ""
          }`}
        >
          <span className="text-muted">value</span>
          <div className="take-input">
            <input
              name={"value"}
              id={"value"}
              className={`form-control`}
              value={values.value}
              onChange={changeValues}
            />
          </div>
        </div>
        <div className="my-2"></div>
        <div className="accordion type-system m-0 p-0" id="type_">
          <div className="accordion-item">
            <h2 className="accordion-header" id="type_normal">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#type_normal_c"
                aria-expanded="false"
                aria-controls="type_normal_c"
              >
                Normal
              </button>
            </h2>
            <div
              id="type_normal_c"
              className="accordion-collapse collapse"
              aria-labelledby="type_normal"
            >
              <div className="accordion-body">
                <div className="state row w-100 my-0 py-0 px-2">
                  {setting.length > 0
                    ? createPropertyOptions(setting, values, changeValues)
                    : null}

                  <div
                    className={`col-auto atomic-property mx-1 my-1 f_ ${
                      values.value !== "" ? "set" : ""
                    }`}
                  >
                    <span className="text-muted">value</span>
                    <div className="take-input">
                      <input
                        name={"value"}
                        className={`form-control`}
                        value={values.value}
                        onChange={changeValues}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="type_hover">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#type_hover_c"
                aria-expanded="false"
                aria-controls="type_hover_c"
              >
                Hover
              </button>
            </h2>
            <div
              id="type_hover_c"
              className="accordion-collapse collapse"
              aria-labelledby="type_hover"
            >
              <div className="accordion-body">
                <div className="state row w-100 my-0 py-0 px-2">
                  {setting.length > 0
                    ? createPropertyOptions(
                        setting,
                        hover,
                        changeHover,
                        "hover"
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="type_focus">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#type_focus_c"
                aria-expanded="false"
                aria-controls="type_focus_c"
              >
                Focus
              </button>
            </h2>
            <div
              id="type_focus_c"
              className="accordion-collapse collapse"
              aria-labelledby="type_focus"
            >
              <div className="accordion-body">
                <div className="state row w-100 my-0 py-0 px-2">
                  {setting.length > 0
                    ? createPropertyOptions(
                        setting,
                        focus,
                        changeFocus,
                        "focus"
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2"></div>
        <div className="accordion type-system m-0 p-0" id="code_">
          <div className="accordion-item">
            <h2 className="accordion-header" id="code_normal">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#code_normal_c"
                aria-expanded="false"
                aria-controls="code_normal_c"
              >
                {values.presetName}.js
              </button>
            </h2>
            <div
              id="code_normal_c"
              className="accordion-collapse collapse"
              aria-labelledby="code_normal"
            >
              <div className="accordion-body">
                <div className="state row w-100 my-0 py-0 px-2">
                  <Highlight
                    {...defaultProps}
                    theme={theme}
                    code={`${giveComponent(
                      "button",
                      values.value,
                      values.presetName
                    )}`}
                    language="jsx"
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre className={className} style={style}>
                        {tokens.map((line, i) => (
                          <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                              <span {...getTokenProps({ token, key })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="code_hover">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#code_hover_c"
                aria-expanded="false"
                aria-controls="code_hover_c"
              >
                {values.presetName}.scss
              </button>
            </h2>
            <div
              id="code_hover_c"
              className="accordion-collapse collapse"
              aria-labelledby="code_hover"
            >
              <div className="accordion-body">
                <div className="state row w-100 my-0 py-0 px-2">
                  <Highlight
                    {...defaultProps}
                    theme={theme}
                    code={`${transfromToCSS(
                      [values, hover, focus],
                      toggle,
                      Object.keys(_values),
                      "scss"
                    )}`}
                    language="scss"
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre className={className} style={style}>
                        {tokens.map((line, i) => (
                          <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                              <span {...getTokenProps({ token, key })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2"></div>
      </div>
    </div>
  );
}
