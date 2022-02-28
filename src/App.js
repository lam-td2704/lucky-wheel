import React from "react";

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.page";
import SignInPage from "./pages/sign-in/sign-in.page.jsx";
import SignUpPage from "./pages/sign-up/sign-up.page.jsx";

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
          <Route index path="/" element={<Homepage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route
            extract
            path="/signup"
            render={() =>
              this.props.currentUser ? <Navigate to="/" /> : <SignInPage />
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<Homepage />} />
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
