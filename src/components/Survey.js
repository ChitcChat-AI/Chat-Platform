import React from "react";
import Logo from "../img/logo.png";
import SurveyButtons from "./SurveyButtons";
import SurveyText from "./SurveyText";

const Survey = ({ text, experiment, clientID, setSurvey }) => {
  console.log("Experiment: ", experiment);
  return (
    <div className="flex flex-col items-center pt-10">
      <img src={Logo} alt="logo" className="w-24 h-24 sm:w-48 sm:h-48 mb-5" />
      <div className="flex flex-col items-center justify-center w-5/6 sm:w-1/3 p-4 bg-white rounded-lg shadow-lg">
        <SurveyText text={text} exp_subject={experiment.exp_subject} />
        <SurveyButtons
          experiment={experiment}
          clientID={clientID}
          setSurvey={setSurvey}
        />
      </div>
    </div>
  );
};

export default Survey;
