import React from "react";

export default function Icon(props) {
  return (
    <i
      className={`fa fa-solid fa-${props.name} ${
        props.className ? props.className : ""
      }`}
      role={props.role ? props.role : ""}
      onClick={props.onClick ? props.onClick : () => {}}
    ></i>
  );
}
