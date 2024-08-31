import { socketSendMessagePrompt } from "./socketMessagePrompt";
import { statusOptions } from "./constants";
import { isAnsweredSecondSurvey } from "./requests";

export const InitSocket = (id, setStatus, uid, setSurvey2) => {
  const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_CONNECTION);

  const handleStatusChanged = (status) => {
    if (
      status === statusOptions.COMPLETED ||
      status === statusOptions.PROCESSING
    ) {
      if (uid !== null) {
        isAnsweredSecondSurvey(id, uid).then((isAnswered) => {
          if (!isAnswered) {
            setSurvey2(true);
            setStatus(statusOptions.RUNNING);
          } else {
            setStatus(status);
          }
        });
      }
    } else {
      setStatus(status);
    }
  };

  socket.onopen = (_) => {
    socket.send(socketSendMessagePrompt(id));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.exp_status) {
      handleStatusChanged(data.exp_status);
    }
  };

  return socket;
};
