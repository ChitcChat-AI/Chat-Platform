import { socketSendMessagePrompt } from "./socketMessagePrompt";
import { statusOptions } from "./constants";
import { isAnsweredSurvey } from "./requests";

let clientIDlocal = null;

export const InitSocket = (id, setStatus, setClientID, setSurvey2) => {
  const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_CONNECTION);

  const handleStatusChanged = (status) => {
    let isAnswered = true;
    if (clientIDlocal !== null) {
      isAnswered = isAnsweredSurvey(id, clientIDlocal);
    }
    if (
      (status === statusOptions.COMPLETED ||
        status === statusOptions.PROCESSING) &&
      !isAnswered
    ) {
      setSurvey2(true);
      setStatus(statusOptions.RUNNING);
    } else {
      setStatus(status);
    }
  };

  socket.onopen = (event) => {
    console.log("event", event);
    setClientID(event.data);
    socket.send(socketSendMessagePrompt(id));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    console.log("Received data: ", data);
    data.clientID
      ? () => {
          clientIDlocal = data.clientID;
          setClientID(data.clientID);
        }
      : null;
    data.exp_status ? handleStatusChanged(data.exp_status) : null;
  };

  return socket;
};
