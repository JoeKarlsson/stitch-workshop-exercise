import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";

import {
  Button,
  Modal,
  List,
  Header,
  Form,
} from "semantic-ui-react";

const ShareWithInput = (props) => (
  <Form.Input
    fluid
    name="shareWithInput"
    action="Share"
    placeholder="someone@example.com"
    {...props}
  />
);

class ShareSheet extends Component {
  static propTypes = {
    id: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    share: PropTypes.func.isRequired,
    unshare: PropTypes.func.isRequired,
    sharedWith: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      shareWithInput: ""
    };
  }

  renderSharedWith = () => {
    const { id, sharedWith, unshare } = this.props;
    return(
      <List bulleted className={css`width: 300px;`}>
        {
        sharedWith.map(email => (
          <List.Item
            className={css`:hover { background-color: lightgray; }`}
            key={email}
            onClick={() => unshare(id, email)}
          >
            {email}
          </List.Item>
        ))
      }
      </List>
    );
  };

  render() {
    const {
      id,
      share,
      header,
    } = this.props;

    const trigger = <Button onClick={() => this.setState({ open: true })}>Share</Button>;
    const closeModal = () => this.setState({ open: false });

    return (
      <Modal
        trigger={trigger}
        onClose={closeModal}
        open={this.state.open}
      >
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
          <Header>Shared With:</Header>
          {this.renderSharedWith()}

          <Form onSubmit={() => {
            share(id, this.state.shareWithInput);
            this.setState({ shareWithInput: "" });
          }}
          >
            <ShareWithInput
              value={this.state.shareWithInput}
              onChange={(e, { name, value }) => this.setState({ [name]: value })}
            />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

ShareSheet.propTypes = {
  unshare: PropTypes.func.isRequired,
  id: PropTypes.object.isRequired,
};

export default ShareSheet;
