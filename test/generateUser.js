// 사용자의 직무, 회사, 전공, 성별, 마지막으로 검색한 사이트 등을 나타내는 배열
let jobTitles = ["소프트웨어 개발자", "데이터 분석가", "PM", "웹 개발자"];
let companies = ["회사1", "회사2", "회사3", "회사4"];
let majors = ["컴퓨터 과학", "정보 시스템", "비즈니스 관리", "소프트웨어 공학"];
let genders = ["남성", "여성"];
let searchSites = ["Google", "Naver", "Daum", "Bing"];

// 사용자 데이터 배열 생성
let userData = [];

for (let i = 0; i < 100; i++) {
  // 100개의 가상 사용자 데이터 생성
  let user = {
    user_id: i + 1,
    current_job_title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
    current_company: companies[Math.floor(Math.random() * companies.length)],
    years_of_experience: Math.floor(Math.random() * 21), // 0년 ~ 20년 사이의 임의의 경력
    current_salary: Math.floor(Math.random() * 10001) + 20000, // 20000 ~ 30000 사이의 임의의 급여
    employment_year: Math.floor(Math.random() * 21) + 2000, // 2000년 ~ 2020년 사이의 임의의 고용 연도
    number_of_employments: Math.floor(Math.random() * 11), // 0 ~ 10회 사이의 임의의 고용 횟수
    major: majors[Math.floor(Math.random() * majors.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
    job_satisfaction_level: Math.floor(Math.random() * 11), // 0 ~ 10 사이의 임의의 직무 만족도
    last_searched_site:
      searchSites[Math.floor(Math.random() * searchSites.length)],
    age: Math.floor(Math.random() * 51) + 20, // 20 ~ 70 사이의 임의의 나이
  };
  userData.push(user);
}

console.log(userData);
