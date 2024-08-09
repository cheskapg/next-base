import IClinicalQuestions from "../interface/IClinicalQuestions";



export default class ClinicalQuestions implements IClinicalQuestions {
    questionId = 0;
    answer = '';
    personId= 0;
    type= '';
    questionType='';
  }