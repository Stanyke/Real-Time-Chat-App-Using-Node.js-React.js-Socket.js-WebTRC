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
import WaitForPageLoad from "../../WaitForPageLoad";
import Header from "../../Header";
import FilteredSearch from "./FilteredSearch";

import { DashboardStyle } from "../../../assets/css/DashboardStyle";
import AuthSidebar from "../../AuthSidebar";
import { SocketContext } from "../../../statesManager";
import ToastBar from "../../ToastBar";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function ChatLists(props) {
  const {styles, chats, chatsFilter, searchInProgress} = props;
  
  if(searchInProgress){
    return (<Stack sx={{ width: '100%', color: 'grey.500' }} spacing={4}>
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="inherit" />
    </Stack>)
  }
  
  if(chatsFilter?.success){
    return <FilteredSearch chatsFilter={chatsFilter} styles={styles} />
  }

  return (
    <>
      <Typography className={styles.titleBar}>Chats</Typography>
      {chats.length ? 
      <>
        <Paper className={`${styles.paper} ${styles.singleChat}`}>xs=12</Paper>
        <Paper className={`${styles.paper} ${styles.singleChat}`}>xs=12</Paper>
        <Paper className={`${styles.paper} ${styles.singleChat}`}>xs=12</Paper>
        <Paper className={`${styles.paper} ${styles.singleChat}`}>xs=12</Paper>
      </> : <Typography className={styles.emptyItem}>No Messages Available.</Typography>}
    </>
  );
}
