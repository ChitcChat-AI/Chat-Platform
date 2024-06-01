import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import Logo from "../img/logo.png";
import { db } from "../firebase";
import Modal from "./Modal";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { isAnsweredFirstSurvey } from "../requests";

const ChatComponent = ({
  experiment,
  clientID,
  survey2,
  setSurvey2,
  setStatus,
}) => {
  const [messages, setMessages] = useState([]);
  const [isSurvey, setIsSurvey] = useState(false);
  const scroll = useRef();

  useEffect(() => {
    isAnsweredFirstSurvey(experiment.exp_id, clientID).then((isAnswered) => {
      if (!isAnswered) {
        setIsSurvey(true);
      }
    });
    const q = query(
      collection(db, experiment.exp_id),
      orderBy("createdAt", "desc")
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
      scroll.current.scrollIntoView({ behavior: "smooth" });
    });
    return () => unsubscribe;
  }, [experiment, clientID]);

  return (
    <div className="overflow-hidden h-screen">
      <div
        id="chat-title"
        className="w-full flex items-center justify-between bg-slate-300"
      >
        {experiment && (
          <div className="flex flex-col gap-1">
            <h1 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-black mx-2">
              {experiment.exp_subject}
            </h1>
          </div>
        )}
        <img src={Logo} alt="logo" className="w-14 h-14 md:w-20 md:h-20 mr-5" />
      </div>
      <div
        id="message-box"
        className="bg-gray-400 overflow-auto px-5 pt-5 flex flex-col gap-5"
      >
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <span ref={scroll}></span>
      </div>
      <div id="send-message" className="w-full py-5 px-5  bg-slate-300	">
        <SendMessage scroll={scroll} id={experiment.exp_id} />
      </div>
      {experiment && isSurvey && (
        <Modal
          text={"Before we start,"}
          experiment={experiment}
          clientID={clientID}
          setSurvey={setIsSurvey}
          surveyNumber={1}
          setStatus={() => {}}
        />
      )}
      {experiment && survey2 && (
        <Modal
          text={"Thank you for participating in the experiment!"}
          experiment={experiment}
          clientID={clientID}
          setSurvey={setSurvey2}
          surveyNumber={2}
          setStatus={setStatus}
        />
      )}
    </div>
  );
};

export default ChatComponent;
