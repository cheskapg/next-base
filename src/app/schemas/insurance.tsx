import * as yup from 'yup';

export const insuranceSchema = yup.object().shape({
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
});
