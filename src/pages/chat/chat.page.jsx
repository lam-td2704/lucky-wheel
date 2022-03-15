import React, { Component } from "react";
import DirectMessaging from "../../components/direct-messaging/direct-messaging.component";

import socket from "../../socket";

import "./chat.styles.css";

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameAlreadySelected: false,
      username: "",
      users: [],
      selectedUser: null,
      userID: null,
    };
  }

  componentDidMount() {
    let sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      this.setState({ usernameAlreadySelected: true, sessionID: sessionID });
      socket.auth = { sessionID: sessionID, username: this.state.username };
      socket.connect();
    }

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      this.setState({ userID: userID });
      // save the ID of the user
      socket.userID = userID;
    });

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.setState({ usernameAlreadySelected: false });
      }
    });
  }

  componentWillUnmount() {
    socket.off("connect_error");
  }

  componentDidUpdate() {}

  initReactiveProperties = (user) => {
    user.hasNewMessages = false;
  };

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ usernameAlreadySelected: true });
    const username = this.state.username;
    socket.auth = { username };
    socket.connect();
  };

  handleChange = (event) => {
    event.preventDefault();
    const username = event.target.value;
    this.setState({ username: username });
  };

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Winner list</h2>
        {this.state.usernameAlreadySelected ? (
          <DirectMessaging userID={this.state.userID}/>
        ) : (
          <form>
            <input type="text" onChange={this.handleChange} />
            <button onClick={this.handleClick}>Confirm</button>
          </form>
        )}
      </div>
    );
  }
}

export default ChatPage;
