import React from "react";
import SignIn from "../../components/sign-in/sign-in.component";

import "./sign-in.styles.scss";

class SignInPage extends React.Component {
  render() {
    return (
      <div className="container">
        <SignIn />
      </div>
    );
  }
}

export default SignInPage;
