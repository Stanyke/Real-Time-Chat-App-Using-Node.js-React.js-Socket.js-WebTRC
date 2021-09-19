import React, {useContext} from 'react';
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import MessageField from "./MessageField";
import {SocketContext} from "../../../statesManager";

export default function ActiveChat(props) {
  const {user, chats} = props;
  const {activeChat} = useContext(SocketContext);

  console.log('999999999', activeChat)
  if(Object.keys(activeChat).length > 0){
    return (
      <>
          <ChatHeader user={user} />
          <ChatContent />
          <MessageField />
      </>
    );
  }
  return null;
}
