import React from "react";

export const LuckyWheelItem = (props) => (
  <li className="hc-luckywheel-item">
    {" "}
    <span style={{ transform: "rotate(" + props.rotate + "turn)" }}>
      <p id="curve">{props.item.text}</p>
      <img
        src={`https://robohash.org/${props.item.id}?set=set2&size=100x100`}
        alt=""
      />
    </span>{" "}
  </li>
);
