import * as yup from "yup";

export const demographic = yup.object().shape({
  patientRace: yup.string().required("*Required field"),
  patientEthnicity: yup.string().required("*Required field"),
  patientMaritalStatus: yup.string().required("*Required field"),
  patientLanguage: yup.string().required("*Required field"),
  patientGender: yup.string().required("*Required field"),
});
