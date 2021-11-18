import { IQuestion } from "./iquestion";

export interface IQuiz {
    // id: String;
    name: String;
    category: String;
    totalScore: Number;
    description: String;
    questions: IQuestion[];
    answer: String;
}
