<<<<<<< HEAD
import React, { useContext } from "react";
=======
import React, { useEffect, useContext, useState } from "react";
>>>>>>> e647a46e218e9885829c5ca446a7b287009165b0
import {
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { SocketContext } from "../../../statesManager";
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
  const {activeChat} = useContext(SocketContext);
  const { otherUser } = activeChat;
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
        <BottomNavigationAction label={otherUser.username} icon={<PersonIcon />} />
        <BottomNavigationAction label="Voice" icon={<AddIcCallIcon />} />
        <BottomNavigationAction label="Video" icon={<VideoCallIcon />} />
      </BottomNavigation>
      <Box className={classes.lastSeenBox}>
        <Typography className={classes.lastSeenText}>{`Last Seen: ${lastSeen}`}</Typography>
      </Box>
    </>
  );
}
 