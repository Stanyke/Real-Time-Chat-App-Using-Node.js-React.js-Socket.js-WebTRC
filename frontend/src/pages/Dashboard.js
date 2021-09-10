import React, { useEffect, useContext } from "react";
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

import { DashboardStyle } from "../assets/css/DashboardStyle";
import AuthSidebar from "../components/AuthSidebar";
import { SocketContext } from "../statesManager";
import ToastBar from "../components/ToastBar";

const useStyles = makeStyles((theme) => DashboardStyle(theme));

export default function Dashboard() {
  const { user, showToast, authToken, pageLoaded } = useContext(SocketContext);
  const classes = useStyles();
  const history = useHistory();

  const checkUserLoginState = (authToken) => {
    if (!authToken) {
      return history.push(process.env.REACT_APP_BEFORE_LOGIN_REDIRECT_URL);
    }
    return;
  };

  useEffect(() => {
    checkUserLoginState(authToken);
  }, [authToken]);
  checkUserLoginState(authToken);

  if (!pageLoaded) {
    return <WaitForPageLoad />;
  } else {
    return (
      <>
        <Header user={user} />
        <Box className={classes.root}>
          <Box className={classes.box}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Box>
          <Box className={classes.box}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Box>
        </Box>
      </>
    );
  }
}
