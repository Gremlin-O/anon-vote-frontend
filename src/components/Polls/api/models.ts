export interface IPoll {
  title: string;
  queries: IQuery[];
  id: string;
  tags: string[];
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
  tags: string[];
  answered: boolean;
}
