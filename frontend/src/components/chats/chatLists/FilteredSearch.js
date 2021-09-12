import React, {useContext} from "react";
import Paper from "@material-ui/core/Paper";
import {
  Typography,
} from "@material-ui/core";
import {SocketContext} from "../../../statesManager";

export default function FilteredSearch({ chatsFilter, styles }) {
  const {switchActiveChat} = useContext(SocketContext);

  return (
    <>
      {
        <>
        {chatsFilter?.chats.length ? <Typography className={styles.titleBar}>Messages</Typography> : null}
        {chatsFilter?.chats.map((chat) => {
          const lastMessageInAChat = chat?.messages.length - 1;
          return (
            <Paper className={`${styles.paper} ${styles.singleChat}`} key={chat._id}>
              {chat.message[lastMessageInAChat]}
            </Paper>
          );
        })
        }
      </>
      }

      {
        <>
          {chatsFilter?.users.length ? <Typography className={styles.titleBar}>Users</Typography> : null}
          {chatsFilter?.users.map((user) => {
            return (
              <Paper className={`${styles.paper} ${styles.singleChat}`} key={user.user._id} onClick={switchActiveChat(user.user._id)}>
                {user.user.username}
              </Paper>
            );
          })}
        </>
      }
    </>
  );
}
