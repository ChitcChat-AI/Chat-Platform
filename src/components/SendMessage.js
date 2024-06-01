import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { IoSendSharp } from "react-icons/io5";

const SendMessage = ({ scroll, id }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Please write a message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, id), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage("");
    scroll.current.scrollIntoView({
      behavior: "instant",
      inline: "end",
      blocl: "end",
    });
  };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="flex">
      <textarea
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows="1"
        placeholder="Type your message..."
        className="cursor-text w-full resize-none	p-2"
        autoComplete="off"
      />
      <button
        type="submit"
        className="bg-slate-400 flex items-center justify-center  rounded-r-lg hover:bg-slate-600 w-20"
      >
        <IoSendSharp />
      </button>
    </form>
  );
};

export default SendMessage;
