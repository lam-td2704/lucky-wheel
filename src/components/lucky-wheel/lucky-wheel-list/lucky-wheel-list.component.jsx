import React from "react";
import { LuckyWheelItem } from "../lucky-wheel-item/lucky-wheel-item.component";
import Canvas from "../../canvas/canvas.component";

export const LuckyWheelList = (props) => {
  const num = props.items.length;
  let turnNum = 1 / num;

  const draw = (ctx, frameCount) => {
    let num = props.items.length;
    let rotateDeg = 360 / num / 2 + 90;
    for (let i = 0; i < num; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(250, 250); // Center Point
      ctx.moveTo(0, 0);
      ctx.rotate((((360 / num) * i - rotateDeg) * Math.PI) / 180);
      ctx.arc(0, 0, 250, 0, (2 * Math.PI) / num, false); // Radius
      if (i % 2 == 0) {
        ctx.fillStyle = "#ffb820";
      } else {
        ctx.fillStyle = "#ffcb3f";
      }
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#e4370e";
      ctx.stroke();
      ctx.restore();
    }
  };

  return (
    <>
      <Canvas height={500} width={500} draw={draw} />
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
