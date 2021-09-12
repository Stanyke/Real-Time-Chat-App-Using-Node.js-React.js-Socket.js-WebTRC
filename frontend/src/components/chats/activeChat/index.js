import React, {useContext} from 'react';
import ChatHeader from "./ChatHeader";

export default function ActiveChat(props) {
  const {user, chats} = props;
  return (
    <>
        <ChatHeader user={user} />
    </>
  );
}
