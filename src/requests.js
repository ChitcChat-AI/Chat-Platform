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
  console.log({
    exp_id,
    user_id,
    opinion,
  });
  try {
    const response = await axios.post(URL, {
      exp_id,
      user_id,
      opinion,
    });
    console.log("response ", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to send survey result", error);
    return null;
  }
};

const isAnsweredFirstSurvey = async (exp_id, user_id) => {
  console.log({ exp_id, user_id });
  const URL = baseURL + `surveys/pre/is-answer`;
  try {
    const response = await axios.post(URL, { exp_id, user_id });

    console.log(response.data[0].is_pre);
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
    console.log("Failed to save participant", error);
    return null;
  }
};

const isParticipantConnected = async (exp_id, user_id) => {
  const URL = baseURL + `participant/${user_id}/experiment/${exp_id}/is-in`;
  console.log({ exp_id, user_id });
  console.log(URL);
  try {
    const response = await axios.get(URL);
    console.log(response.data);
    return response.data[0].is_in;
  } catch (error) {
    console.log("Failed to check participant connection", error);
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
