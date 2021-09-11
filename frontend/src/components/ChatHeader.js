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
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import PersonIcon from '@material-ui/icons/Person';

import { DashboardStyle } from "../assets/css/DashboardStyle";
import AuthSidebar from "./AuthSidebar";
import { SocketContext } from "../statesManager";
import ToastBar from "./ToastBar";

const useStyles = makeStyles({
    root: {
      width: 500,
      background: 'transparent'
    },
  });

export default function ChatHeader(props) {
  const { styles } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Stanyke" icon={<PersonIcon />} />
        <BottomNavigationAction label="Voice Call" icon={<AddIcCallIcon />} />
        <BottomNavigationAction label="Video Call" icon={<VideoCallIcon />} />
      </BottomNavigation>
    </>
  );
}
