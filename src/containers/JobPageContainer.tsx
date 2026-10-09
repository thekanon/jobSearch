import { useEffect, useRef, useState } from "react";
import JobPageComponent from "@/components/templates/JobPageComponent";
import type { ExpandedState, QuestionType } from "@/components/molecules/QuestionList";
import type { InterviewQuestions } from "@/lib/types/jobs";

const collapsed = (count: number): ExpandedState[] =>
  Array.from({ length: count }, () => ({ intention: false, answer: false }));

const JobContent = (job: InterviewQuestions) => {
  const { id, technicalQuestions, nonTechnicalQuestions } = job;
  const [technicalExpanded, setTechnicalExpanded] = useState(() => collapsed(technicalQuestions.length));
  const [nonTechnicalExpanded, setNonTechnicalExpanded] = useState(() => collapsed(nonTechnicalQuestions.length));
  const [technicalCount, setTechnicalCount] = useState(2);
  const [nonTechnicalCount, setNonTechnicalCount] = useState(2);
  const nextFocus = useRef<string | null>(null);

  useEffect(() => {
    if (nextFocus.current) {
      document.getElementById(nextFocus.current)?.focus();
      nextFocus.current = null;
    }
  }, [technicalCount, nonTechnicalCount]);

  const appendQuestions = (type: QuestionType) => {
    const count = type === "technical" ? technicalCount : nonTechnicalCount;
    const total = type === "technical" ? technicalQuestions.length : nonTechnicalQuestions.length;
    if (count >= total) return;
    nextFocus.current = `${id}-${type}-${count}-question`;
    const setCount = type === "technical" ? setTechnicalCount : setNonTechnicalCount;
    setCount((current) => Math.min(current + 2, total));
  };

  const toggleDetails = (type: QuestionType, index: number, part: keyof ExpandedState) => {
    const setExpanded = type === "technical" ? setTechnicalExpanded : setNonTechnicalExpanded;
    setExpanded((current) => current.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [part]: !item[part] } : item
    ));
  };

  return (
    <JobPageComponent
      {...job}
      technicalExpanded={technicalExpanded}
      nonTechnicalExpanded={nonTechnicalExpanded}
      technicalCount={technicalCount}
      nonTechnicalCount={nonTechnicalCount}
      appendQuestions={appendQuestions}
      toggleDetails={toggleDetails}
    />
  );
};

// A different job remounts all disclosure and pagination state immediately.
const JobPageContainer = (job: InterviewQuestions) => <JobContent key={job.id} {...job} />;

export default JobPageContainer;
