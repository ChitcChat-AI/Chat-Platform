import React from "react";
import Survey from "./Survey";

const Modal = ({ text, experiment, clientID, setSurvey, surveyNumber, setStatus }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 h-screen bg-opacity-50">
      <Survey
        text={text}
        experiment={experiment}
        clientID={clientID}
        setSurvey={setSurvey}
        surveyNumber={surveyNumber}
        setStatus={setStatus}
      />
    </div>
  );
};

export default Modal;
