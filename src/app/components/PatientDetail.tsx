"use client";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useFormState } from "./FormContext";
import { patientSchema } from "../schemas/patient";
import { suffixes, states } from "../constants/constants";
import { useFormik } from "formik";
import { formatPhoneNumber } from "../utils/helper";
import {
  fetchPatientRegistrationById,
  updatePatientDetails,
} from "../actions/api";
import { mapFromPatient } from "../utils/mapper";
import { useEffect, useState } from "react";

export default function PatientDetail({
  patient,
  patientId,
}: {
  patient: any;
  patientId: number;
}) {
  const { onHandleNext, patientData, setPatientData, step } = useFormState();

  const suffixList = suffixes;
  const stateList = states;

  const { values, errors, handleSubmit, handleChange, isValid, setSubmitting } =
    useFormik({
      initialValues: {
        firstName: patientData ? patientData.firstName : "",
        lastName: patientData ? patientData.lastName : "",
        suffix: patientData ? patientData.suffix : "",
        dateOfBirth: patientData ? patientData.dateOfBirth : "",
        phoneNumber: patientData ? patientData.phoneNumber : "",
        email: patientData ? patientData.email : "",
        country: 1,
        addressLine1: patientData ? patientData.addressLine1 : "",
        addressLine2: patientData ? patientData.addressLine2 : "",
        city: patientData ? patientData.city : "",
        state: patientData ? patientData.state : "",
        zipCode: patientData ? patientData.zipCode : "",
        patientGender: patientData.sex,
        patientId: patientData.patientId,
        registrationId: patientData.registrationId,
      },

      enableReinitialize: true,
      validationSchema: patientSchema,
      //validateOnMount: true,
      onSubmit: async (values: any) => {
        setSubmitting(false);
        onHandleFormSubmit(values);
      },
    });

  const onHandleFormSubmit = async (data: any) => {
    try {
      data.patientId = patientId;
      const response = await updatePatientDetails(data, step);
      const patient = await fetchPatientRegistrationById(patientId);
      setPatientData((prev: any) => ({
        ...prev,
        ...patient,
      }));

      onHandleNext();
    } catch (error) {
      console.log(error);
      alert("Oops! Something went wrong. Please try again");
    }
  };

  const handleNonUSPatient = (e: any) => {
    const { name, value } = e.target;

    console.log(`Name: ${name} Value: ${value}`);
  };
  const isFormValid = () => {
    let valid =
      values.address != "" ||
      values.city != "" ||
      values.state != "" ||
      values.zip != ""
        ? true
        : false;

    //console.log("Isvalid: " + isValid + " IsformValid: " + valid);
    //console.log(errors);
    return valid;
  };

  useEffect(() => {
    const callFetch = async () => {
      const patient = await fetchPatientRegistrationById(patientId);
      setPatientData((prev: any) => ({
        ...prev,
        ...patient,
      }));
    };
    callFetch();
  }, []);

  return (
    <form
      id="patientDetailForm"
      name="patientDetailForm"
      onSubmit={handleSubmit}
    >
      <div className="p-6">
        <div className="text-xl">Patient&apos;s Details</div>

        {/*FirstName*/}
        <div>
          <div className="mt-4 relative">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              //maxLength={50}
              placeholder="John"
              className={`border ${errors.firstName ? "border-zest-6" : "border-poise-2"}  w-full px-4 py-2 pt-6 rounded-lg `}
            />
            <label
              htmlFor="firstName"
              className={`absolute top-0 left-0 text-black-4  
              text-xs mt-2 ml-4 ${errors.firstName ? "text-zest-6" : ""} `}
            >
              Patient&apos;s Legal First Name{" "}
              <span className={`text-zest-6 text-xs font-normal `}>*</span>
            </label>
          </div>
          <div className={`text-zest-6 text-xs font-normal `}>
            {errors.firstName as string}
          </div>
        </div>

        {/*LastName*/}
        <div>
          <div className="mt-4 relative">
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={values.lastName}
              onChange={handleChange}
              // maxLength={50}
              placeholder="Doe"
              className={`border ${errors.lastName ? "border-zest-6" : "border-poise-2"}  w-full px-4 py-2 pt-6 rounded-lg `}
            />
            <label
              htmlFor="lastName"
              className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4 ${errors.lastName ? "text-zest-6" : ""}`}
            >
              Patient&apos;s Last Name{" "}
              <span className={`text-zest-6 text-xs font-normal `}>*</span>
            </label>
          </div>
          <div className={`text-zest-6 text-xs font-normal `}>
            {errors.lastName as string}
          </div>
        </div>

        {/*Suffix */}

        <div className="flex mt-4">
          <div className=" w-2/5 relative">
            <select
              name="suffix"
              id="suffix"
              defaultValue={values.suffix}
              onChange={handleChange}
              className={`border border-poise-2 w-full  px-4 py-2 pt-6 rounded-lg `}
            >
              <option value="" disabled defaultValue={""}></option>
              {suffixList.map((suffix) => (
                <option value={suffix} key={suffix}>
                  {suffix}
                </option>
              ))}
            </select>
            <label
              htmlFor="suffix"
              className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
            >
              Suffix
            </label>
          </div>

          <div className="w-3/4 ">
            <div className="pl-4  w-full relative flex">
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={values.dateOfBirth}
                onChange={handleChange}
                className={`border ${errors.dateOfBirth ? "border-zest-6" : "border-poise-2"}   w-full  py-2 pt-6 rounded-lg appearance-none`}
                placeholder="mm/dd/yyyy"
              ></input>
              <label
                htmlFor="dateOfBirthLbl"
                className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-7 ${errors.dateOfBirth ? "text-zest-6" : ""}`}
              >
                Patient&apos;s Date of Birth{" "}
                <span className={`text-zest-6 text-xs font-normal `}>*</span>
              </label>
              <img
                src="../assets/images/Calendar.svg"
                className="absolute right-0 top-0 mt-[29px] mr-[15px] items-end justify-end w-4"
              ></img>
            </div>
            <div className={`text-zest-6 text-xs font-normal pl-4`}>
              {errors.dateOfBirth as string}
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
                placeholder="(555) 555-5555"
                className={`${errors.phoneNumber ? "border-zest-6" : "border-poise-2"} w-full px-4 pt-6 py-2 rounded-lg`}
              ></input>
              <label
                className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4 ${errors.phoneNumber ? "text-zest-6" : ""}`}
              >
                Phone Number{" "}
                <span className={`text-zest-6 text-xs font-normal `}>*</span>
              </label>
            </div>
          </div>
          <div className={`text-zest-6 text-xs font-normal `}>
            {errors.phoneNumber as string}
          </div>
        </div>

        {/* Email */}
        <div>
          <div className="mt-4 relative">
            <input
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              className={`border ${errors.email ? "border-zest-6" : "border-poise-2"}  w-full px-4 py-2 pt-6 rounded-lg`}
            />
            <label
              htmlFor="email"
              className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4 ${errors.email ? "text-zest-6" : ""}`}
            >
              {"Email "}
              <span className={`text-zest-6 text-xs font-normal `}>*</span>
            </label>
          </div>
          <div className={`text-zest-6 text-xs font-normal `}>
            {errors.email as string}
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
              handleNonUSPatient(e);
            }}
            className={`border ${errors.country ? "text-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          >
            <option value="">-- Select an Option --</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <label
            htmlFor="country"
            className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4  ${errors.country ? "text-zest-6" : ""}`}
          >
            Do you live in the United States?
          </label>
        </div>

        {/* Address */}
        <div>
          <div className="mt-4 relative">
            <input
              type="text"
              id="addressLine1"
              //  maxLength={50}
              name="addressLine1"
              value={values.addressLine1}
              onChange={handleChange}
              placeholder="999 High Garden"
              className={`border ${errors.addressLine1 ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
            />
            <label
              htmlFor="addressLine1"
              className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4 ${errors.addressLine1 ? "text-zest-6" : ""}`}
            >
              Address{" "}
              <span className={`text-zest-6 text-xs font-normal `}>*</span>
            </label>
          </div>
          <div className={`text-zest-6 text-xs font-normal `}>
            {errors.addressLine1 as string}
          </div>
        </div>

        {/* Address2 */}
        <div>
          <div className="mt-4 relative">
            <input
              type="text"
              id="addressLine2"
              //   maxLength={50}
              name="addressLine2"
              value={
                values.country == 0 || values.country == ""
                  ? ""
                  : values.addressLine2
              }
              onChange={handleChange}
              placeholder="#1"
              className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
            />
            <label
              htmlFor="address2"
              className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
            >
              Apt, Suite, Unit (Optional)
            </label>
          </div>
          <div className={`text-zest-6 text-xs font-normal `}>
            {errors.addressLine2 as string}
          </div>
        </div>

        {/* City */}
        <div>
          <div className="mt-4 relative">
            <input
              type="text"
              id="city"
              name="city"
              //    maxLength={50}
              value={
                values.country === 0 || values.country === "" ? "" : values.city
              }
              disabled={
                values.country == 1 || values.country === "" ? false : true
              }
              onChange={handleChange}
              placeholder="City"
              className={`border ${errors.city ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
            />
            <label
              htmlFor="city"
              className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4 ${errors.city ? "text-zest-6" : ""}`}
            >
              City <span className={`text-zest-6 text-xs font-normal `}>*</span>
            </label>
          </div>
          <div className={`text-zest-6 text-xs font-normal `}>
            {errors.city as string}
          </div>
        </div>

        {/* State */}

        <div className="flex mt-4">
          <div className="w-4/5">
            <div className="relative w-full ">
              <select
                name="state"
                id="state"
                value={
                  values.country === 0 || values.country === ""
                    ? ""
                    : values.state
                }
                disabled={
                  values.country == 1 || values.country === "" ? false : true
                }
                onChange={handleChange}
                className={`${errors.state ? "border-zest-6" : "border-poise-2"} w-full px-4 pt-6 py-2 rounded-lg`}
              >
                <option value="">-- State --</option>
                {stateList.map((state) => (
                  <option key={state.abbreviation} value={state.abbreviation}>
                    {state.abbreviation}
                  </option>
                ))}
              </select>
              <label
                className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4 ${errors.state ? "text-zest-6" : ""}`}
              >
                State{" "}
                <span className={`text-zest-6 text-xs font-normal `}>*</span>
              </label>
            </div>
            <div className={`text-zest-6 text-xs font-normal `}>
              {errors.state as string}
            </div>
          </div>
          <div className="w-3/4">
            <div className="relative w-full pl-4">
              <input
                type="text"
                placeholder=""
                id="zipCode"
                maxLength={5}
                name="zipCode"
                onChange={handleChange}
                value={
                  values.country == 0 || values.country === ""
                    ? ""
                    : values.zipCode
                }
                disabled={
                  values.country == 1 || values.country === "" ? false : true
                }
                className={`${errors.zipCode ? "border-zest-6" : "border-poise-2"} w-full px-4 pt-6 py-2 rounded-lg`}
              ></input>
              <label
                className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-8 ${errors.zipCode ? "text-zest-6" : ""}`}
              >
                Zip / Postal Code{" "}
                <span className={`text-zest-6 text-xs font-normal `}>*</span>
              </label>
            </div>
            <div className={`text-zest-6 text-xs font-normal pl-4`}>
              {errors.zipCode as string}
            </div>
          </div>
        </div>
        {/* Submit */}
        <div className="py-4">
          {/* <Link href="/insurance"> */}
          <button
            id="submit"
            type="submit"
            className={`w-full rounded-3xl text-white text-center py-2  bg-spruce-4  ${isFormValid() && isValid ? "" : "pointer-events-none opacity-50"}`}
            disabled={isValid && isFormValid() ? false : true}
          >
            Next
          </button>
          {/* </Link> */}
        </div>
      </div>
    </form>
  );
}
