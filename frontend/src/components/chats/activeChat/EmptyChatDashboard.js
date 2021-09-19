import React from "react";
import { Box, Card } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
      width: '100%',
      height: '100%',
      background: '#0c499ca6'
  },
  imageBoxText: {
    top: "30%",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    position: "relative",
    fontSize: "30px",
    padding: "0px 80px",
  },
  chatIcon: {
    fontSize: 100
  }
}));

export default function EmptyChatDashboard({ user, activeChat }) {
    const classes = useStyles();
    if (Object.keys(activeChat).length < 1) {

    return (
        <Card className={classes.container}>
        <Box className={classes.imageBoxText}>
          <ChatIcon className={classes.chatIcon} />
          <Box>Hi, {user.username}</Box>
        </Box>
      </Card>
    );
  }
  return null;
}
