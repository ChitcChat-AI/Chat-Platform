import axios from "axios";
const baseURL = process.env.REACT_APP_CHICHAT_API_URL;

const getExperimentById = async (id) => {
  const URL = baseURL + `experiments/${id}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch experiment", error);
    return null;
  }
};

const websocketCreateSession = async () => {
  const URL = process.env.REACT_APP_EXPERIMENT_SOCKET_URL + '/login';
  try {
    const response = await axios.post(URL);
    console.log(response);
  } catch (error) {
    console.error("Failed connect to websocket", error);
    return null;
  }
}
// chasda
const websocketDestroySession = async () => {
  const URL = process.env.REACT_APP_EXPERIMENT_SOCKET_URL + '/logout';
  try {
    const response = await axios.delete(URL);
    console.log(response);
  } catch (error) {
    console.error("Failed disconnect to websocket", error);
    return null;
  }
}

export { getExperimentById, websocketDestroySession, websocketCreateSession  };
