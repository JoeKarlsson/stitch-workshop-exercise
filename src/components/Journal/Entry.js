import React, { Component, Fragment } from "react";
import styled, { css } from "react-emotion";
import moment from "moment";
import {
  Card,
  Button,
  Form,
} from "semantic-ui-react";

import ShareSheet from "./Sharesheet";

const EntryCard = styled(Card)`
  margin: 10px 0;
  width: 700px;
`;

const LiteralText = styled(Card.Description)`
  white-space: pre-wrap;
`;

const styles = {
  title: css`
    line-height: 30px;
    padding: 10px 10px 0 10px;
    margin: 0 auto 0 0;
  `,
  byline: css`
    padding: 0 0 10px 10px;
  `
};


class Entry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      newBody: false
    };
  }

  renderEntryEditor = (updateEntry, cancelEdit) => (
    <Form>
      <Form.TextArea
        autoHeight
        name="newBody"
        onChange={(e, { name, value }) => this.setState({ [name]: value })}
        placeholder="What's on your mind?"
        rows={2}
        defaultValue={this.props.body}
      />

      <Form.Group>

        <Form.Button positive action="submit" onClick={() => updateEntry(this.props._id, this.state.newBody)}>
          Update
        </Form.Button>
        
        <Form.Button onClick={() => cancelEdit(this.props._id)}>
          Cancel
        </Form.Button>

      </Form.Group>
    </Form>
  );

  render() {
    const {
      _id,
      title,
      date,
      body,
      author,
      sharedWith,
      isEditable,
      currentUserIsAuthor,
      entryHandlers: { share, unshare, update, remove, edit, cancelEdit }
    } = this.props;

    return (
      <EntryCard>
        <Card.Header className={styles.title}>
          {title}
        </Card.Header>

        <Card.Meta className={styles.byline}>
          <span>{author} - {moment(date).format("dddd, MMMM Do, YYYY")}</span>
        </Card.Meta>

        <Card.Content>
          {isEditable ? (
            this.renderEntryEditor(update, cancelEdit)
          ) : (
            <LiteralText>{body}</LiteralText>
          )}
        </Card.Content>

        <Card.Content extra>
          {currentUserIsAuthor &&
            <Fragment>
              <ShareSheet id={_id} buttonTitle="Share" {...{ share, unshare, sharedWith }} />
              <Button onClick={() => edit(_id)}>Update</Button>
              <Button onClick={() => remove(_id)}>Remove</Button>
            </Fragment>
          }
        </Card.Content>
      </EntryCard>
    );
  }
}

export default Entry;
