import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import {
  Segment,
  Form,
  Header,
  Message,
//  Button,
} from "semantic-ui-react";

const LoginContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 50px auto 1fr;
  grid-template-columns: 1fr 500px 1fr;
`;

const LoginForm = styled(Segment)`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

export default class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      userInput: {
        username: "",
        password: ""
      },
      errorMessage: ""
    };
  }

  handleChange = (e, { name, value }) => {
    return this.setState(prevState => ({
      userInput: { ...prevState.userInput, [name]: value }
    }));
  };

  render = () => {
    const {
      errorMessage,
      userInput: { username, password },
    } = this.state;

    const { loginUser } = this.props;

    return (
      <LoginContainer>
        <LoginForm>
          <Form onSubmit={() => { loginUser(username, password); }}>
            <Header as="h1">Log In</Header>
            <Form.Input
              fluid
              label="Username"
              name="username"
              placeholder="someone@example.com"
              defaultValue={username}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Password"
              name="password"
              type="password"
              placeholder="SuperSecretPassword"
              defaultValue={password}
              onChange={this.handleChange}
            />
            {
              errorMessage && <Message
                negative
                header='Login Failed'
                content={errorMessage}
              />
            }
            <Form.Button type="submit">
              Submit
            </Form.Button>
          </Form>
        </LoginForm>
      </LoginContainer>
    );
  };

}
