import { socketSendMessagePrompt } from "./socketMessagePrompt";

export const InitSocket = (id, setStatus, setClientID) => {
  const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_CONNECTION);

  // Connection opened
  socket.onopen = (event) => {
    // Add the option to set the clientID after connection.
    console.log(event);
    setClientID(event.data);
    socket.send(socketSendMessagePrompt(id));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // get from the server my ID.
    data.clientID ? setClientID(data.clientID) : null;
    data.exp_status ? setStatus(data.exp_status) : null;
  };

  return socket;
};
