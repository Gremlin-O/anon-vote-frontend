export interface IPollCategory {
  id: string;
  name: string;
  path?: string[];
}

export interface IPoll {
  title: string;
  queries: IQuery[];
  id: string;
  tags: string[];
  category?: IPollCategory;
  isAnswered: boolean;
}
export interface IQuery {
  id: string;
  text: string;
  answers: string[];
}
export interface IQuestionResponse {
  text: string;
  options: string[];
  id: string;
}

export interface IPollResponse {
  id: string;
  title: string;
  questions: IQuestionResponse[];
  categoryId: string;
  categoryName?: string;
  categoryPath?: string[];
  category?: IPollCategory;
  tags: string[];
  answered: boolean;
}
