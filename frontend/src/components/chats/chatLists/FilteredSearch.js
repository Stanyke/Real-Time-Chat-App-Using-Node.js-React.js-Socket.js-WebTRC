import React from "react";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import useApp from "../../../store/contexts/AppContext";

export default function FilteredSearch({ chatsFilter, styles }) {
  const { switchActiveChat } = useApp();

  return (
    <>
      {
        <>
          {chatsFilter?.chats.length ? (
            <Typography className={styles.titleBar}>Messages</Typography>
          ) : null}
          {chatsFilter?.chats.map((chat) => {
            const lastMessageInAChat = chat?.messages.length - 1;
            return (
              <Paper
                className={`${styles.paper} ${styles.singleChat}`}
                key={chat._id}
              >
                {chat.message[lastMessageInAChat]}
              </Paper>
            );
          })}
        </>
      }

      {
        <>
          {chatsFilter?.users.length ? (
            <Typography className={styles.titleBar}>Users</Typography>
          ) : null}
          {chatsFilter?.users.map((user) => {
            return (
              <Paper
                className={`${styles.paper} ${styles.singleChat}`}
                key={user.otherUser._id}
                onClick={() => switchActiveChat(user)}
              >
                {user.otherUser.username}
              </Paper>
            );
          })}
        </>
      }
    </>
  );
}
