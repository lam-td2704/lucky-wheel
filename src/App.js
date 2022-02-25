import React from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage/homepage.page";
import Header from "./components/header/header.component";
import SignInPage from "./pages/sign-in/sign-in.page.jsx";

import { auth } from "./components/firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: "",
    };
  }

  unsubcribeFromAuth = null;

  componentDidMount() {
    this.unsubcribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route index path="/" element={<Homepage />} />
          <Route path="/login" element={<SignInPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
