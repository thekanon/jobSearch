export interface TechnicalQuestion {
  question: string;
  intention: string;
  exampleAnswer: string;
}

export interface NonTechnicalQuestion {
  question: string;
  intention: string;
  exampleAnswer: string;
}

export interface InterviewQuestions {
  id: string;
  name: string;
  generalFeatures: string[];
  technicalQuestions: TechnicalQuestion[];
  nonTechnicalQuestions: NonTechnicalQuestion[];
}
