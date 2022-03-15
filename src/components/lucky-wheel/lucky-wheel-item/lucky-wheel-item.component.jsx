import React from "react";

import "./lucky-wheel-item.styles.scss";

export const LuckyWheelItem = (props) => (
  <li className="hc-luckywheel-item">
    <span style={{ transform: "rotate(" + props.rotate + "turn)" }}>
      <p className="curve">{props.item.text}</p>
      <img
        src={`https://robohash.org/${props.item.id}?set=set2&size=100x100`}
        alt=""
      />
    </span>
  </li>
);
