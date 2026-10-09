import type { GetStaticPaths, GetStaticProps } from "next";
import jobsData from "@/lib/data/jobsQuestion";
import type { InterviewQuestions } from "@/lib/types/jobs";
import JobPage from "@/containers/JobPageContainer";

const jobs: Record<string, InterviewQuestions> = jobsData;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.keys(jobs).map((jobId) => ({ params: { jobId } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<InterviewQuestions> = async ({ params }) => {
  const jobId = params?.jobId;
  if (
    typeof jobId !== "string" ||
    !/^[A-Za-z][A-Za-z0-9]*$/.test(jobId) ||
    !Object.prototype.hasOwnProperty.call(jobs, jobId)
  ) {
    return { notFound: true };
  }

  return { props: jobs[jobId] };
};

export default JobPage;
