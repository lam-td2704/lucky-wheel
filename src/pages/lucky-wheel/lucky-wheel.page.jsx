import React, { Component } from "react";
import LuckyWheel from "../../components/lucky-wheel/lucky-wheel.component";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./lucky-wheel.styles.scss";
const client = new W3CWebSocket("ws://127.0.0.1:8000");
class LuckyWheelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsers: [],
      userActivity: [],
      username: null,
      text: "",
      deg: 0,
      isPercentage: true,
      optsPrize: {},
      prizes: [
        {
          id: 1,
          text: "Lam",
          img: "images/Ao.png",
          number: 1, // 1%,
          percentpage: 0.1, // 1%
        },
        {
          id: 2,
          text: "Truong",
          img: "images/Non.png",
          number: 1,
          percentpage: 0.1, // 5%
        },
        {
          id: 3,
          text: "Tan",
          img: "images/Vong.png",
          number: 1,
          percentpage: 0.1, // 10%
        },
        {
          id: 4,
          text: "Nghien",
          img: "images/j2_logo.png",
          number: 1,
          percentpage: 0.2, // 24%
        },
        {
          id: 5,
          text: "Hieu",
          img: "images/miss.png",
          percentpage: 0.4, // 60%
        },
        {
          id: 6,
          text: "Dat",
          img: "images/miss.png",
          number: 2,
          percentpage: 0.05, // 60%
        },
        {
          id: 7,
          text: "Huy",
          img: "images/j2_logo.png",
          number: 2,
          percentpage: 0.05, // 60%
        },
        {
          id: 8,
          text: "Thien",
          img: "images/j2_logo.png",
          number: 2,
          percentpage: 0.05, // 60%
        },
        {
          id: 9,
          text: "Truong nho",
          img: "images/j2_logo.png",
          number: 2,
          percentpage: 0.05, // 60%
        },
        {
          id: 10,
          text: "Diem",
          img: "images/j2_logo.png",
          number: 2,
          percentpage: 0.05, // 60%
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    console.log(localStorage.getItem("name"))

      client.onopen = () => {
        console.log("WebSocket Client Connected");
      };
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      this.setState({
        rotate: data.username,
      });
    };
  }

  handleChange = () => {
    let rand = this.randomIndex(this.state.prizes);
    console.log(rand);
    let chances = rand;
    this.setState(
      {
        rotate: {
          transform: "rotate(" + this.fnGetPrize([rand, chances]) + "deg)",
        },
      },
      function () {
        client.send(
          JSON.stringify({
            type: "aaaaa",
            username: this.state.rotate,
          })
        );
      }
    );
  };

  randomIndex = (prizes) => {
    if (this.state.isPercentage) {
      let counter = 1;
      for (let i = 0; i < prizes.length; i++) {
        if (prizes[i].number === 0) {
          counter++;
        }
      }
      if (counter === prizes.length) {
        return null;
      }
      let rand = Math.random();
      let prizeIndex = null;
      // eslint-disable-next-line default-case
      switch (true) {
        case rand < prizes[4].percentpage:
          prizeIndex = 4;
          break;
        case rand < prizes[4].percentpage + prizes[3].percentpage:
          prizeIndex = 3;
          break;
        case rand <
          prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage:
          prizeIndex = 2;
          break;
        case rand <
          prizes[4].percentpage +
            prizes[3].percentpage +
            prizes[2].percentpage +
            prizes[1].percentpage:
          prizeIndex = 1;
          break;
        case rand <
          prizes[4].percentpage +
            prizes[3].percentpage +
            prizes[2].percentpage +
            prizes[1].percentpage +
            prizes[0].percentpage:
          prizeIndex = 0;
          break;
      }
      if (prizes[prizeIndex].number != 0) {
        prizes[prizeIndex].number = prizes[prizeIndex].number - 1;
        return prizeIndex;
      } else {
        return this.randomIndex(prizes);
      }
    } else {
      let counter = 0;
      for (let i = 0; i < prizes.length; i++) {
        if (prizes[i].number === 0) {
          counter++;
        }
      }
      if (counter == prizes.length) {
        return null;
      }
      var rand = (Math.random() * prizes.length) >>> 0;
      if (prizes[rand].number != 0) {
        prizes[rand].number = prizes[rand].number - 1;
        return rand;
      } else {
        return this.randomIndex(prizes);
      }
    }
  };

  fnGetPrize = (data) => {
    if (data[0] == null && !data[1] == null) {
      return;
    }

    this.setState({
      optsPrize: {
        prizeId: data[0],
        chances: data[1],
      },
    });

    let oldDeg = this.state.deg || 0;
    let newDeg =
      oldDeg +
      (360 - (oldDeg % 360)) +
      (360 * 10 - data[0] * (360 / this.state.prizes.length));

    this.setState({
      deg: newDeg,
    });
    return newDeg;
  };

  render() {
    return (
      <div className="luck-wheel-page">
        <LuckyWheel
          handleChange={this.handleChange}
          prizes={this.state.prizes}
          rotate={this.state.rotate}
        />
      </div>
    );
  }
}

export default LuckyWheelPage;
