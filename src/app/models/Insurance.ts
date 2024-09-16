import IInsurance from "../interface/IInsurance";



export default class Insurance implements IInsurance {

  //insurance
  insuranceCarrier1 = '';
  subscriberId1 = '';
  hasInsurance1 = '';
  insuranceFirstName1 = '';
  insuranceLastName1 = '';
  insuranceDob1 = '';
  insurancePhone1 = ''; 
  insuranceAddress1 = '';
  insuranceAddress2_1 = '';
  insuranceCity1= '';
  insuranceState1 = '';
  insuranceZip1 = '';
  isValidInsurance1 = '';
  insuranceSubscriber1 = '';
  //insurance card

  frontInsuranceCard1 = '';
  backInsuranceCard1 = '';


  // additional carrier
  insuranceCarrier2 = '';
  subscriberId2 = '';
  hasInsurance2 = '';
  insuranceFirstName2 = '';
  insuranceLastName2 = '';
  insuranceDob2 = '';
  insurancePhone2 = '';
  insuranceAddress2_2 = '';
  insuranceAddress2 = '';
  insuranceCity2 = '';
  insuranceState2 = '';
  insuranceZip2 = '';
  isValidInsurance2 = '';
  insuranceSubscriber2 = '';
  //insurance card

  frontInsuranceCard2 = '';
  backInsuranceCard2 = '';


//return from RTE
  id = 0;
  valid = false;
  is_active = false;
  carrier_id = 0;
  subscriber_id = 0
  subscriber_relation= '';
  subscriber_number = '';
  plan_name= '';
  group_number='';
  copay_amount_uc=0;
  copay_amount_pcp=0;
  individual_deductible=0;
  family_deductible=0;
  pokitdok_error = 0;
  other_comment = 0;
  primary_bre_address_id = 0;
  bre_entity_identifier_code = '';
  bre_id_qualifier= '';
  bre_id = 0;
  bre_organization_name = '';
  managed_care_organization = '';
  emr_query_key = '';
  managed_care_phone = '';
  managed_care_url = '';
  plan_number = 0;
  sequence = '';
  payor_id = 0;
  changehealth_error = '';
  insurance_type_code = '';
  insurance_type = '';
  rte_error = '';
  virtual_subscriber = {}

  
}