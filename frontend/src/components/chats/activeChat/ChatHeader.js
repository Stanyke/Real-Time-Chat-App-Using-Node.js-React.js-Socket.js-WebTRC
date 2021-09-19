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
import WaitForPageLoad from "../../WaitForPageLoad";
import Header from "../../Header";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { DashboardStyle } from "../../../assets/css/DashboardStyle";
import AuthSidebar from "../../AuthSidebar";
import { SocketContext } from "../../../statesManager";
import ToastBar from "../../ToastBar";
import RelativeTimeFormat from "../../RelativeTimeFormat";

const useStyles = makeStyles({
    root: {
      color: 'black',
      background: '#b9b9b9',
      width: '100%'
    },
    arrowBack: {
      display: "none",

      "@media (max-width: 700px)": {
        display: "block",
      }
    },
    lastSeenBox: {
      background: '#f3ecec',
      height: "auto",
    },
    lastSeenText: {
      fontSize: "10px",
      padding: '0px 10px',
      color: '#999'
    }
  });

export default function ChatHeader(props) {
  const { user } = props;
  const classes = useStyles();
  const [lastSeen, setLastSeen] = useState('');

  useEffect(() => {
    setInterval(() => {
      setLastSeen(RelativeTimeFormat(user.lastSeen));
    }, 1000);
  }, []);
  
  return (
    <>
      <BottomNavigation
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction className={classes.arrowBack} label="Chats" icon={<ArrowBackIcon />} />
        <BottomNavigationAction label="Stanyke" icon={<PersonIcon />} />
        <BottomNavigationAction label="Voice" icon={<AddIcCallIcon />} />
        <BottomNavigationAction label="Video" icon={<VideoCallIcon />} />
      </BottomNavigation>
      <Box className={classes.lastSeenBox}>
        <Typography className={classes.lastSeenText}>{`Last Seen: ${lastSeen}`}</Typography>
      </Box>
    </>
  );
}
 