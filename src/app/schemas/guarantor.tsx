import * as yup from "yup";

const zipCodeRegExp = /^[0-9]{5}/;

export const guarantorSchema = yup.object().shape({
  guarantorRelationship: yup.string().required("*Required field"),
  firstName: yup.string().required("*Required field"),
  lastName: yup.string().required("*Required field"),
  sex: yup.string().notRequired(),
  dateOfBirth: yup.string().required("*Required field"),
  phoneNumber: yup.string().notRequired(),
  addressLine1: yup.string().required("*Required field"),
  addressLine2: yup.string().notRequired(),
  country: yup.string().required("*Required field"),
  city: yup
    .string()
    .max(50)
    .when("country", {
      is: (country: string) => country === "0" || country === "",
      then: () => yup.string().notRequired(),
      otherwise: () =>
        yup
          .string()
          .max(50, "City must be at most 50 characters.")
          .required("Required field"),
    }),
  state: yup.string().when("country", {
    is: (country: string) => country === "0" || country === "",
    then: () => yup.string().notRequired(),
    otherwise: () =>
      yup
        .string()
        .max(50, "State must be at most 50 characters.")
        .required("Required field"),
  }),
  zipCode: yup.string().when("country", {
    is: (country: string) => country === "0" || country === "",
    then: () => yup.string().notRequired(),
    otherwise: () =>
      yup
        .string()
        .length(5, "Invalid Zip")
        .min(5, "Invalid Zip")
        .matches(zipCodeRegExp, "Invalid Zip")
        .required("Required field"),
  }),
});
