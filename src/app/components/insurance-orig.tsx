/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable spaced-comment */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable lines-around-directive */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
// import Link from "@/node_modules/next/link";
import { useFormik } from "formik";
import { useFormState } from "./FormContext";
// import { insuranceSchema } from "../schemas/insurance";
// import { loadUploadedImage } from "../utils/helper";

export default function Insurance() {
  const { onHandleNext, onHandleBack, setPatientData, patientData } =
    useFormState();
//   console.log("insurance " + patientData);

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      insuranceCarrier: patientData ? patientData.insuranceCarrier : "",
      subscriberId: patientData ? patientData.subscriberId : "",
      hasInsurance: patientData ? patientData.hasInsurance : "",
      insuranceFirstName: patientData ? patientData.insuranceFirstName : "",
      insuranceLastName: patientData ? patientData.insuranceLastName : "",
      insuranceDob: patientData ? patientData.insuranceDob : "",
      insurancePhone: patientData ? patientData.insurancePhone : "",
      insuranceCountry: patientData ? patientData.insuranceCountry : "",
      insuranceAddress: patientData ? patientData.insuranceAddress : "",
      insuranceAddress2: patientData ? patientData.insuranceAddress2 : "",
      insuranceCity: patientData ? patientData.insuranceCity : "",
      insuranceState: patientData ? patientData.insuranceState : "",
      insuranceZip: patientData ? patientData.insuranceZip : "",
      isValidInsurance: patientData ? patientData.isValidInsurance : "false",
      insuranceSubscriber: patientData ? patientData.insuranceSubscriber : "",
    },

    // validationSchema: insuranceSchema,
    onSubmit: (values: any) => {
      onHandleFormSubmit(values);
    },
  });

  type TFormValues = {
    insuranceCarrier: "";
    subscriberId: "";
    hasInsurance: "";
    insuranceFirstName: "";
    insuranceLastName: "";
    insuranceDob: "";
    insurancePhone: "";
    insuranceCountry: "";
    insuranceAddress: "";
    insuranceAddress2: "";
    insuranceCity: "";
    insuranceState: "";
    insuranceZip: "";
  };

  const onHandleFormSubmit = (data: TFormValues) => {
    //setPatientData((prev: any) => ({ ...prev, ...data }));
    console.log(`test${ JSON.stringify(data)}`);
    onHandleNext();
  };

  const handleWithInsurance = (e: any) => {
    values.isValidInsurance = "true";
    console.log(`test${ values.isValidInsurance}`);
    //handleChange(values.isValidInsurance);
    console.log(values.isValidInsurance);
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen ">
      <div
        className={`p-6 flex flex-col flex-1 ${values.insuranceSubscriber === "1" || values.insuranceSubscriber === undefined ? "h-screen" : "h-full"} `}
      >
          <div className="text-xl ">Do you have health Insurance?</div>

        {/* Validation Status */}
        <div
          className={`${values.isValidInsurance !== "true" ? "hidden" : "block"}`}
        >
          <div className="mt-4 bg-emerald-50 rounded border border-emerald-50 justify-center items-center gap-10">
            <div className=" py-3 text-center text-sm font-bold text-status-green-text">
              Your insurance has been validated.
            </div>
          </div>
        </div>

        {/* Do you have insurance */}
        <div className=" flex flex-col">
          <div className="mt-4 relative items-center">
            <select
              id="hasInsurance"
              name="hasInsurance"
              value={
                values.hasInsurance === "0" || values.hasInsurance === ""
                  ? ""
                  : values.hasInsurance
              }
              onChange={handleChange}
              className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
            >
              <option value="">-- Select an option --</option>
              <option value="1">Yes, I have insurance.</option>
              <option value="0">No, I don&apos;t have insurance.</option>
            </select>
            <label
              htmlFor="hasInsurance"
              className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
            >
              Do you have insurance?
            </label>
          </div>
          <div className={`text-zest-6 text-xs font-normal `}>
            {errors.hasInsurance as string}
          </div>
        </div>
        {/* Carrier Section*/}
        <div
          id="carrierSection"
          className={`h-full flex flex-col flex-1 ${values.hasInsurance !== "1" ? "hidden" : "block"}`}
        >
          {/* Who is the insurance carrier */}
          <div className="mt-4 relative items-center">
            <div>
              <select
                id="insuranceCarrier"
                name="insuranceCarrier"
                value={values.insuranceCarrier}
                onChange={handleChange}
                className={`border  w-full px-4 py-2 pt-6 rounded-lg ${values.isValidInsurance !== "true" ? "border-poise-2" : "border-green-1"}`}
              >
                <option value="Cigna HMO/PPO">Cigna HMO/PPO</option>
                <option value="Kaiser Permanente">Kaiser Permanente</option>
              </select>
              <svg
                className={`absolute  bg-green-1 rounded-full bg-slate-200  left-[85%]  top-4  text-xs mt-2 ${values.isValidInsurance !== "true" ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M12.4732 4.8067C12.4112 4.74421 12.3375 4.69461 12.2563 4.66077C12.175 4.62692 12.0879 4.6095 11.9999 4.6095C11.9119 4.6095 11.8247 4.62692 11.7435 4.66077C11.6623 4.69461 11.5885 4.74421 11.5266 4.8067L6.55989 9.78003L4.47322 7.6867C4.40887 7.62454 4.33291 7.57566 4.24967 7.54286C4.16644 7.51006 4.07755 7.49397 3.9881 7.49552C3.89865 7.49706 3.81037 7.51622 3.72832 7.55188C3.64627 7.58754 3.57204 7.63902 3.50989 7.70336C3.44773 7.76771 3.39885 7.84367 3.36605 7.92691C3.33324 8.01014 3.31716 8.09903 3.31871 8.18848C3.32025 8.27793 3.3394 8.36621 3.37507 8.44826C3.41073 8.53031 3.4622 8.60454 3.52655 8.6667L6.08655 11.2267C6.14853 11.2892 6.22226 11.3388 6.3035 11.3726C6.38474 11.4065 6.47188 11.4239 6.55989 11.4239C6.64789 11.4239 6.73503 11.4065 6.81627 11.3726C6.89751 11.3388 6.97124 11.2892 7.03322 11.2267L12.4732 5.7867C12.5409 5.72427 12.5949 5.6485 12.6318 5.56417C12.6688 5.47983 12.6878 5.38876 12.6878 5.2967C12.6878 5.20463 12.6688 5.11356 12.6318 5.02923C12.5949 4.94489 12.5409 4.86912 12.4732 4.8067Z"
                  fill="#32936F"
                />
              </svg>
            </div>
            <label
              htmlFor="insuranceCarrier"
              className={`absolute top-0 left-0 text-xs mt-2 ml-4 ${values.isValidInsurance !== "true" ? "text-black-4" : "text-green-1"}`}
            >
              Who is the insurance carrier?
            </label>
          </div>
          <div>
            {/* Subscriber */}
            <div className="mt-4 relative items-center">
              <div className="flex ">
                <input
                  id="subscriberId"
                  placeholder="Subscriber ID"
                  value={values.subscriberId}
                  onChange={handleChange}
                  name="subscriberId"
                  className={`border ${values.isValidInsurance !== "true" ? "border-poise-2" : "border-green-1"} w-full px-4 py-2 pt-6 rounded-lg`}
                />
                <svg
                  className={`absolute  bg-green-1 rounded-full bg-slate-200  left-[90%]  top-4  text-xs mt-2 ${values.isValidInsurance !== "true" ? "hidden" : "block"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12.4732 4.8067C12.4112 4.74421 12.3375 4.69461 12.2563 4.66077C12.175 4.62692 12.0879 4.6095 11.9999 4.6095C11.9119 4.6095 11.8247 4.62692 11.7435 4.66077C11.6623 4.69461 11.5885 4.74421 11.5266 4.8067L6.55989 9.78003L4.47322 7.6867C4.40887 7.62454 4.33291 7.57566 4.24967 7.54286C4.16644 7.51006 4.07755 7.49397 3.9881 7.49552C3.89865 7.49706 3.81037 7.51622 3.72832 7.55188C3.64627 7.58754 3.57204 7.63902 3.50989 7.70336C3.44773 7.76771 3.39885 7.84367 3.36605 7.92691C3.33324 8.01014 3.31716 8.09903 3.31871 8.18848C3.32025 8.27793 3.3394 8.36621 3.37507 8.44826C3.41073 8.53031 3.4622 8.60454 3.52655 8.6667L6.08655 11.2267C6.14853 11.2892 6.22226 11.3388 6.3035 11.3726C6.38474 11.4065 6.47188 11.4239 6.55989 11.4239C6.64789 11.4239 6.73503 11.4065 6.81627 11.3726C6.89751 11.3388 6.97124 11.2892 7.03322 11.2267L12.4732 5.7867C12.5409 5.72427 12.5949 5.6485 12.6318 5.56417C12.6688 5.47983 12.6878 5.38876 12.6878 5.2967C12.6878 5.20463 12.6688 5.11356 12.6318 5.02923C12.5949 4.94489 12.5409 4.86912 12.4732 4.8067Z"
                    fill="#32936F"
                  />
                </svg>
              </div>

              <label
                htmlFor="subscriberId"
                className={`absolute top-0 left-0  text-xs mt-2 ml-4 ${values.isValidInsurance !== "true" ? "text-black-4" : "text-green-1"}`}
              >
                Subscriber Id
              </label>
            </div>
            <div className=" text-black-2 text-sm">
              This is NOT group, issuer, or RX number and may contain letters
              and numbers.
            </div>
          </div>

          {/* Validate */}
          <div
            className={`py-4  ${values.isValidInsurance !== "true" ? "block" : "hidden"}`}
          >
            <button
              id="validate"
              type="button"
              onClick={(e) => {
                handleWithInsurance(e);
                handleChange(e);
              }}
              className={` w-full rounded-3xl text-white text-center py-2  bg-spruce-4 `}
            >
              Validate Insurance
            </button>
          </div>
        </div>

        {/* Subscriber Section*/}
        <div
          id="subsciberSection"
          className={`mt-4 mb-4 h-full flex flex-col flex-1 ${console.log(values.isValidInsurance)} ${values.isValidInsurance !== "true" ? "hidden" : "block"}`}
        >
          {/* Who is the subscriber */}
          <div className="mt-4 relative items-center">
            <select
              id="insuranceSubscriber"
              name="insuranceSubscriber"
              onChange={handleChange}
              className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
            >
              <option value="">-- Select an Option --</option>
              <option value="1">Patient</option>
              <option value="2">Mother</option>
              <option value="3">Father</option>
              <option value="4">Guardian</option>
            </select>

            <label
              htmlFor="insuranceSubscriber"
              className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
            >
              Who is the subscriber?
            </label>
          </div>

          <div
            className={`h-full flex flex-col flex-1 ${values.insuranceSubscriber === "1" || values.insuranceSubscriber === undefined ? "hidden" : "block"}`}
          >
            {/* First Name */}
            <div className="mt-4 relative items-center">
              <input
                id="firstName"
                placeholder="John"
                name="firstName"
                className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
              />

              <label
                htmlFor="firstName"
                className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
              >
                Patient&apos;s Legal First Name
              </label>
            </div>
            {/* Last Name */}
            <div className="mt-4 relative items-center">
              <input
                id="lastName"
                placeholder="Doe"
                name="lastName"
                className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
              />

              <label
                htmlFor="lastName"
                className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
              >
                Patient&apos;s Legal Last Name
              </label>
            </div>

            <div className="w-full flex mt-4 relative">
              <input
                type="date"
                id="dob"
                name="dob"
                className="border border-poise-2 w-full  py-2 pt-6 rounded-lg text-black-4"
                placeholder="mm/dd/yyyy"
              ></input>
              <label
                htmlFor="dobLbl"
                className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
              >
                Patient&apos;s Date of Birth
              </label>
            </div>

            {/*Phone */}
            <div className="flex mt-4">
              <div className="relative w-full ">
                <input
                  type="tel"
                  placeholder="(555) 555-5555"
                  className=" border-poise-2 w-full px-4 pt-6 py-2 rounded-lg"
                ></input>
                <label className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4">
                  Phone Number
                </label>
              </div>
            </div>

            {/* Same as Patient */}
            <div className="mt-4 relative items-center">
              <input
                type="checkbox"
                name="sameAsPatientChkBox"
                id="sameAsPatientChkBox"
                onChange={handleChange}
                placeholder="Same address as patient"
                className=" border-poise-2 px-2 pt-2 py-2 rounded-md"
              ></input>
              <label
                htmlFor="sameAsPatientChkBox"
                className="absolute top-0 left-0 text-black-4 text-sm mt-1 ml-8"
              >
                Same as patient
              </label>
            </div>

            {/* Address */}
            <div className="mt-4 relative">
              <input
                type="text"
                id="address"
                placeholder="999 High Garden"
                className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
              />
              <label
                htmlFor="address"
                className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
              >
                Address
              </label>
            </div>

            {/* Address2 */}
            <div className="mt-4 relative">
              <input
                type="text"
                id="address2"
                placeholder="#1"
                className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
              />
              <label
                htmlFor="address2"
                className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
              >
                Apt. Suite, Unit, (Optional)
              </label>
            </div>

            {/* City */}
            <div className="mt-4 relative">
              <input
                type="text"
                id="city"
                placeholder="Winterfell"
                className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
              />
              <label
                htmlFor="city"
                className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
              >
                City
              </label>
            </div>

            {/* State */}
            <div className="flex mt-4">
              <div className="relative w-3/5">
                <select
                  name="state"
                  id="state"
                  className=" border-poise-2 w-full px-4 pt-6 py-2 rounded-lg"
                >
                  <option disabled defaultValue={""}>
                    -- State --
                  </option>
                  <option value="CA">CA</option>
                  <option value="CA">NY</option>
                  <option value="CA">NV</option>
                  <option value="CA">TX</option>
                </select>
                <label className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-8">
                  State
                </label>
              </div>
              <div className="relative w-3/4 pl-4">
                <input
                  type="text"
                  placeholder="-"
                  className=" border-poise-2 w-full px-4 pt-6 py-2 rounded-lg"
                ></input>
                <label className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-8">
                  Zip / Postal Code
                </label>
              </div>
            </div>

            <div className=" text-black text-base font-medium pt-8">
              Upload insurance card
            </div>
            <div className="text-black text-sm font-normal">
              If you have a digital insurance card, download or screenshot both
              sides to upload.
            </div>

            {/* Insurance Front Card */}
            <div className="mt-4 relative">
              <div className="px-10 py-7 align-middle items-center bg-slate-100/opacity-60 rounded border bg-slate-100 border-sky-950 ">
                <div className="">
                  <div className=" w-full flex justify-center">
                    <img
                      id="frontInsuranceCardImage"
                      src="../assets/images/card-front.svg"
                      alt=""
                    />
                  </div>
                  <div className=" py-2 text-center w-full ">
                    <span className="text-zinc-800  text-sm font-bold">
                      Front of Insurance Card
                    </span>
                    <p className="text-zinc-800 text-sm font-normal">
                      Place card on a flat, well-lit surface and tap the button
                      below
                    </p>
                  </div>
                  <div className="py-2 rounded-[100px] text-center border-2 border-sky-950 bg-slate-100 justify-center items-center gap-2.5">
                    <label
                      className=" text-center text-sky-700 text-base font-semibold"
                      htmlFor="frontInsuranceCard"
                    >
                      Take or upload photo
                    </label>
                  </div>
                </div>
              </div>
              <input
                type="file"
                className=" hidden"
                accept="image/*"
                name="frontInsuranceCard"
                id="frontInsuranceCard"
                // onChange={loadUploadedImage}
              />
            </div>

            {/* Insurance Back Card */}
            <div className="mt-4 relative">
              <div className=" px-10 py-7 align-middle items-center bg-slate-100/opacity-60 rounded border border-sky-950 bg-slate-100">
                <div className="">
                  <div className=" w-full flex justify-center">
                    <img
                      id="backInsuranceCardImage"
                      src="../assets/images/card-back.svg"
                      alt=""
                    />
                  </div>
                  <div className=" py-2 text-center w-full ">
                    <span className="text-zinc-800  text-sm font-bold">
                      Back of Insurance Card
                    </span>
                    <p className="text-zinc-800 text-sm font-normal">
                      Place card on a flat, well-lit surface and tap the button
                      below
                    </p>
                  </div>
                  <div className="py-2 rounded-[100px] text-center border-2 border-sky-700 justify-center items-center gap-2.5">
                    <label
                      className=" text-center text-sky-700 text-base font-semibold"
                      htmlFor="backInsuranceCard"
                    >
                      Take or upload photo
                    </label>
                  </div>
                </div>
              </div>
              <input
                type="file"
                className=" hidden"
                accept="image/*"
                name="backInsuranceCard"
                id="backInsuranceCard"
                // onChange={loadUploadedImage}
              />
            </div>
          </div>
        </div>

        {/* Action */}
        <div
          className={`flex items-end gap-4 ${values.insuranceSubscriber === "1" || values.insuranceSubscriber === undefined ? "h-full" : "h-full"}`}
        >
          <div className="w-2/6 ">
            <button
              id="back"
              onClick={onHandleBack}
              className={` w-full rounded-3xl text-black text-center py-2 border-slate-600 border-2 `}
            >
              Back
            </button>
          </div>
          <div className="w-4/6">
            <button
              id="Next"
              className={` w-full  rounded-3xl text-white text-center py-2  bg-spruce-4 `}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}