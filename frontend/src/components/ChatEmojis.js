import React from 'react';
import Emojis from '../assets/icons/Emojis.json';

export default function ChatEmojis() {
  return (
    <>
      {Emojis.map((emoji) => {
        if(emoji.category === 'Flags (country-flag)'){
          const imageSource = `https://www.countryflags.io/${emoji.char}/flat/16.png`;
          return <img src={imageSource} alt="icon" />;
        } else {
          return emoji.char;
        }
      })}
    </>
  );
}
