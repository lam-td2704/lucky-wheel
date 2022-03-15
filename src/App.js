import React from "react";

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.page";
import SignInPage from "./pages/sign-in/sign-in.page";
import SignUpPage from "./pages/sign-up/sign-up.page";
import ShopPage from "./pages/shop/shop.component";
import LuckyWheelPage from "./pages/lucky-wheel/lucky-wheel.page";
import ChatPage from "./pages/chat/chat.page";


import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";


class App extends React.Component {
  unsubcribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route index path="/" element={<ChatPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/lucky-wheel" element={<LuckyWheelPage />} />
          <Route
            extract
            path="/signup"
            render={() =>
              this.props.currentUser ? <Navigate to="/" /> : <SignInPage />
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
