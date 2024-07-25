import * as yup from "yup";

export const insuranceSchema = yup.object().shape({
  hasInsurance: yup.string().required("*Required field"),
  isValidInsurance: yup.string(),
});
