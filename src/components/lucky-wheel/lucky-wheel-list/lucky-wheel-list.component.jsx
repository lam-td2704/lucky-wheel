import React from "react";
import { LuckyWheelItem } from "../lucky-wheel-item/lucky-wheel-item.component";
import CanvasLuckyContainer from "./canvas.component";

export const LuckyWheelList = (props) => {
  const num = props.items.length;
  let turnNum = 1 / num;

  const randomColor = () =>
    "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

  const draw = (ctx) => {
    let num = props.items.length;
    let rotateDeg = 360 / num / 2 + 90;

    for (let i = 0; i < num; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(250, 250); // Center Point
      ctx.moveTo(0, 0);
      ctx.rotate((((360 / num) * i - rotateDeg) * Math.PI) / 180);
      ctx.arc(0, 0, 250, 0, (2 * Math.PI) / num, false); // Radius
      ctx.fillStyle = randomColor();
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#e4370e";
      ctx.stroke();
      ctx.restore();
    }
  };

  return (
    <>
      <CanvasLuckyContainer
        height="500"
        width="500"
        draw={draw}
        style={{ opacity: 0.6 }}
      />
      <ul className="hc-luckywheel-list">
        {props.items.map((item) => {
          return (
            <LuckyWheelItem
              key={item.id}
              item={item}
              rotate={(item.id - 1) * turnNum}
            />
          );
        })}
      </ul>
    </>
  );
};
