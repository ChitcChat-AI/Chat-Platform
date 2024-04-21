import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getExperimentById } from "../requests";

const ChatBox = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [experiment, setExperiment] = useState(null);

  const [user] = useAuthState(auth);
  const scroll = useRef();

  useEffect(() => {
    getExperimentById(id)
      .then((data) => {
        setExperiment(data);
      })
      .catch((error) => {
        console.error("Failed to fetch experiment", error);
      });

    const q = query(
      collection(db, id),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, [id]);

  return user ? (
    <>
      <div className="w-full flex items-center justify-between p-5 bg-slate-300 fixed">
        {experiment && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl text-black">{experiment.exp_subject}</h1>
            <p className="text-lg text-black">
              {experiment.exp_provoking_prompt}
            </p>
          </div>
        )}
        <button
          onClick={() => {
            auth.signOut();
            navigate(`/login/${id}`);
          }}
          className="text-black bg-white p-2 rounded-md hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
      <div className="h-20"></div>
      <div className="bg-gray-400 h-screen">
        <main>
          <div className="p-5 mb-14 bg-gray-400">
            {messages?.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
          {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
          <span ref={scroll}></span>
          <SendMessage scroll={scroll} id={id} />
        </main>
      </div>
    </>
  ) : (
    navigate(`/login/${id}`)
  );
};

export default ChatBox;
