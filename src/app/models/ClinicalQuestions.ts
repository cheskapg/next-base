import IClinicalQuestions from "../interface/IClinicalQuestions";



export default class ClinicalQuestions implements IClinicalQuestions {
    id: number = 0;
    region_id = 0;
    section = '';
    question = '';
    subtext= null;
    options= null;
    input_type= '';
    visit_reason = null;
    conditional_id = null;
    conditional_value = null;
    minimum_age= null;
    is_required= false;
    form_display=true;
    high_risk_answer = null;
    high_risk_answer_status = null;
  
    
  }