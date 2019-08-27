import React, { Fragment } from "react";
import styled, { css } from "react-emotion";
import { Menu } from "semantic-ui-react";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 10px;

  display: flex;
  flex-direction: column;
`;

const Page = props => {
  const { logoutCurrentUser, currentUser } = props;

  return (
    <PageContainer>
      <Menu inverted>
        <Menu.Item header>Daily Journal</Menu.Item>
        {currentUser && (
          <Fragment>
            <Menu.Item>Logged in as: {currentUser.profile.data.email}</Menu.Item>
            <Menu.Item
              name="logout"
              onClick={logoutCurrentUser}
              className={css`
                margin-left: auto;
              `}
            />
          </Fragment>
        )}
      </Menu>

      {props.children}
    </PageContainer>
  );
};

export default Page;
