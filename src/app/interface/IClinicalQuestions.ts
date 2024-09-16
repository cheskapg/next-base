export default interface IClinicalQuestions {
    id: number;
    region_id: number;
    section: string;
    question: string;
    subtext: string | null;
    options: string | null;
    input_type: string;
    visit_reason: string | null;
    conditional_id: number | null;
    conditional_value: string | null;
    minimum_age: number | null;
    is_required: boolean;
    form_display: boolean;
    high_risk_answer: string | null;
    high_risk_answer_status: string | null;
}
