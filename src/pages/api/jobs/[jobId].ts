import type { NextApiRequest, NextApiResponse } from "next";
import jobsData from "@/lib/data/jobsQuestion";
import type { InterviewQuestions } from "@/lib/types/jobs";

const jobs: Record<string, InterviewQuestions> = jobsData;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "GET 요청만 지원합니다." });
  }

  const jobId = req.query.jobId;
  if (
    typeof jobId !== "string" ||
    !/^[A-Za-z][A-Za-z0-9]*$/.test(jobId) ||
    !Object.prototype.hasOwnProperty.call(jobs, jobId)
  ) {
    return res.status(404).json({ message: "직무를 찾을 수 없습니다." });
  }

  return res.status(200).json(jobs[jobId]);
}
