import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";

import {
  Button,
  Modal,
  Form,
} from "semantic-ui-react";

const ComposerTrigger = ({clickHandler}) => (
  <div className={css`margin-bottom: 20px;`}>
    <Button primary onClick={clickHandler}>
      Add Entry
    </Button>
  </div>
);

export default class EntryComposer extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: "",
      content: "",
    };
  }
  
  showModal = () => this.setState({ open: true });
  closeModal = () => this.setState({ open: false });
  handleInput = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <Modal
        trigger={<ComposerTrigger clickHandler={this.showModal} />}
        onClose={this.closeModal}
        open={this.state.open}
      >
        <Modal.Header>Write a New Journal Entry</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={() => {
              this.props.submitHandler(this.state.title, this.state.content);
              this.closeModal();
            }}
          >
            <Form.Input
              name="title"
              placeholder="Entry Title..."
              onChange={this.handleInput}
            />
            <Form.TextArea
              name="content"
              placeholder="What's on your mind..."
              onChange={this.handleInput}
            />
            <Form.Group>
              <Form.Button positive action="submit">
                Submit
              </Form.Button>
              <Form.Button onClick={this.closeModal}>
                Cancel
              </Form.Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
