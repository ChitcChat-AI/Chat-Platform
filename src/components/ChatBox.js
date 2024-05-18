import { useEffect, useState } from "react";

import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getExperimentById } from "../requests";
import { bodyComponentDict } from "../bodyComponentDict";
import { InitSocket } from "../socketConnection";

const ChatBox = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [clientID, setClientID] = useState(null);
  const [experiment, setExperiment] = useState(null);
  const [survey2, setSurvey2] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const socket = InitSocket(id, setStatus, setClientID, setSurvey2);

    getExperimentById(id)
      .then((data) => {
        setExperiment(data.exp);
      })
      .catch((error) => {
        console.error("Failed to fetch experiment", error);
      });
    return () => {
      socket.close();
    };
  }, [id]);

  return user
    ? status &&
        bodyComponentDict(
          status,
          experiment,
          clientID,
          survey2,
          setSurvey2,
          setStatus
        )
    : navigate(`/${id}`);
};

export default ChatBox;
