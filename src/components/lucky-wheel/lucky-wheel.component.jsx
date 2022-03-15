import React, { Component } from "react";
import CanvasLuckyContainer from "./lucky-wheel-list/canvas.component";
import { LuckyWheelList } from "./lucky-wheel-list/lucky-wheel-list.component";

import "./lucky-wheel.styles.css";

class LuckyWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPercentage: true,
      prizes: props.prizes,
      btnDisabled: "disabled",
      opts: {
        id: "luckywheel",
        mode: "both",
      },
    };
  }

  showItem = () => {
    const { prizeId } = this.props.prizeLucky;
    console.log(this.props.prizes[prizeId].text);
  };

  render() {
    const { prizes } = this.state;
    const filterPrizes = prizes;
    return (
      <section id="luckywheel" className="hc-luckywheel">
        <div
          className="hc-luckywheel-container"
          style={this.props.rotate}
          onTransitionEnd={this.showItem}
        >
          <LuckyWheelList items={filterPrizes} />
        </div>
        <button
          className="hc-luckywheel-btn"
          onClick={this.props.handleChange}
        ></button>
      </section>
    );
  }
}
export default LuckyWheel;
