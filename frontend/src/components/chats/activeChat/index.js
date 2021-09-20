import React, {useContext} from 'react';
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import MessageField from "./MessageField";
import {SocketContext} from "../../../statesManager";

export default function ActiveChat(props) {
  const {user, chats} = props;
  const {activeChat} = useContext(SocketContext);

  if(Object.keys(activeChat).length > 0){
    const {conversation, otherUser, messages} = activeChat;
    return (
      <>
          <ChatHeader user={otherUser} />
          <ChatContent />
          <MessageField />
      </>
    );
  }
  return null;
}
