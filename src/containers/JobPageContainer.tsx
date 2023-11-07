import { useState, useEffect } from "react";
import JobPageComponent from "@/components/templates/JobPageComponent";

type ExpandedState = {
  intention: boolean;
  answer: boolean;
};

const JobPageContainer = ({
  id,
  name,
  generalFeatures,
  technicalQuestions,
  nonTechnicalQuestions,
}) => {
  const [isLoading, setLoading] = useState(true);

  const [technicalExpanded, setTechnicalExpanded] = useState(
    technicalQuestions.map(() => ({ intention: false, answer: false }))
  );
  const [nonTechnicalExpanded, setNonTechnicalExpanded] = useState(
    nonTechnicalQuestions.map(() => ({ intention: false, answer: false }))
  );

  const [technicalCount, setTechnicalCount] = useState(2);
  const [nonTechnicalCount, setNonTechnicalCount] = useState(2);

  useEffect(() => {
    id && setLoading(false);
  }, [id]);

  const appendQuestions = (type) => {
    type === "technical"
      ? setTechnicalCount(technicalCount + 2)
      : setNonTechnicalCount(nonTechnicalCount + 2);
  };

  const toggleDetails = (
    type: "technical" | "nonTechnical",
    index: number,
    part: keyof ExpandedState
  ) => {
    const newState =
      type === "technical" ? [...technicalExpanded] : [...nonTechnicalExpanded];
    newState[index][part] = !newState[index][part];

    type === "technical"
      ? setTechnicalExpanded(newState)
      : setNonTechnicalExpanded(newState);
  };

  return (
    <JobPageComponent
      name={name}
      isLoading={isLoading}
      generalFeatures={generalFeatures}
      technicalQuestions={technicalQuestions}
      nonTechnicalQuestions={nonTechnicalQuestions}
      technicalExpanded={technicalExpanded}
      nonTechnicalExpanded={nonTechnicalExpanded}
      technicalCount={technicalCount}
      nonTechnicalCount={nonTechnicalCount}
      appendQuestions={appendQuestions}
      toggleDetails={toggleDetails}
    />
  );
};

export default JobPageContainer;
