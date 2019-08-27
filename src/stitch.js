import React from "react";
import PropTypes from "prop-types";
import { StitchClientFactory } from "mongodb-stitch";

class StitchApp extends React.Component {
  static propTypes = {
    appId: PropTypes.string.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.appId = props.appId;
    this.state = {
      stitchClient: "",
      isAuthenticated: false,
      currentUser: "",
    };
  }

  componentDidMount = async () => {
    // Create a Stitch client object
    const stitchClient = await StitchClientFactory.create(this.appId);
    // Check if someone is already logged in
    const isAuthenticated = stitchClient.isAuthenticated();
    // If someone is logged in, get their user profile
    const currentUser = isAuthenticated
      ? await stitchClient.userProfile()
      : "";
    
    this.setState({ stitchClient, isAuthenticated, currentUser });
  };

  componentDidCatch = (error, info) => {
    this.setState({ hasError: { error, info } });
  };

  authenticateUser = async (username, password) => {
    const { stitchClient, isAuthenticated } = this.state;
    if(isAuthenticated) { return; }
    
    await stitchClient.authenticate(
      "userpass",
      { username, password }
    );
    const currentUser = await stitchClient.userProfile();

    this.setState({ currentUser, isAuthenticated: true });
  };

  logoutCurrentUser = async () => {
    const { stitchClient } = this.state;
    
    await stitchClient.logout();
    
    this.setState({ currentUser: "", isAuthenticated: false });
  };

  render() {
    const { stitchClient } = this.state;
    const clientIsLoading = !stitchClient;

    const stitch = {
      ...this.state,
      authenticateUser: this.authenticateUser,
      logoutCurrentUser: this.logoutCurrentUser
    };

    return clientIsLoading
      ? <div>loading...</div>
      : this.props.render(stitch);
  }
}
