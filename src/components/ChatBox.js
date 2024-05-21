import { useEffect, useState } from "react";

import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getExperimentById } from "../requests";
import { bodyComponentDict } from "../bodyComponentDict";
import { InitSocket } from "../socketConnection";

const ChatBox = () => {
  const { id, uid } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [experiment, setExperiment] = useState(null);
  const [survey2, setSurvey2] = useState(false);
  const [user] = useAuthState(auth);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.uid !== uid) {
        setIsUserAuthenticated(false);
      }
    } else {
      setIsUserAuthenticated(false);
    }
  }, [user, uid]);

  useEffect(() => {
    const socket = InitSocket(id, setStatus, uid, setSurvey2);

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

  return isUserAuthenticated
    ? status &&
        bodyComponentDict(
          status,
          experiment,
          uid,
          survey2,
          setSurvey2,
          setStatus
        )
    : navigate(`/${id}`);
};

export default ChatBox;
