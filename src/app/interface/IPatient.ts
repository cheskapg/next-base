export default interface IPatient {
  patientId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  sexAtBirth: string;
  preferredPronouns: string;
  genderIdentity: string;
  suffix: string;
  maritalStatus: string;
  race: string;
  raceId: number;
  ethnicity: string;
  ethnicityId: number;
  language: string;
  languageId: number;
  phoneNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  reasonForVisit: string;
  visitTime: string;
  primaryCareProvider: string;
  registrationId: number;
  regionId: number;
  hospitalId: number;
  status: string;
  personId: number;


  //insurance
  insuranceCarrier: string;
  subscriberId: string;
  hasInsurance: string;
  insuranceFirstName: string;
  insuranceLastName: string;
  insuranceDob: string;
  insurancePhone: string;
  insuranceCountry: string;
  insuranceAddress: string;
  insuranceAddress2: string;
  insuranceCity: string;
  insuranceState: string;
  insuranceZip: string;
  isValidInsurance: string;
  insuranceSubscriber: string;
  subscriberDob: string;

  
  //additional subscriber
  insuranceCarrier2: string;
  subscriberId2: string;
  hasInsurance2: string;
  insuranceFirstName2: string;
  insuranceLastName2: string;
  insuranceDob2: string;
  insurancePhone2: string;
  insuranceCountry2: string;
  insuranceAddress2_2: string;
  insuranceCity2: string;
  insuranceState2: string;
  insuranceZip2: string;
  subscriberDob2: string;
  isValidInsurance2: string;
  insuranceSubscriber2: string;
}