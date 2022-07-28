// ------------------------------
// {
//   "name":"",
//   "default":"",
//   "options":[],
//   "negate":"",
// }
// ------------------------------
export const parseProperties = (obj) => {
  obj = Object.entries(obj);
  let s_ = [];
  let v_ = {};
  let h_ = {};
  let f_ = {};
  obj.map((one, i) => {
    v_[one[0]] = typeof one[1][0] === "object" ? one[1][0][0] : one[1][0];
    if (one[1][4]) {
      h_[one[0]] = typeof one[1][0] === "object" ? one[1][0][1] : one[1][0];
    }
    if (one[1][5]) {
      f_[one[0]] = typeof one[1][0] === "object" ? one[1][0][2] : one[1][0];
    }
    s_.push({
      name: one[0],
      default: typeof one[1][0] === "object" ? one[1][0][0] : one[1][0],
      options: [
        typeof one[1][0] === "object" ? one[1][0][0] : one[1][0],
        ...one[1][1].split(","),
      ],
      negate: one[1][2] ?? "",
      category: one[1][3] ?? "",
      isHover: one[1][4] ?? false,
      isFocus: one[1][5] ?? false,
    });
  });
  return [v_, s_, h_, f_];
};

const catchKey = (e, changeValues) => {
  let nv_ = e.target.value;
  if (e.keyCode === 38) {
    nv_ = e.target.value.replace(/\d+/, function (n) {
      return ++n;
    });
  } else if (e.keyCode === 40) {
    nv_ = e.target.value.replace(/\d+/, function (n) {
      return --n;
    });
  } else if (e.keyCode === 37) {
    // left arrow
  } else if (e.keyCode === 39) {
    // right arrow
  }
  changeValues({
    target: {
      value: nv_,
      name: e.target.name,
    },
  });
};

export const createPropertyOptions = (
  setting,
  values,
  changeValues,
  mode = ""
) => {
  let categories = [
    ...new Set(
      setting.map((one, i) => {
        return one.category;
      })
    ),
  ];
  let counter = 0;
  return categories.map((category, one) => {
    if (category === "") return;
    counter++;
    return setting
      .filter((property, i) => {
        return (
          (property.category === category && mode === "") ||
          (property.category === category &&
            mode === "hover" &&
            property.isHover === true) ||
          (property.category === category &&
            mode === "focus" &&
            property.isFocus === true)
        );
      })
      .map((property, i) => {
        if (property.negate === "_ign") return;
        return (
          <>
            {i === 0 ? (
              <span className={`w-100 text-muted mt-3`}>{category}</span>
            ) : (
              ""
            )}
            <div
              className={`col-auto atomic-property mx-1 my-1 f_ ${
                values[property.name] !== "" ? "set" : ""
              }`}
              key={i}
            >
              <span className="text-muted">{property.name}</span>
              <div className="take-input">
                <input
                  list={property.name}
                  name={property.name}
                  className={`${
                    property.negate === "_ndl" ? "form-control" : "form-select"
                  }`}
                  value={values[property.name]}
                  onChange={changeValues}
                  onKeyDownCapture={(e) => {
                    catchKey(e, changeValues);
                  }}
                />
                {property.negate === "_ndl" ? null : (
                  <datalist id={property.name}>
                    {property.options.map((option, j) => {
                      return (
                        <option value={option} key={j}>
                          {option}
                        </option>
                      );
                    })}
                  </datalist>
                )}
              </div>
            </div>
          </>
        );
      });
  });
};

const toSentenceCase = (camelCase) => {
  if (camelCase) {
    let dashed = camelCase.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    return dashed;
  }
  return "";
};

export const transfromToCSS = (all, toggle, _values, mode = "") => {
  let normal = all[0];
  let hover = all[1];
  let focus = all[2];
  let scss = ``;
  let indent = "\t";
  let transition = "500";
  if (mode === "scss") {
    scss += `.${normal.presetName} {\n`;
  }
  if (toggle.isNormal) {
    scss += `${indent}transition: ${transition}ms;\n`;
    for (const key in normal) {
      if (!_values.includes(key)) {
        if (normal[key] !== "") {
          scss += `${indent}${toSentenceCase(key)}: ${normal[key]};\n`;
        }
      }
    }
  }
  if (toggle.isHover) {
    scss += `\n${indent}&:hover {\n`;
    scss += `${indent}${indent}transition: ${transition}ms;\n`;
    for (const key in hover) {
      if (hover[key] !== "") {
        scss += `${indent}${indent}${toSentenceCase(key)}: ${hover[key]};\n`;
      }
    }
    scss += `\n${indent}}\n`;
  }
  if (toggle.isFocus) {
    scss += `\n${indent}&:focus {\n`;
    scss += `${indent}${indent}transition: ${transition}ms;\n`;
    for (const key in focus) {
      if (focus[key] !== "") {
        scss += `${indent}${indent}${toSentenceCase(key)}: ${focus[key]};\n`;
      }
    }
    scss += `\n${indent}}\n`;
  }
  if (mode === "scss") {
    scss += `}`;
  }
  return scss.trim();
};

export const giveComponent = (tagName, value, presetName) => {
  let jsx = `import React from "react";
  
export default function ${presetName}({className, ...rest}) {
  return (
    <${tagName} className={\`${presetName} \${className ?? ""}\`} {...rest}>
      ${value}
    </${tagName}>
  );
}
`;
  return jsx;
};
