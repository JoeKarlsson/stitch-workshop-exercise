// Styles
import "./index.css";
import "semantic-ui-css/semantic.min.css";
// React
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
// App Components
import Page from "./components/Page";
import Login from "./components/Login";
import Journal from "./components/Journal";
import config from "./config";

// MongoDB Stitch sdk here
import {
  Stitch,
  UserPasswordCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";

class StitchApp extends React.Component {
  static propTypes = {
    appId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.appId = props.appId;
    this.client = Stitch.initializeDefaultAppClient(this.appId);
    this.mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );

    const isAuthed = this.client.auth.isLoggedIn;
    this.state = { isAuthed };
  }

  login = async (email, password) => {
    const { isAuthed } = this.state;
    if (isAuthed) {
      return;
    }

    const credential = new UserPasswordCredential(email, password);
    await this.client.auth.loginWithCredential(credential);
    this.setState({ isAuthed: true });
  };

  logout = async () => {
    this.client.auth.logout();
    this.setState({ isAuthed: false });
  };

  render() {
    const { isAuthed } = this.state;
    const currentUser = isAuthed && this.client.auth.currentUser;

    return (
      <Page currentUser={currentUser} logoutCurrentUser={this.logout}>
        {isAuthed ? (
          <Journal mongodb={this.mongodb} currentUser={currentUser} />
        ) : (
          <Login loginUser={this.login} />
        )}
      </Page>
    );
  }
}

ReactDOM.render(
  <StitchApp appId={config.appId} />,
  document.getElementById("root")
);
