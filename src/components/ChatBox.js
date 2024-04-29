import React, { useEffect, useState } from "react";

import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getExperimentById } from "../requests";
import { bodyComponentDict } from "../bodyComponentDict";
import { InitSocket } from "../socketConnection";
import Modal from "./Modal";

const ChatBox = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [clientID, setClientID] = useState(null);
  const [experiment, setExperiment] = useState(null);
  const [survey, setSurvey] = useState(true);
  const [user] = useAuthState(auth);

  const body = bodyComponentDict(status, experiment, clientID);

  useEffect(() => {
    const socket = InitSocket(id, setStatus, setClientID);

    getExperimentById(id)
      .then((data) => {
        setExperiment(data.exp);
      })
      .catch((error) => {
        console.error("Failed to fetch experiment", error);
        // consider logout from chat...
      });

    // check if answered first survey

    // check if enswered second survey

    return () => {
      socket.close();
    };
  }, [id]);

  return user ? status && body : navigate(`/${id}`);
};

export default ChatBox;
