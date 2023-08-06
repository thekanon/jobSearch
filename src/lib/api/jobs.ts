import axios from "axios";

export async function fetchJob(jobId: string) {
  try {
    const response = await axios.get(`http://localhost:3000/api/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null; // 에러 발생 시 null 반환
  }
}
export async function fetchJobs() {
  try {
    const response = await axios.get("http://localhost:3000/api/jobs");
    return response.data;
  } catch (error) {
    console.error(error);
    return null; // 에러 발생 시 null 반환
  }
}
