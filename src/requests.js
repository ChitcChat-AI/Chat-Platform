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

// Waiting for the server api to be ready
const sendSurveyResult = async (
  experimentID,
  clientID,
  surveyResult,
  surveyNumber
) => {
  const URL = baseURL + ``;
  try {
    // const response = await axios.post(URL, { surveyResult });
    console.log("Survey Result: ", surveyResult);
    console.log("Client ID: ", clientID);
    console.log("Experiment ID: ", experimentID);
    console.log("Survey Number: ", surveyNumber);
    // return response.data;
  } catch (error) {
    console.error("Failed to send survey result", error);
    return null;
  }
};

const isAnsweredSurvey = (exp_id, clientId) => {
  const URL = baseURL + `/experiment/${exp_id}/survey/${clientId}`;
  // try {
  // const response = await axios.get(URL);
  // return response.data;
  // } catch (error) {
  //   console.error("Failed to fetch experiment", error);
  //   return null;
  // }
  return null;
};

const saveParticipant = async (exp_id, user_id) => {
  const URL = baseURL + "register";
  try {
    console.log({ exp_id, user_id });
    axios.post(URL, { exp_id, user_id });
  } catch (error) {
    console.log("Failed to save participant", error);
    return null;
  }
};

export {
  getExperimentById,
  sendSurveyResult,
  isAnsweredSurvey,
  saveParticipant,
};
