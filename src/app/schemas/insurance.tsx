import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
  insuranceFirstName: yup.string().required('*Required field'),
  insuranceLastName: yup.string().required('*Required field'),
  insuranceDob: yup
  .date()
  .transform((value: Date, originalValue: Date) => {
    return new Date(originalValue);
  })
  .min(new Date(1960, 1, 1), "Invalid Date of birth")
  .max(new Date(), "Date of birth cannot be in the future")
  .required("Required field"),
  insurancePhone: yup
  .string()
  .max(12, "Not a valid phone number")
  .matches(phoneRegExp, "Phone number is not valid")
  .required("Required field"),
  insuranceAddress: yup.string().required('*Required field'),
  insuranceAddress2_: yup.string(),
  insuranceCity: yup.string().required('*Required field'),
  insuranceState: yup.string().required('*Required field'),
  insuranceZip: yup.string().required('*Required field'),
  insuranceSubscriber: yup.string().required('*Required field'),

    //insurance card

    // frontInsuranceCard: yup.string().required('*Upload Insurance Card'),
    // backInsuranceCard: yup.string().required('*Upload Insurance Card'),

});
export const subscriberSchema2 = yup.object().shape({
  
  // Additional Insurance Fields

  insuranceFirstName2: yup.string().required('*Required field'),
  insuranceLastName2: yup.string().required('*Required field'),
  insuranceDob2: yup.date()
  .transform((value: Date, originalValue: Date) => {
    return new Date(originalValue);
  })
  .min(new Date(1960, 1, 1), "Invalid Date of birth")
  .max(new Date(), "Date of birth cannot be in the future")
  .required("Required field"),
  insurancePhone2: yup
  .string()
  .max(12, "Not a valid phone number")
  .matches(phoneRegExp, "Phone number is not valid")
  .required("Required field"),
  insuranceAddress2_2: yup.string(),
  insuranceAddress2: yup.string().required('*Required field'),
  insuranceCity2: yup.string().required('*Required field'),
  insuranceState2: yup.string().required('*Required field'),
  insuranceZip2: yup.string().required('*Required field'),
  insuranceSubscriber2: yup.string().required('*Required field'),
//insurance card
  // frontInsuranceCard2: yup.string().required('*Upload Insurance Card'),
  // backInsuranceCard2: yup.string().required('*Upload Insurance Card'),
});
