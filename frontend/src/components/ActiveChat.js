import React from 'react';
import ChatHeader from "./ChatHeader";

export default function ActiveChat(props) {
    const {user} = props;
  return (
    <>
        <ChatHeader user={user} />
    </>
  );
}
