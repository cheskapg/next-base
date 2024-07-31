import * as yup from 'yup';

export const doYouHaveInsuranceSchema = yup.object().shape({
  insuranceCarrier: yup.string().required("*Required field"),
  subscriberId: yup.string().required('*Required field'),
  hasInsurance: yup.string().required('*Required field'),

  
});
export const doYouHaveInsuranceSchema2 = yup.object().shape({
  // Additional Insurance Fields
  insuranceCarrier2: yup.string().required('*Required field'),
  subscriberId2: yup.string().required('*Required field'),
  hasInsurance2: yup.string().required('*Required field'),

});

export const subscriberSchema = yup.object().shape({
  // insuranceCarrier: yup.string().required("*Required field"),
  subscriberId: yup.string().required('*Required field'),
  hasInsurance: yup.string().required('*Required field'),
  insuranceFirstName: yup.string().required('*Required field'),
  insuranceLastName: yup.string().required('*Required field'),
  insuranceDob: yup.date()
  .required('*Required field')
  .max(new Date(), "Date can't be in the future"),
  insurancePhone: yup.string().required('*Required field'),
  insuranceCountry: yup.string().required('*Required field'),
  insuranceAddress: yup.string().required('*Required field'),
  insuranceAddress2_: yup.string(),
  insuranceCity: yup.string().required('*Required field'),
  insuranceState: yup.string().required('*Required field'),
  insuranceZip: yup.string().required('*Required field'),
  isValidInsurance: yup.string().required('*Required field'),
  insuranceSubscriber: yup.string().required('*Required field'),
  subscriberDob: yup
    .date()
    .required('*Required field')
    .max(new Date(), "Date can't be in the future"),

    //insurance card

    frontInsuranceCard: yup.string().required('*Upload Insurance Card'),
    backInsuranceCard: yup.string().required('*Upload Insurance Card'),
  // Additional Insurance Fields
  insuranceCarrier2: yup.string().required('*Required field'),
  subscriberId2: yup.string().required('*Required field'),
  hasInsurance2: yup.string().required('*Required field'),
  insuranceFirstName2: yup.string().required('*Required field'),
  insuranceLastName2: yup.string().required('*Required field'),
  insuranceDob2: yup.date()
  .required('*Required field')
  .max(new Date(), "Date can't be in the future"),
  insurancePhone2: yup.string().required('*Required field'),
  insuranceCountry2: yup.string().required('*Required field'),
  insuranceAddress2_2: yup.string(),
  insuranceAddress2: yup.string().required('*Required field'),
  insuranceCity2: yup.string().required('*Required field'),
  insuranceState2: yup.string().required('*Required field'),
  insuranceZip2: yup.string().required('*Required field'),
  subscriberDob2: yup.date()
  .required('*Required field')
  .max(new Date(), "Date can't be in the future"),
  isValidInsurance2: yup.string().required('*Required field'),
  insuranceSubscriber2: yup.string().required('*Required field'),
//insurance card
  frontInsuranceCard2: yup.string().required('*Upload Insurance Card'),
  backInsuranceCard2: yup.string().required('*Upload Insurance Card'),
});
export const subscriberSchema2 = yup.object().shape({
  
  // Additional Insurance Fields
  insuranceCarrier2: yup.string().required('*Required field'),
  subscriberId2: yup.string().required('*Required field'),
  hasInsurance2: yup.string().required('*Required field'),
  insuranceFirstName2: yup.string().required('*Required field'),
  insuranceLastName2: yup.string().required('*Required field'),
  insuranceDob2: yup.date()
  .required('*Required field')
  .max(new Date(), "Date can't be in the future"),
  insurancePhone2: yup.string().required('*Required field'),
  insuranceCountry2: yup.string().required('*Required field'),
  insuranceAddress2_2: yup.string(),
  insuranceAddress2: yup.string().required('*Required field'),
  insuranceCity2: yup.string().required('*Required field'),
  insuranceState2: yup.string().required('*Required field'),
  insuranceZip2: yup.string().required('*Required field'),
  subscriberDob2: yup.date()
  .required('*Required field')
  .max(new Date(), "Date can't be in the future"),
  isValidInsurance2: yup.string().required('*Required field'),
  insuranceSubscriber2: yup.string().required('*Required field'),
//insurance card
  frontInsuranceCard2: yup.string().required('*Upload Insurance Card'),
  backInsuranceCard2: yup.string().required('*Upload Insurance Card'),
});
