import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import path from "path";
import fs from "fs/promises";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const jobId = req.query.jobId as string;

  console.log("test");

  // JSON 파일의 경로를 생성합니다.
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "public",
    "data",
    "jobsQuestion",
    `${jobId}.json`
  );

  try {
    // 파일을 읽습니다.
    const fileContents = await fs.readFile(filePath, "utf8");

    // JSON을 파싱합니다.
    const jobData = JSON.parse(fileContents);

    console.log(fileContents);

    // 응답으로 JSON 데이터를 보냅니다.
    res.status(200).json(jobData);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Job not found" });
  }
};
