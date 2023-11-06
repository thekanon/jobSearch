import { NextApiRequest, NextApiResponse } from "next";
import jobsData from "@/lib/data/jobsQuestion";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { jobId },
  } = req;

  console.log("jobId", jobId);

  const jobData = jobsData[jobId];

  if (!jobData) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.status(200).json(jobData);
};
