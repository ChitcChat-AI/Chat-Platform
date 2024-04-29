import React from "react";

const SurveyText = ({ text, exp_subject }) => {
  return (
    <p className="text-3xl text-center">
      {text}
      {
        " Please let us know what is your opinion about the experiment subject below."
      }
      <br />
      <br />
      <b>{exp_subject}</b>
    </p>
  );
};

export default SurveyText;
