import React from "react";
import ChatComponent from "./components/ChatComponent";
import Survey from "./components/Survey";
import InvalidStatus from "./components/InvalidStatus";
import { statusOptions } from "./constants";
import ExperimentEnded from "./components/ExperimentEnded";
import ExperimentNotStarted from "./components/ExperimentNotStarted";

export const bodyComponentDict = (status, experiment, clientID) => {
  switch (status) {
    case statusOptions.NOT_STARTED:
      return <ExperimentNotStarted />;
    case statusOptions.RUNNING:
      return <ChatComponent experiment={experiment} clientID={clientID} />;
    case statusOptions.COMPLETED:
    case statusOptions.PROCESSING:
      return (
        <ExperimentEnded
          text={"Experiment has ended. Thank you for your participation."}
        />
      );

    default:
      return <InvalidStatus />;
  }
};
