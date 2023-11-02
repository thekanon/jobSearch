import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchJob(jobId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/api/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    // console.error(error);
    return null; // 에러 발생 시 null 반환
  }
}
export async function fetchJobs() {
  try {
    const response = await axios.get(`${BASE_URL}/api/jobs`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null; // 에러 발생 시 null 반환
  }
}
