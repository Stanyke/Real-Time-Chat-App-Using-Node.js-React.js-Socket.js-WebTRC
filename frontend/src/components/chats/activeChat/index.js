import React, {useEffect} from "react";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import MessageField from "./MessageField";
import useApp from "../../../store/contexts/AppContext";

export default function ActiveChat(props) {
  const { user, chats } = props;
  const {
    appState: { activeChat, onlineUsersId },
  } = useApp();

  useEffect(() => {
    
  }, [onlineUsersId]);

  if (Object.keys(activeChat).length > 0) {
    const { conversation, otherUser, messages } = activeChat;
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
