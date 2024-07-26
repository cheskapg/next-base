import * as yup from "yup";

export const insuranceSchema = yup.object().shape({
  insuranceCarrier: yup.string().required("*Required field"),
  subscriberId: yup.string().required("*Required field"),
  hasInsurance: yup.string().required("*Required field"),
  insuranceFirstName: yup.string().required("*Required field"),
  insuranceLastName: yup.string().required("*Required field"),
  insuranceDob: yup.string().required("*Required field"),
  insurancePhone: yup.string().required("*Required field"),
  insuranceCountry: yup.string().required("*Required field"),
  insuranceAddress: yup.string().required("*Required field"),
  insuranceAddress2: yup.string(),
  insuranceCity: yup.string().required("*Required field"),
  insuranceState: yup.string().required("*Required field"),
  insuranceZip: yup.string().required("*Required field"),
  isValidInsurance: yup.string(),
  insuranceSubscriber: yup.string().required("*Required field"),
  subscriberDob: yup.string().required("*Required field"),

  // Additional Insurance Fields
  insuranceCarrier2: yup.string(),
  subscriberId2: yup.string(),
  hasInsurance2: yup.string(),
  insuranceFirstName2: yup.string(),
  insuranceLastName2: yup.string(),
  insuranceDob2: yup.string(),
  insurancePhone2: yup.string(),
  insuranceCountry2: yup.string(),
  insuranceAddress2_2: yup.string(),
  insuranceCity2: yup.string(),
  insuranceState2: yup.string(),
  insuranceZip2: yup.string(),
  subscriberDob2: yup.string(),
  isValidInsurance2: yup.string(),
  insuranceSubscriber2: yup.string(),
});