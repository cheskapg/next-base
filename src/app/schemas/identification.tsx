import * as yup from "yup";

export const identificationSchema = yup.object().shape({
  frontInsuranceCard: yup.string().required("*Required field"),
  backInsuranceCard: yup.string().required("*Required field"),
});
