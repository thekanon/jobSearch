export interface FindMeQuestionProps {
  question: mediumCategoriesProps;
  color?: string;
}
export interface mediumCategoriesProps {
  mediumCategoryName: string;
  questionList: {
    id: number | string;
    code?: string;
    reverse?: boolean;
    maxScore?: number;
    minScore?: number;
    description: string;
    isExpandable?: boolean;
    isDirective?: boolean;
    answerOptions: any[];
    answer?: string;
    answerType?: string;
  }[];
  color?: string;
}
