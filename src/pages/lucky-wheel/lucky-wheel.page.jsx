import React, { Component } from "react";
import LuckyWheel from "../../components/lucky-wheel/lucky-wheel.component";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./lucky-wheel.styles.scss";
import Table from "../../components/table/table.component";

const client = new W3CWebSocket("ws://127.0.0.1:8000");
class LuckyWheelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name"),
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
      table: {
        rows: [
          {
            payment: "Payment #1",
            date: "March 20, 1989",
            amount: "$29.99",
            payee: "John Smith",
          },
          {
            payment: "Payment #2",
            date: "March 22, 1989",
            amount: "$40.00",
            payee: "Brandon Drew",
          },
          {
            payment: "Payment #3",
            date: "April 2, 1989",
            amount: "$9.50",
            payee: "Jackie Chan",
          },
        ],
        cols: {
          payment: "Ten",
          date: "Trang thai",
        },
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  addRow(data) {
    let oldData = this.state.table.rows;
    this.setState({
      table: {
        rows: oldData.push(data),
      },
    });
  }

  checkUserName() {
    return true;
  }

  componentWillMount() {
    let local_name = localStorage.getItem("name");

    if (!local_name) {
      let name = prompt("Vui long nhap ten cua ban", "Lam");
      let da = { payment: name, date: Math.random(9999) };
      this.addRow(da);
      localStorage.setItem("name", da);
    }

    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      this.setState({
        rotate: data.rote,
        username: data.username,
      });
    };
  }

  handleChange = () => {
    let rand = this.randomIndex(this.state.prizes);
    let chances = rand;

    let local_name = localStorage.getItem("name");

    let name = local_name;
    let da = { payment: name, date: Math.random(9999) };
    let oldData;
    if (!local_name) {
      name = prompt("Vui long nhap ten cua ban", "Lam");
      da = { payment: name, date: Math.random(9999) };
    }
    oldData = this.state.table.rows;
    this.setState({
      table: {
        rows: oldData.push(da),
      },
    });

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
            rote: this.state.rotate,
            username: localStorage.getItem("name"),
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
      <div>
        <h2>Danh sach nguoi tham gia</h2>
        <Table columns={this.state.table.cols} rows={this.state.table.rows} />
        <div className="luck-wheel-page">
          <LuckyWheel
            handleChange={this.handleChange}
            prizes={this.state.prizes}
            rotate={this.state.rotate}
          />
        </div>
      </div>
    );
  }
}

export default LuckyWheelPage;
