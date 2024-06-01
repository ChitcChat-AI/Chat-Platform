import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { IoSendSharp } from "react-icons/io5";

const SendMessage = ({ scroll, id }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isSending) {
      e.preventDefault();
      setIsSending(true);
      sendMessage(e);
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    setIsSending(true);

    if (message.trim() === "") {
      alert("Please write a message");
      setIsSending(false);
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
    setIsSending(false);
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
      {!isSending ? (
        <button
          type="submit"
          className="bg-slate-400 flex items-center justify-center  rounded-r-lg hover:bg-slate-600 w-20"
        >
          <IoSendSharp />
        </button>
      ) : (
        <button
          type=""
          className="bg-slate-400 opacity-50 cursor-not-allowed flex items-center justify-center rounded-r-lg w-20"
          disabled
        >
          <IoSendSharp />
        </button>
      )}
    </form>
  );
};

export default SendMessage;
