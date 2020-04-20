export class Question {
    id:number;
    questionText:string;
    choice1:string;
    choice2:string;
    choice3:string;
    choice4:string;
    answer:string;

    constructor(Id,QuestionText,Choice1,Choice2,Choice3,Choice4,Answer){
        this.id=Id;
        this.questionText=QuestionText;
        this.choice1=Choice1;
        this.choice2=Choice2;
        this.choice3=Choice3;
        this.choice4=Choice4;
        this.answer=Answer;
    }
}
