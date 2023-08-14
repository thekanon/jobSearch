import { GetServerSideProps } from "next";
import { fetchJob } from "@/lib/api/jobs";
import { InterviewQuestions } from "@/lib/types/jobs";

import JobPage from "@/containers/JobPageContainer";

type JobProps = InterviewQuestions;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jobId = context.params?.jobId as string;
  const job: JobProps = await fetchJob(jobId);

  if (!job) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...job,
    },
  };
};

export default JobPage;
