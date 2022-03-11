import React, { Component } from "react";
import "./direct-messaging.styles.scss";
import socket from "../../socket";
import LuckyWheel from "../../components/lucky-wheel/lucky-wheel.component";
class DirectMessaging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUser: null,
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
  }

  componentDidMount() {
    socket.on("connect", () => {
      this.setState({ currentUser: socket.userID });
    });

    socket.on("disconnect", () => {
      let users = this.state.users;
      users.forEach((user) => {
        if (user.self) {
          user.connected = false;
        }
      });
    });

    socket.on("users", (users) => {
      users.forEach((user) => {
        user.messages.forEach((message) => {
          message.fromSelf = message.from === socket.userID;
        });
      });

      const isCurrentUser = users.find(({ userID }) => {
        console.log(userID, this.state.sessionID);
        return userID === this.state.sessionID;
      });
      this.setState({ selectedUser: isCurrentUser });
      // put the current user first, and sort by username
      users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      this.setState({ users: users });
    });

    socket.on("user connected", (user) => {
      let users = this.state.users;
      users.push(user);
      if (users.find(({ userID }) => userID === user.userID) !== undefined) {
        this.setState({ users: users });
      }
    });

    socket.on("user disconnected", (id) => {
      let users = this.state.users;

      this.setState({
        users: users.map((user) => {
          return user.userID === id ? { ...user, connected: false } : user;
        }),
      });
    });
  }

  componentWillUnmount() {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("users");
    socket.off("user connected");
    socket.off("user disconnected");
    socket.off("private message");
  }

  handleChange = () => {

  }

  render() {
    const items = this.state.users.filter((item) => item.connected === true);
    const userID = this.props.userID;

    return (
      <div className="wrapper">
        <div className="container">
          <div className="flex flex-direction-column left">
            <div className="top">
              <input type="text" placeholder="Search" />
            </div>
            <ul className="people">
              {items.map((item, idx) => (
                <li key={item.userID} className="person" data-chat="person1">
                  <img
                    src={`https://robohash.org/${idx}?set=set2&size=100x100`}
                    alt=""
                  />
                  <span className="name">
                    <h3>
                      {item.username} {userID === item.userID ? "(You)" : ""}
                    </h3>
                  </span>
                  <span className="time">2:09 PM</span>
                  <span>{item.userID}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="right">
            <div className="top">
              <span>
                <span className="name">
                  Total joins:
                  {items.reduce(
                    (totalConnected, item) =>
                      item.connected ? totalConnected + 1 : totalConnected,
                    0
                  )}
                </span>
              </span>
            </div>

            <div>
              <LuckyWheel
                handleChange={this.handleChange}
                prizes={this.state.prizes}
                rotate={this.state.rotate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DirectMessaging;
