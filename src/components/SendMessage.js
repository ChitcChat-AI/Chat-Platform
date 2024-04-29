import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { IoSendSharp } from "react-icons/io5";

const SendMessage = ({ scroll, id }) => {
  const [message, setMessage] = useState("");
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
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <form
      onSubmit={(event) => sendMessage(event)}
      className="send-message bg-slate-300"
    >
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input cursor-text"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-slate-400 flex items-center justify-center hover:bg-slate-600"
      >
        <IoSendSharp />
      </button>
    </form>
  );
};

export default SendMessage;
