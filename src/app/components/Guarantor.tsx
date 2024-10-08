/* eslint-disable @next/next/no-img-element */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  fetchGuarantorRegistrationById,
  updateGuarantor,
} from "../actions/api";
import GlobalDropdowns from "../interface/GlobalDropdowns";
import RegionSpecificDetails from "../interface/RegionSpecificDetails";
import { formatPhoneNumber } from "../utils/helper";
import { useFormState } from "./FormContext";
import { states } from "../constants/constants";
import { guarantorSchema } from "../schemas/guarantor";
import { json } from "stream/consumers";

export default function Guarantor({
  region,
  globalDropdowns,
}: {
  region: RegionSpecificDetails;
  globalDropdowns: GlobalDropdowns;
}) {
  const {
    onHandleNext,
    onHandleBack,
    patientData,
    setGuarantorData,
    guarantorData,
    insuranceData,
    steppedBack,
    setSteppedBack,
  } = useFormState();

  const initialGuarantor = {
    guarantorRelationship: "",
    sameAsSubscriberDetails: "",
    firstName: "",
    lastName: "",
    sex: "",
    dateOfBirth: "",
    phoneNumber: "",
    sameAsPatientChkBox: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  };

  const [guarantor, setGuarantor] = useState(initialGuarantor);

  const {
    values,
    setFieldValue,
    errors,
    handleSubmit,
    handleChange,
    isValid,
    touched,
    setSubmitting,
    handleBlur,
  } = useFormik({
    initialValues: {
      guarantorRelationship: guarantor?.guarantorRelationship || "",
      sameAsSubscriberDetails: "",
      firstName: guarantor?.firstName || "",
      lastName: guarantor?.lastName || "",
      sex: guarantor?.sex || "",
      dateOfBirth: guarantor?.dateOfBirth || "",
      phoneNumber: guarantor?.phoneNumber || "",
      sameAsPatientChkBox: "",
      addressLine1: guarantor?.addressLine1 || "",
      addressLine2: guarantor?.addressLine2 || "",
      city: guarantor?.city || "",
      state: guarantor?.state || "",
      zipCode: guarantor?.zipCode || "",
      country: guarantor?.state ? "1" : "",
    },
    enableReinitialize: true,
    validationSchema: guarantorSchema,
    onSubmit: async (values: any) => {
      setSubmitting(false);
      onHandleFormSubmit(values);
      onHandleNext();

      console.log(values, "values guarantor")
    },
  });
  const [sameAsPatient, setSameAsPatient] = useState(false);
  //has insurance check
  const hasInsurance = insuranceData[1]?.hasInsurance1;
  console.log(hasInsurance, "has insurance guarantor")
  const handleSameAsPatientChange = (e: any) => {
    setSameAsPatient(e.target.checked);
    fetchGuarantor();
    if (!e.target.checked) {
      // Clear the fields when the checkbox is unchecked
      setFieldValue(`sameAsPatientChkBox`, "");
      setFieldValue(`insuranceAddress`, "");
      setFieldValue(`insuranceAddress2_`, "");
      setFieldValue(`insuranceCity`, "");
      setFieldValue(`insuranceState`, "");
      setFieldValue(`insuranceZip`, "");
    }
  };
  useEffect(() => {
    if (sameAsPatient) {
      // Populate the fields when the checkbox is checked
      setFieldValue(`sameAsPatientChkBox`, "on");

      setFieldValue(`addressLine1`, patientData.addressLine1);
      setFieldValue(`city`, patientData.city);
      setFieldValue(`state`, patientData.state);
      setFieldValue(`zipCode`, patientData.zipCode);
    } else {
      // Clear the fields when the checkbox is unchecked
      setFieldValue(`addressLine1`, "");
      setFieldValue(`city`, "");
      setFieldValue(`state`, "");
      setFieldValue(`zipCode`, "");
    }
  }, [sameAsPatient]);
  const [sameAsSubscriber, setSameAsSubscriber] = useState(false);

  const handleSameAsSubscriberChange = (e: any) => {
    setSameAsSubscriber(e.target.checked);

    if (!e.target.checked) {
      // Clear the fields when the checkbox is unchecked

      setFieldValue(`sameAsSubscriberDetails`, "");
      setFieldValue(`firstName`, "");
      setFieldValue(`lastName`, "");
      setFieldValue(`dateOfBirth`, "");
      setFieldValue(`phoneNumber`, "");
    }
  };
  useEffect(() => {
    if (sameAsSubscriber) {
      // Populate the fields when the checkbox is checked
      setFieldValue(`sameAsSubscriberDetails`, "on");
      setFieldValue(`firstName`, insuranceData[1].insuranceFirstName);
      setFieldValue(`lastName`, insuranceData[1].insuranceLastName);
      setFieldValue(`dateOfBirth`, insuranceData[1].insuranceDob);
      setFieldValue(`phoneNumber`, insuranceData[1].insurancePhone);
    } else {
      // Clear the fields when the checkbox is unchecked
      setFieldValue(`firstName`, "");
      setFieldValue(`lastName`, "");
      setFieldValue(`dateOfBirth`, "");
      setFieldValue(`phoneNumber`, "");
    }
  }, [sameAsSubscriber, insuranceData]);

  const onHandleFormSubmit = async (data: any) => {
    try {
      const response = await updateGuarantor(patientData.registrationId, data);
      fetchGuarantor();

      onHandleNext();
    } catch (error) {
      console.log(error);
      alert("Oops! Something went wrong. Please try again");
    }
  };
  useEffect(() => {
    fetchGuarantor();
  }, []);

  useEffect(() => {
    if (steppedBack) {
      fetchGuarantor();
      setSteppedBack(false);
    }
  }, [steppedBack]);

  const fetchGuarantor = async () => {
    const response = await fetchGuarantorRegistrationById(
      patientData.patientId
    );
    setGuarantorData((prev: any) => ({
      ...prev,
      ...response,
    }));
    setGuarantor((prev: any) => ({
      ...prev,
      ...response,
    }));
  };
  return (
    <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
      <div className="pt-6 px-6 flex flex-col">
        <div className="text-xl">Guarantor Details</div>
      </div>
      <div className="p-4 flex flex-1 flex-col">
        {/* Patients Relationship  */}
        <div className=" mt-4 relative items-center">
          <select
            id="guarantorRelationship"
            name="guarantorRelationship"
            value={values.guarantorRelationship}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`border ${errors.guarantorRelationship && touched.guarantorRelationship ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          >
            <option value="">-- Select an Option --</option>
            {region.relations
              .filter((x) => x.guarantor_display && x.display != "Patient")
              .map((relation) => (
                <option value={relation.value} key={relation.display}>
                  {relation.display}
                </option>
              ))}
          </select>
          <label
            htmlFor="guarantorRelationship"
            className={`absolute top-0 left-0 ${touched.guarantorRelationship && errors.guarantorRelationship ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-4`}
          >
            Relationship to the Patient{" "}
            <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.guarantorRelationship &&
              (errors.guarantorRelationship as string)}
          </div>
        </div>

        {/* Same as Insurance Detail  */}

        {hasInsurance === "1" && (
        <div className=" mt-4 relative items-center">
          <div className="flex gap-4">
            <div className="p-0.5 rounded-lg border border-poise-2 justify-center items-center inline-flex">
              <input
                id="sameAsSubscriberDetails"
                type="checkbox"
                checked={values.sameAsSubscriberDetails == "on"}
                onChange={handleSameAsSubscriberChange}
                className="rounded-md border-hidden p-0.5"
              ></input>
            </div>
            <label htmlFor="sameAsSubscriberDetails">
              Same as Insurance Subscriber Details
            </label>
          </div>
        </div>
        )}

        {/* First Name */}
        <div className="mt-4 relative items-center">
          <input
            id="firstName"
            placeholder=""
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            name="firstName"
            className={`border ${errors.firstName && touched.firstName ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          />

          <label
            htmlFor="firstName"
            className={`absolute top-0 left-0 ${touched.firstName && errors.firstName ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-4`}
          >
            Guarantor&apos;s Legal First Name{" "}
            <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.firstName && (errors.firstName as string)}
          </div>
        </div>

        {/* Last Name */}
        <div className="mt-4 relative items-center">
          <input
            id="lastName"
            placeholder=""
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            name="lastName"
            className={`border ${errors.lastName && touched.lastName ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          />

          <label
            htmlFor="lastName"
            className={`absolute top-0 left-0 ${touched.lastName && errors.lastName ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-4`}
          >
            Guarantor&apos;s Last Name{" "}
            <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.lastName && (errors.lastName as string)}
          </div>
        </div>

        {/*Gender */}

        <div className="flex mt-4">
          <div className=" w-2/5 relative">
            <select
              name="sex"
              id="sex"
              value={values.sex}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border ${errors.sex && touched.sex ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
            >
              <option value="" disabled defaultValue={""}></option>
              {region.genders
                .filter((x) => x.label != "Unknown")
                .map((gender) => (
                  <option value={gender.value} key={gender.id}>
                    {gender.label}
                  </option>
                ))}
            </select>
            <label
              htmlFor="sex"
              className={`absolute top-0 left-0 ${touched.sex && errors.sex ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-4`}
            >
              Sex
            </label>
            <div className={`text-zest-6 text-xs font-normal `}>
              {touched.sex && (errors.sex as string)}
            </div>
          </div>

          <div className="w-3/4 ">
            <div className="pl-4  w-full relative flex">
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={values.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border ${touched.dateOfBirth && errors.dateOfBirth ? "border-zest-6" : "border-poise-2"}   w-full  py-2 pt-6 rounded-lg appearance-none`}
                placeholder="mm/dd/yyyy"
              ></input>
              <label
                htmlFor="dateOfBirth"
                className={`absolute top-0 left-0  text-xs mt-2 ml-7 ${touched.dateOfBirth && errors.dateOfBirth ? "text-zest-6" : "text-black-4"}`}
              >
                Date of Birth{" "}
                <span className={`text-zest-6 text-xs font-normal `}>*</span>
              </label>
              <img
                alt="Calendar"
                src="../assets/images/Calendar.svg"
                className="absolute right-0 top-0 mt-[29px] z-10 mr-[15px] items-end justify-end w-4"
              ></img>
            </div>
            <div className={`text-zest-6 text-xs font-normal pl-4`}>
              {touched.dateOfBirth && (errors.dateOfBirth as string)}
            </div>
          </div>
        </div>

        {/*Phone */}
        <div>
          <div className="flex mt-4">
            <div className="relative w-full ">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formatPhoneNumber(values.phoneNumber)}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=""
                className={`${touched.phoneNumber && errors.phoneNumber ? "border-zest-6" : "border-poise-2"} w-full px-4 pt-6 py-2 rounded-lg`}
              ></input>
              <label
                className={`absolute top-0 left-0 ${touched.phoneNumber && errors.phoneNumber ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-4`}
              >
                Phone Number{" "}
                <span className={`text-zest-6 text-xs font-normal `}>*</span>
              </label>
            </div>
          </div>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.phoneNumber && (errors.phoneNumber as string)}
          </div>
        </div>

        {/* Same as Patient */}

        <div className=" mt-4 relative items-center">
          <div className="flex gap-4">
            <div className="p-0.5 rounded-lg border border-poise-2 justify-center items-center inline-flex">
              <input
                id="sameAsPatientChkBox"
                type="checkbox"
                value={values.sameAsPatientChkBox}
                checked={values.sameAsPatientChkBox == "on"}
                onChange={handleSameAsPatientChange}
                className="rounded-md border-hidden p-0.5"
              ></input>
            </div>
            <label htmlFor="sameAsPatientChkBox">Same address as patient</label>
          </div>
        </div>

        {/* Country */}
        <div className="mt-4 relative items-center">
          <select
            id="country"
            name="country"
            value={values.country}
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={handleBlur}
            className={`border ${errors.country && touched.country ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          >
            <option value="">-- Select an Option --</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <label
            htmlFor="country"
            className={`absolute top-0 left-0 ${touched.country && errors.country ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-4`}
          >
            Do you live in the United States?{" "}
            <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.country && (errors.country as string)}
          </div>
        </div>

        {/* Address */}
        <div className="mt-4 relative">
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={values.addressLine1}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=""
            className={`border ${errors.addressLine1 && touched.addressLine1 ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          />
          <label
            htmlFor="addressLine1"
            className={`absolute top-0 left-0 ${touched.addressLine1 && errors.addressLine1 ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-4`}
          >
            Address{" "}
            <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.addressLine1 && (errors.addressLine1 as string)}
          </div>
        </div>

        {/* Address2 */}
        <div className="mt-4 relative">
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={values.addressLine}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=""
            className={`border ${errors.addressLine2 && touched.addressLine2 ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          />
          <label
            htmlFor="addressLine2"
            className={`absolute top-0 left-0 ${touched.addressLine2 && errors.addressLine2 ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-4`}
          >
            Apt. Suite, Unit, (Optional)
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.addressLine2 && (errors.addressLine2 as string)}
          </div>
        </div>

        {/* City */}
        <div className="mt-4 relative">
          <input
            type="text"
            id="city"
            name="city"
            placeholder=""
            disabled={
              values.country == 1 || values.country === "" ? false : true
            }
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
            className={`border ${errors.city && touched.city ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          />
          <label
            htmlFor="city"
            className={`absolute top-0 left-0 ${touched.city && errors.city ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-4`}
          >
            City <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.city && (errors.city as string)}
          </div>
        </div>

        {/* State */}
        <div className="flex mt-4">
          <div className="relative w-3/5">
            <select
              name="state"
              id="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={
                values.country == 1 || values.country === "" ? false : true
              }
              className={`border ${errors.state && touched.state ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
            >
              <option value="">-- State --</option>
              {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.abbreviation}
                </option>
              ))}
            </select>
            <label
              className={`absolute top-0 left-0 ${touched.state && errors.state ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-4`}
            >
              State{" "}
              <span className={`text-zest-6 text-xs font-normal `}>*</span>
            </label>
            <div className={`text-zest-6 text-xs font-normal `}>
              {touched.state && (errors.state as string)}
            </div>
          </div>
          <div className="relative w-3/4 pl-4">
            <input
              type="text"
              placeholder=""
              id="zipCode"
              name="zipCode"
              value={values.zipCode}
              disabled={
                values.country == 1 || values.country === "" ? false : true
              }
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border ${errors.zipCode && touched.zipCode ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
            ></input>
            <label
              className={`absolute top-0 left-0 ${touched.zipCode && errors.zipCode ? "text-zest-6" : "text-black-4"} text-xs mt-2 ml-7`}
            >
              Zip / Postal Code{" "}
              <span className={`text-zest-6 text-xs font-normal `}>*</span>
            </label>
            <div className={`text-zest-6 text-xs font-normal `}>
              {touched.zipCode && (errors.zipCode as string)}
            </div>
          </div>
        </div>
      </div>
      {/* Action */}
      <div className={`flex p-4 items-end gap-4 `}>
        <div className="w-2/6 ">
          <button
            id="back"
            onClick={onHandleBack}
            className={` w-full rounded-3xl text-black text-center h-10 py-2 border-slate-600 border-2  `}
          >
            Back
          </button>
        </div>
        <div className="w-4/6">
          <button
            id="submit"
            type="submit"
            className={` w-full  rounded-3xl text-white text-center py-2  bg-spruce-4 ${isValid ? "" : "pointer-events-none opacity-50"}`}
            disabled={isValid ? false : true}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}
