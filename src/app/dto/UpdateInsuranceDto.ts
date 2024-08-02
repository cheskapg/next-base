import IInsurance from "../interface/IInsurance";

export class UpdateInsuranceDto {
  insuranceCarrier: string;
  subscriberId: string;
  hasInsurance: string;
  insuranceFirstName: string;
  insuranceLastName: string;
  insuranceDob: string;
  insurancePhone: string;
  insuranceAddress: string;
  insuranceAddress2: string;
  insuranceCity: string;
  insuranceState: string;
  insuranceZip: string;
  isValidInsurance: string;
  insuranceSubscriber: string;
  frontInsuranceCard: string;
  backInsuranceCard: string;

  // Additional insurance fields
  insuranceCarrier2: string;
  subscriberId2: string;
  hasInsurance2: string;
  insuranceFirstName2: string;
  insuranceLastName2: string;
  insuranceDob2: string;
  insurancePhone2: string;
  insuranceAddress2_2: string;
  insuranceCity2: string;
  insuranceState2: string;
  insuranceZip2: string;
  isValidInsurance2: string;
  insuranceSubscriber2: string;
  frontInsuranceCard2: string;
  backInsuranceCard2: string;

  constructor(insurance?: IInsurance) {
    this.insuranceCarrier = insurance?.insuranceCarrier || '';
    this.subscriberId = insurance?.subscriberId || '';
    this.hasInsurance = insurance?.hasInsurance || '';
    this.insuranceFirstName = insurance?.insuranceFirstName || '';
    this.insuranceLastName = insurance?.insuranceLastName || '';
    this.insuranceDob = insurance?.insuranceDob || '';
    this.insurancePhone = insurance?.insurancePhone || '';
    this.insuranceAddress = insurance?.insuranceAddress || '';
    this.insuranceAddress2 = insurance?.insuranceAddress2 || '';
    this.insuranceCity = insurance?.insuranceCity || '';
    this.insuranceState = insurance?.insuranceState || '';
    this.insuranceZip = insurance?.insuranceZip || '';
    this.isValidInsurance = insurance?.isValidInsurance || '';
    this.insuranceSubscriber = insurance?.insuranceSubscriber || '';
    this.frontInsuranceCard = insurance?.frontInsuranceCard || '';
    this.backInsuranceCard = insurance?.backInsuranceCard || '';

    // Additional insurance fields
    this.insuranceCarrier2 = insurance?.insuranceCarrier2 || '';
    this.subscriberId2 = insurance?.subscriberId2 || '';
    this.hasInsurance2 = insurance?.hasInsurance2 || '';
    this.insuranceFirstName2 = insurance?.insuranceFirstName2 || '';
    this.insuranceLastName2 = insurance?.insuranceLastName2 || '';
    this.insuranceDob2 = insurance?.insuranceDob2 || '';
    this.insurancePhone2 = insurance?.insurancePhone2 || '';
    this.insuranceAddress2_2 = insurance?.insuranceAddress2_2 || '';
    this.insuranceCity2 = insurance?.insuranceCity2 || '';
    this.insuranceState2 = insurance?.insuranceState2 || '';
    this.insuranceZip2 = insurance?.insuranceZip2 || '';
    this.isValidInsurance2 = insurance?.isValidInsurance2 || '';
    this.insuranceSubscriber2 = insurance?.insuranceSubscriber2 || '';
    this.frontInsuranceCard2 = insurance?.frontInsuranceCard2 || '';
    this.backInsuranceCard2 = insurance?.backInsuranceCard2 || '';
  }
}