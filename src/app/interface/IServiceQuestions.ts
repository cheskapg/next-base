export default interface IServiceQuestions {
      conditional_id: number | null;
      conditional_value: string | null;
      conditions: string | null;
      custom_features: string | null;
      excluded_visit_reason: string | null;
      form_display: boolean;
      high_risk_answer: string | null;
      high_risk_conditions: string | null;
      id: number;
      input_type:string; // Extend as needed
      is_required: boolean;
      minimum_age: number | null;
      options: string | null;
      question: string;
      region_id: number;
      section: string;
      service_line_id: number;
      service_line_name: string;
      subtext: string | null;
      visit_reason: string | null;
      
  }
  