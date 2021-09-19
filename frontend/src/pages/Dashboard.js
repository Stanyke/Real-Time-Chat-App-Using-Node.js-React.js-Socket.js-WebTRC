import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from "react-router-dom";
import WaitForPageLoad from "../components/WaitForPageLoad";
import Header from "../components/Header";
import ChatLists from "../components/chats/chatLists";
import ActiveChat from "../components/chats/activeChat";
import EmptyChatDashboard from "../components/chats/activeChat/EmptyChatDashboard";

import { DashboardStyle } from "../assets/css/DashboardStyle";
import AuthSidebar from "../components/AuthSidebar";
import { SocketContext } from "../statesManager";
import ToastBar from "../components/ToastBar";

const useStyles = makeStyles((theme) => DashboardStyle(theme));

export default function Dashboard() {
  const { user, showToast, authToken, pageLoaded, chats, chatsFilter, activeChat } = useContext(SocketContext);
  const classes = useStyles();
  const history = useHistory();
  const [hasToken, setHasToken] = useState(true);

  const checkUserLoginState = (authToken) => {
    if (!authToken || !hasToken) {
      return history.push(process.env.REACT_APP_BEFORE_LOGIN_REDIRECT_URL);
    }
  };

  useEffect(() => {
    checkUserLoginState(authToken);
  }, [hasToken]);

  if (!pageLoaded) {
    return <WaitForPageLoad />;
  } else {
    return (
      <>
        <Header user={user} setHasToken={setHasToken} />
        <Box className={classes.root}>
          <Box className={`${classes.box} ${classes.leftSide}`}>
            <ChatLists chats={chats} chatsFilter={chatsFilter} styles={classes}/>
          </Box>
          <Box className={`${classes.box} ${classes.rightSider}`}>
            <Paper className={classes.rightPaper}>
                <ActiveChat chats={chats} user={user} />
                <EmptyChatDashboard user={user} activeChat={activeChat} />
            </Paper>
          </Box>
        </Box>
      </>
    );
  }
}
