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
const sendSurveyResult = async (experimentID, clientID, surveyResult) => {
  const URL = baseURL + ``;
  try {
    // const response = await axios.post(URL, { surveyResult });
    console.log("Survey Result: ", surveyResult);
    console.log("Client ID: ", clientID);
    console.log("Experiment ID: ", experimentID);
    // return response.data;
  } catch (error) {
    console.error("Failed to send survey result", error);
    return null;
  }
};

export { getExperimentById, sendSurveyResult };
