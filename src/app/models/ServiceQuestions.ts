import IServiceQuestions from "../interface/IServiceQuestions";



export default class ServiceQuestions implements IServiceQuestions {
  conditional_id = 0;// Default value for conditional_id
  conditional_value = '';// Default value for conditional_value
  conditions = '';// Default value for conditions
  custom_features = '';// Default value for custom_features
  excluded_visit_reason = '';// Default value for excluded_visit_reason
  form_display = false; // Default value for form_display
  high_risk_answer = '';// Default value for high_risk_answer
  high_risk_conditions = '';// Default value for high_risk_conditions
  id = 0; // Default value for id
  input_type = "";// Default value for input_type
  is_required = false; // Default value for is_required
  minimum_age = 0; // Default value for minimum_age (use 0 if not applicable)
  options = '';// Default value for options
  question = '';// Default value for question
  region_id = 0; // Default value for region_id
  section = '';// Default value for section
  service_line_id = 0; // Default value for service_line_id
  service_line_name = '';// Default value for service_line_name
  subtext = '';// Default value for subtext
  visit_reason = ''; // Default value for visit_reason
}