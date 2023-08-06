// 최근 급여 평균 데이터
let salaryData = [];
for (let i = 0; i < 10; i++) {
  salaryData.push({
    years: i,
    year: 2023 - i,
    avgSalary: Math.floor(Math.random() * 10000),
  });
}
console.log("최근 급여 평균 데이터");
console.log(salaryData);

// 최근 고용 통계 데이터
let employmentData = [];
for (let i = 0; i < 10; i++) {
  employmentData.push({
    years: i,
    year: 2023 - i,
    employmentCount: Math.floor(Math.random() * 1000),
  });
}
console.log("최근 고용 통계 데이터");
console.log(employmentData);

// 관련 학과 진학률 데이터
let majors = [
  "Computer Science",
  "Information Systems",
  "Software Engineering",
];
let genders = ["Male", "Female"];
let majorAdmissionData = [];
for (let i = 0; i < 10; i++) {
  majorAdmissionData.push({
    major: majors[Math.floor(Math.random() * 3)],
    gender: genders[Math.floor(Math.random() * 2)],
    admissionRate: Math.random(),
  });
}
console.log("관련 학과 진학률 데이터");
console.log(majorAdmissionData);

// 주요 검색 사이트 검색률 데이터
let sites = ["Google", "Naver", "Daum", "Bing"];
let searchRateData = [];
for (let i = 0; i < 10; i++) {
  searchRateData.push({
    site: sites[Math.floor(Math.random() * 4)],
    year: 2023 - i,
    searchRate: Math.random(),
  });
}
console.log("주요 검색 사이트 검색률 데이터");
console.log(searchRateData);

// 직무 만족도 데이터
let satisfactionData = [];
for (let i = 0; i < 5; i++) {
  satisfactionData.push({ satisfactionLevel: i + 1 });
}
console.log("직무 만족도 데이터");
console.log(satisfactionData);

// 해당 직무의 주요 고용 기업 리스트 데이터
let companies = ["Company1", "Company2", "Company3", "Company4", "Company5"];
let companyData = [];
for (let i = 0; i < 5; i++) {
  companyData.push({ companyName: companies[i] });
}
console.log("해당 직무의 주요 고용 기업 리스트 데이터");
console.log(companyData);
