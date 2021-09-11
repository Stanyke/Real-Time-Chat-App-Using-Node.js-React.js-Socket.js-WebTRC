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
import WaitForPageLoad from "./WaitForPageLoad";
import Header from "./Header";

import { DashboardStyle } from "../assets/css/DashboardStyle";
import AuthSidebar from "./AuthSidebar";
import { SocketContext } from "../statesManager";
import ToastBar from "./ToastBar";

export default function ChatLists(props) {
    const {styles} = props;
    return (
      <Typography className={styles.emptyItem}>No Messages Available.</Typography>
    )
  // return (
  //   <>
  //       <Paper className={`${styles.paper} ${styles.singleChat}`}>xs=12</Paper>
  //       <Paper className={`${styles.paper} ${styles.singleChat}`}>xs=12</Paper>
  //       <Paper className={`${styles.paper} ${styles.singleChat}`}>xs=12</Paper>
  //       <Paper className={`${styles.paper} ${styles.singleChat}`}>xs=12</Paper>
  //   </>
  // );
}
