/* eslint-disable @next/next/no-img-element */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
//   fetchGuarantorRegistrationById,
  fetchPatientRegistrationById,
  updateGuarantor,
} from "../actions/api";
import GlobalDropdowns from "../interface/GlobalDropdown";
import IGuarantor from "../interface/IGuarantor";
import GuarantorModel from "../models/Guarantor";
import RegionSpecificDetails from "../interface/RegionSpecificDetails";
import { formatPhoneNumber } from "../utils/helper";
import { useFormState } from "./FormContext";
import { states } from "../constants/constants";
import { guarantorSchema } from "../schemas/guarantor";
import { on } from "events";
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
  } = useFormState();

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    isValid,
    touched,
    setFieldValue,
    setSubmitting,
  } = useFormik({
    initialValues: {
      guarantorRelationship: guarantorData.guarantorRelationship || "",
      sameAsSubscriberDetails: "",
      firstName: guarantorData.firstName || "",
      lastName: guarantorData.lastName || "",
      sex: guarantorData.sex || "",
      dateOfBirth: guarantorData.dateOfBirth || "",
      phoneNumber: guarantorData.phoneNumber || "",
      sameAsPatientChkBox: "",
      addressLine1: guarantorData.addressLine1 || "",
      addressLine2: guarantorData.addressLine2 || "",
      city: guarantorData.city || "",
      state: guarantorData.state || "",
      zipCode: guarantorData.zipCode || "",
      country: guarantorData.state != "" ? "1" : "",
    },
    enableReinitialize: true,
    validationSchema: guarantorSchema,
    onSubmit: async (values: any) => {
      setSubmitting(false);
      onHandleFormSubmit(values);
    },
  });

  const onHandleFormSubmit = async (data: any) => {
    try {
      const response = await updateGuarantor(patientData.registrationId, data);
      console.log(JSON.stringify(response));
    //   fetchGuarantor();
      onHandleNext();
    } catch (error) {
      console.log(error);
      alert("Oops! Something went wrong. Please try again");
    }
  };

//   const fetchGuarantor = async () => {
//     console.log(patientData.registrationId);
//     const response = await fetchGuarantorRegistrationById(
//       patientData.registrationId
//     );
//     //console.log("Guarantor" + response);
//     setGuarantorData((prev: any) => ({
//       ...prev,
//       ...response,
//     }));
//   };

  useEffect(() => {
    // fetchGuarantor();
  }, []);

  useEffect(() => {
    if (values.sameAsPatientChkBox == "on") {
      setFieldValue("addressLine1", patientData.addressLine1);
      setFieldValue("addressLine2", patientData.addressLine2);
      setFieldValue("city", patientData.city);
      setFieldValue("state", patientData.state);
      setFieldValue("zipCode", patientData.zipCode);
    }
  }, [values.sameAsPatientChkBox, setFieldValue, patientData, guarantorData]);

  console.log(errors);

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
            defaultValue={values.guarantorRelationship}
            onChange={handleChange}
            className={`border ${errors.guarantorRelationship && touched.guarantorRelationship ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          >
            <option value="">-- Select an Option --</option>
            {/* {region.relations
              .filter((x) => x.guarantor_display && x.display != "Patient")
              .map((relation) => (
                <option value={relation.value} key={relation.display}>
                  {relation.display}
                </option>
              ))} */}
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
        <div className=" mt-4 relative items-center">
          <div className="flex gap-4">
            <div className="p-0.5 rounded-lg border border-poise-2 justify-center items-center inline-flex">
              <input
                id="sameAsSubscriberDetails"
                type="checkbox"
                checked={values.sameAsSubscriberDetails == "on"}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="rounded-md border-hidden p-0.5"
              ></input>
            </div>
            <label htmlFor="sameAsSubscriberDetails">
              Same as Insurance Subscriber Details
            </label>
          </div>
        </div>

        {/* First Name */}
        <div className="mt-4 relative items-center">
          <input
            id="firstName"
            placeholder=""
            value={values.firstName}
            onChange={handleChange}
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
              defaultValue={values.sex}
              onChange={handleChange}
              className={`border ${errors.sex && touched.sex ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
            >
              <option value="" disabled defaultValue={""}></option>
              {/* {region.genders
                .filter((x) => x.label != "Unknown")
                .map((gender) => (
                  <option value={gender.value} key={gender.id}>
                    {gender.label}
                  </option>
                ))} */}
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
                className={`border ${touched.dateOfBirth && errors.dateOfBirth ? "border-zest-6" : "border-poise-2"}   w-full  py-2 pt-6 rounded-lg appearance-none`}
                placeholder="mm/dd/yyyy"
              ></input>
              <label
                htmlFor="dateOfBirthLbl"
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
                checked={values.sameAsPatientChkBox == "on"}
                onChange={(e) => {
                  handleChange(e);
                }}
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
            defaultValue={values.country}
            onChange={(e) => {
              handleChange(e);
            }}
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
              defaultValue={values.state}
              onChange={handleChange}
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
