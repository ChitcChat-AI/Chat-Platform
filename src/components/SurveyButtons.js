import React from "react";
import { sendSurveyResult } from "../requests";
import Button from "./Button";
import { opinionOptions } from "../constants";
const SurveyButtons = ({ experiment, clientID, setSurvey }) => {
  const handleOnClick = (opinion) => {
    sendSurveyResult(experiment.exp_id, clientID, opinion);
    setSurvey(false);
  };

  return (
    <div className="flex  items-center justify-center w-full gap-3 mt-5">
      <Button
        text={opinionOptions.FOR}
        onClick={() => handleOnClick(opinionOptions.FOR)}
        color="green"
      />
      <Button
        text={opinionOptions.NEUTRAL}
        onClick={() => handleOnClick(opinionOptions.NEUTRAL)}
        color="gray"
      />
      <Button
        text={opinionOptions.AGAINST}
        onClick={() => handleOnClick(opinionOptions.AGAINST)}
        color="red"
      />
    </div>
  );
};

export default SurveyButtons;
