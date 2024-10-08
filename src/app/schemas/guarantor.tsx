import * as yup from "yup";

const zipCodeRegExp = /^[0-9]{5}/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const guarantorSchema = yup.object().shape({
  guarantorRelationship: yup.string().required("*Required field"),
  firstName: yup
    .string()
    .max(50, "First name must be at most 50 characters.")
    .required("Required field"),
  lastName: yup
    .string()
    .max(50, "Last name must be at most 50 characters.")
    .required("Required field"),
  sex: yup.string().notRequired(),
  dateOfBirth: yup
    .date()
    .transform((value: Date, originalValue: Date) => {
      return new Date(originalValue);
    })
    .min(new Date(1960, 1, 1), "Invalid Date of birth")
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Required field"),
  phoneNumber: yup
    .string()
    .max(12, "Not a valid phone number")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required field"),
  addressLine1: yup
    .string()
    .max(50, "Address must be at most 50 characters.")
    .required("Required field"),
  addressLine2: yup.string().when("country", {
    is: (country: string) => country === "0",
    then: () => yup.string().notRequired(),
    otherwise: () =>
      yup.string().max(50, "Must be at most 50 characters.").notRequired(),
  }),
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
