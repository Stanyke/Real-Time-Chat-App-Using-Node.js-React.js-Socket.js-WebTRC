import React, { useEffect, useState } from "react";
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

import useApp from "../../../store/contexts/AppContext";
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
  const {
    appState: {activeChat, onlineUsersId}
  } = useApp();
  const { otherUser } = activeChat;
  const [lastSeen, setLastSeen] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeenTimer, setLastSeenTimer] = useState('');

  useEffect(() => {
    if(onlineUsersId.includes(user._id.toString())) {
      setIsOnline(true);
      setLastSeen('Online');
    } else {
      clearInterval(lastSeenTimer);
      setIsOnline(false);
      setLastSeenTimer(setInterval(() => {
        setLastSeen(RelativeTimeFormat(user.lastSeen));
      }, 1000));
    }
  }, [onlineUsersId, lastSeen, user]);
  
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
        <Typography className={classes.lastSeenText}>{`Last Seen: ${isOnline ? 'Online' : lastSeen}`}</Typography>
      </Box>
    </>
  );
}
 