import React from "react";
import Logo from "../img/logo.png";
import SurveyButtons from "./SurveyButtons";
import SurveyText from "./SurveyText";

const Survey = ({
  text,
  experiment,
  clientID,
  setSurvey,
  surveyNumber,
  setStatus,
}) => {
  return (
    <div className="flex flex-col items-center pt-10">
      <img src={Logo} alt="logo" className="w-24 h-24 md:w-48 md:h-48 mb-5" />
      <div className="flex flex-col items-center justify-center w-5/6 md:w-1/2 p-4 bg-white rounded-lg shadow-lg">
        <SurveyText text={text} exp_subject={experiment.exp_subject} />
        <SurveyButtons
          experiment={experiment}
          clientID={clientID}
          setSurvey={setSurvey}
          surveyNumber={surveyNumber}
          setStatus={setStatus}
        />
      </div>
    </div>
  );
};

export default Survey;
