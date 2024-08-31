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
const sendSurveyResult = async (exp_id, user_id, opinion, surveyNumber) => {
  let URL;
  if (surveyNumber === 1) URL = baseURL + `surveys/pre`;
  else URL = baseURL + `surveys/post`;
  try {
    const response = await axios.post(URL, {
      exp_id,
      user_id,
      opinion,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to send survey result", error);
    return null;
  }
};

const isAnsweredFirstSurvey = async (exp_id, user_id) => {
  const URL = baseURL + `surveys/pre/is-answer`;
  try {
    const response = await axios.post(URL, { exp_id, user_id });
    return response.data[0].is_pre;
  } catch (error) {
    console.error("Failed to fetch experiment", error);
    return null;
  }
};

const isAnsweredSecondSurvey = async (exp_id, user_id) => {
  const URL = baseURL + `surveys/post/is-answer`;
  try {
    const response = await axios.post(URL, { exp_id, user_id });
    return response.data[0].is_post;
  } catch (error) {
    console.error("Failed to fetch experiment", error);
    return null;
  }
};

const saveParticipant = async (exp_id, user_id) => {
  const URL = baseURL + "register";
  try {
    axios.post(URL, { exp_id, user_id });
  } catch (error) {
    return null;
  }
};

const isParticipantConnected = async (exp_id, user_id) => {
  const URL = baseURL + `participant/${user_id}/experiment/${exp_id}/is-in`;
  try {
    const response = await axios.get(URL);
    return response.data[0].is_in;
  } catch (error) {
    console.error("Failed to check participant connection", error);
    return null;
  }
};

export {
  getExperimentById,
  sendSurveyResult,
  isAnsweredFirstSurvey,
  isAnsweredSecondSurvey,
  saveParticipant,
  isParticipantConnected,
};
