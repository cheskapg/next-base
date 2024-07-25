/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable spaced-comment */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable lines-around-directive */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
// import Link from "@/node_modules/next/link";
import { useFormik } from 'formik';
import { useFormState } from './FormContext';
// import { insuranceSchema } from "../schemas/insurance";
// import { loadUploadedImage } from "../utils/helper";

export default function Insurance() {
  const { onHandleNext, onHandleBack, setPatientData, patientData } =
    useFormState();
  //   console.log("insurance " + patientData);
  const onHandleFormSubmit = (data: TFormValues) => {
    //setPatientData((prev: any) => ({ ...prev, ...data }));
    console.log(`test${JSON.stringify(data)}`);
    onHandleNext();
  };
  const onHandleBackBtn = (data: TFormValues) => {
    setPatientData((prev: any) => ({ ...prev, ...data }));
    console.log(`back${JSON.stringify(patientData)}`);
    onHandleBack();
  };

  const { values, errors, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        insuranceCarrier: patientData ? patientData.insuranceCarrier : '',
        subscriberId: patientData ? patientData.subscriberId : '',
        hasInsurance: patientData ? patientData.hasInsurance : '',

        insuranceFirstName: patientData ? patientData.insuranceFirstName : '',
        insuranceLastName: patientData ? patientData.insuranceLastName : '',
        insuranceDob: patientData ? patientData.insuranceDob : '',
        insurancePhone: patientData ? patientData.insurancePhone : '',
        insuranceCountry: patientData ? patientData.insuranceCountry : '',
        insuranceAddress: patientData ? patientData.insuranceAddress : '',
        insuranceAddress2: patientData ? patientData.insuranceAddress2 : '',
        insuranceCity: patientData ? patientData.insuranceCity : '',
        insuranceState: patientData ? patientData.insuranceState : '',
        insuranceZip: patientData ? patientData.insuranceZip : '',
        isValidInsurance: patientData ? patientData.isValidInsurance : '',
        insuranceSubscriber: patientData ? patientData.insuranceSubscriber : '',
        subscriberDob: patientData ? patientData.subscriberDob : '',
      },

      // validationSchema: insuranceSchema,
      onSubmit: (values: any) => {
        onHandleFormSubmit(values);
      },
    });

  type TFormValues = {
    insuranceCarrier: '';
    subscriberId: '';
    hasInsurance: '';
    insuranceFirstName: '';
    insuranceLastName: '';
    insuranceDob: '';
    insurancePhone: '';
    insuranceCountry: '';
    insuranceAddress: '';
    insuranceAddress2: '';
    insuranceCity: '';
    insuranceState: '';
    insuranceZip: '';
    subscriberDob: '';
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleValidation = () => {
    // Simulate loading state
    if (values.hasInsurance && values.hasInsurance === '1') {
      setIsLoading(true);

      // Simulate validation delay
      setTimeout(() => {
        // Update state after validation
        setIsLoading(false);
        values.isValidInsurance = 'true';
        console.log(`test${values.isValidInsurance}`);
        console.log(values.isValidInsurance);
      }, 3000); // 3 seconds delay (adjust as needed)
    }
  };
  const falseValidation = () => {
    // Simulate loading state
    if (values.hasInsurance && values.hasInsurance === '1') {
      setIsLoading(true);

      // Simulate validation delay
      setTimeout(() => {
        // Update state after validation
        setIsLoading(false);
        values.isValidInsurance = 'false';
        console.log(`test${values.isValidInsurance}`);
        console.log(values.isValidInsurance);
      }, 3000); // 3 seconds delay (adjust as needed)
    }
  };

  const handleWithInsurance = (e: any) => {
    values.isValidInsurance = 'true';
    console.log(`test${values.isValidInsurance}`);
    //handleChange(values.isValidInsurance);
    console.log(values.isValidInsurance);
  };
  const handleCheckboxChange = (value: '0' | '1') => {
    setFieldValue('hasInsurance', value);
  };
  return (
    <form onSubmit={handleSubmit} className="min-h-screen ">
      <div
        className={`flex flex-1 flex-col p-6 ${values.insuranceSubscriber === '1' || values.insuranceSubscriber === undefined ? 'h-screen' : 'h-full'} `}
      >
        <div className="text-xl ">
          {values.isValidInsurance === 'true'
            ? 'Insurance Details'
            : 'Do you have health Insurance?'}{' '}
        </div>

        {/* Do you have insurance */}
        <div
          className={`flex flex-col ${values.isValidInsurance !== 'true' ? 'block' : 'hidden'}`}
        >
          <div className="relative mt-4 items-center">
            <div className="flex gap-4">
              <div className="flex h-6 w-6 justify-center self-center rounded-lg border border-sky-700 p-0.5">
                <input
                  id="hasInsurance"
                  type="checkbox"
                  disabled={isLoading}
                  name="hasInsurance"
                  checked={values.hasInsurance === '1'}
                  onChange={() => handleCheckboxChange('1')}
                  className="peer-not rounded-md border-hidden p-0.5"
                ></input>
              </div>
              <div className=" inline-flex flex-col items-start justify-center">
                <label
                  htmlFor="havePhysician"
                  className="text-right  text-base font-normal text-[#2a2f31]"
                >
                  Yes, I have.
                </label>
                <label className=" text-sm font-normal text-[#5e6366]">
                  We will be validating your insurance.
                </label>
              </div>
            </div>
          </div>

          <div className={`text-xs font-normal text-zest-6 `}>
            {errors.hasInsurance as string}
          </div>
        </div>

        {/* Carrier Section*/}
        <div
          id="carrierSection"
          className={`flex h-full flex-1 flex-col bg-[#e8f2f5] p-4 ${!values.isValidInsurance && values.isValidInsurance !== 'true' && values.hasInsurance === '1' ? 'block' : 'hidden'}`}
        >
          {/* Who is the insurance carrier */}
          <div className="relative mt-4 items-center">
            <div>
              <select
                id="insuranceCarrier"
                name="insuranceCarrier"
                value={values.insuranceCarrier}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full  rounded-lg  border-[#6e787a] px-4 py-2  pt-6  ${isLoading ? 'bg-[#e8f2f5]' : 'border'}`}
              >
                <option value="Cigna HMO/PPO">Cigna HMO/PPO</option>
                <option value="Kaiser Permanente">Kaiser Permanente</option>
              </select>
              <svg
                className={` absolute left-[85%] top-4  mt-2  rounded-full  bg-slate-200 text-xs ${values.isValidInsurance !== 'true' ? 'hidden' : 'block'} `}
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
              className={`absolute ${isLoading ? 'bg-[#e8f2f5]' : ''} left-0 top-0 ml-4 mt-2 text-xs text-black-4 `}
            >
              Who is the insurance carrier?
            </label>
          </div>
          <div>
            {/* Subscriber */}
            <div className="relative mt-4 items-center">
              <div className="flex ">
                <input
                  id="subscriberId"
                  placeholder="Subscriber ID"
                  value={values.subscriberId}
                  onChange={handleChange}
                  disabled={isLoading}
                  name="subscriberId"
                  className={`    ${isLoading ? ' bg-[#e8f2f5] text-[#6e787a]' : 'border'} w-full rounded-lg border-[#6e787a] px-4 py-2 pt-6`}
                />
                <svg
                  className={` absolute left-[90%] top-4  mt-2  rounded-full  bg-slate-200 text-xs ${values.isValidInsurance !== 'true' ? 'hidden' : 'block'}  ${isLoading ? 'bg-[#e8f2f5]' : ''}`}
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
                className={`absolute left-0 top-0 ml-4  mt-2 text-xs text-black-4  ${isLoading ? 'bg-[#e8f2f5]' : ''}`}
              >
                Subscriber Id
              </label>
            </div>
            <div className=" text-sm text-black-2">
              This is NOT group, issuer, or RX number and may contain letters
              and numbers.
            </div>
          </div>

          {/* Add Subscriber Date of Birth */}
          <div
            className={` ${values.isValidInsurance !== 'true' ? '' : ''}  relative flex w-full`}
          >
            <input
              type="date"
              id="subscriberDob"
              name="subscriberDob"
              value={values.subscriberDob}
              onChange={handleChange}
              disabled={isLoading}
              className={`border ${errors.dateOfBirth ? 'border-zest-6' : ''}  ${values.isValidInsurance !== 'true' ? '' : ''} w-full appearance-none  rounded-lg px-4 py-2 pt-6  ${isLoading ? 'border-0 bg-[#e8f2f5] outline-0 ring-0 placeholder:text-black-4' : 'border'}`}
              placeholder="mm/dd/yyyy"
            ></input>
            <label
              htmlFor="subscriberDobLbl"
              className={`absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4 ${errors.dateOfBirth ? 'text-zest-6' : ''}`}
            >
              Subscriber Date of Birth
              <span className={`text-xs font-normal text-zest-6 `}>*</span>
            </label>
            <img
              width={18}
              height={20}
              src="../assets/images/calendar.png"
              className="-border-2 absolute right-0 top-0 mr-[15px] mt-[29px] items-end justify-end border-red-800 "
              alt="calendaricon"
            ></img>
          </div>

          <div className={`pl-4 text-xs font-normal text-zest-6`}>
            {errors.dateOfBirth as string}
          </div>
          <div className={`${isLoading ? 'block' : 'hidden'}`}>
            {/* Validation status inside the carrier */}
            <div
              className={`mt-4 items-center justify-center gap-10 rounded border   ${
                values.isValidInsurance === 'true'
                  ? 'bg-[#31936e]/25  text-status-green-text'
                  : 'bg-[#d13e27]/25 text-status-red-text'
              }`}
            >
              <div className=" py-3 text-center text-sm font-bold ">
                {values.isValidInsurance === 'true'
                  ? 'Valid Insurance'
                  : 'Invalid Insurance'}
              </div>
            </div>
          </div>
        </div>

        {/* Subscriber Section*/}
        <div
          id="subsciberSection"
          className={`mb-4 mt-4 flex h-full flex-1 flex-col ${console.log(values.isValidInsurance)} ${values.isValidInsurance !== 'true' ? 'hidden' : 'block'}`}
        >
          {/* Who is the subscriber */}
          <div className="relative mt-4 items-center">
            <select
              id="insuranceSubscriber"
              name="insuranceSubscriber"
              onChange={handleChange}
              className="w-full rounded-lg border border-poise-2 px-4 py-2 pt-6"
            >
              <option value="">-- Select an Option --</option>
              <option value="1">Patient</option>
              <option value="2">Mother</option>
              <option value="3">Father</option>
              <option value="4">Guardian</option>
              <option value="5">Spouse</option>
            </select>

            <label
              htmlFor="insuranceSubscriber"
              className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
            >
              Who is the subscriber?
            </label>
          </div>

          <div
            className={`flex h-full flex-1 flex-col ${values.insuranceSubscriber === '1' || values.insuranceSubscriber === undefined ? 'hidden' : 'block'}`}
          >
            {/* First Name */}
            <div className="relative mt-4 items-center">
              <input
                id="firstName"
                placeholder="John"
                name="firstName"
                className="w-full rounded-lg border border-poise-2 px-4 py-2 pt-6"
              />

              <label
                htmlFor="firstName"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
              >
                Patient&apos;s Legal First Name
              </label>
            </div>
            {/* Last Name */}
            <div className="relative mt-4 items-center">
              <input
                id="lastName"
                placeholder="Doe"
                name="lastName"
                className="w-full rounded-lg border border-poise-2 px-4 py-2 pt-6"
              />

              <label
                htmlFor="lastName"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
              >
                Patient&apos;s Legal Last Name
              </label>
            </div>

            <div className="relative mt-4 flex w-full">
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full rounded-lg border  border-poise-2 py-2 pl-4 pt-6 text-black-4"
                placeholder="mm/dd/yyyy"
              ></input>
              <label
                htmlFor="dobLbl"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
              >
                Patient&apos;s Date of Birth
              </label>
            </div>

            {/*Phone */}
            <div className="mt-4 flex">
              <div className="relative w-full ">
                <input
                  type="tel"
                  placeholder="(555) 555-5555"
                  className=" w-full rounded-lg border border-poise-2 px-4 py-2 pt-6"
                ></input>
                <label className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4">
                  Phone Number
                </label>
              </div>
            </div>

            {/* Same as Patient */}
            <div className="ml-2 mt-4 flex flex-row items-center">
              <div className="inline-flex h-6 w-6 flex-col items-center justify-center rounded-lg  border">
                <input
                  type="checkbox"
                  name="sameAsPatientChkBox"
                  id="sameAsPatientChkBox"
                  onChange={handleChange}
                  placeholder="Same address as patient"
                  className="  h-5 w-4 rounded-xl border border-[#dbddde]"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="sameAsPatientChkBox"
                  className="ml-4 items-center text-sm text-black-4"
                >
                  Same address as patient
                </label>
              </div>
            </div>

            {/* Address */}
            <div className="relative mt-4">
              <input
                type="text"
                id="address"
                placeholder="999 High Garden"
                className="w-full rounded-lg border border-poise-2 px-4 py-2 pt-6"
              />
              <label
                htmlFor="address"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
              >
                Address
              </label>
            </div>

            {/* Address2 */}
            <div className="relative mt-4">
              <input
                type="text"
                id="address2"
                placeholder="#1"
                className="w-full rounded-lg border border-poise-2 px-4 py-2 pt-6"
              />
              <label
                htmlFor="address2"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
              >
                Apt. Suite, Unit, (Optional)
              </label>
            </div>

            {/* City */}
            <div className="relative mt-4">
              <input
                type="text"
                id="city"
                placeholder="Winterfell"
                className="w-full rounded-lg border border-poise-2 px-4 py-2 pt-6"
              />
              <label
                htmlFor="city"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
              >
                City
              </label>
            </div>

            {/* State */}
            <div className="mt-4 flex">
              <div className="relative w-3/5">
                <select
                  name="state"
                  id="state"
                  className=" w-full rounded-lg border-poise-2 px-4 py-2 pt-6"
                >
                  <option disabled defaultValue={''}>
                    -- State --
                  </option>
                  <option value="CA">CA</option>
                  <option value="CA">NY</option>
                  <option value="CA">NV</option>
                  <option value="CA">TX</option>
                </select>
                <label className="absolute left-0 top-0 ml-8 mt-2 text-xs text-black-4">
                  State
                </label>
              </div>
              <div className="relative w-3/4 pl-4">
                <input
                  type="text"
                  placeholder="-"
                  className=" w-full rounded-lg border-poise-2 px-4 py-2 pt-6"
                ></input>
                <label className="absolute left-0 top-0 ml-8 mt-2 text-xs text-black-4">
                  Zip / Postal Code
                </label>
              </div>
            </div>

            <div className=" text-black pt-8 text-base font-medium">
              Upload insurance card
            </div>
            <div className="text-black text-sm font-normal">
              If you have a digital insurance card, download or screenshot both
              sides to upload.
            </div>

            {/* Insurance Front Card */}
            <div className="relative mt-4">
              <div className="bg-slate-100/opacity-60 items-center rounded border border-sky-950 bg-slate-100 px-10 py-7 align-middle ">
                <div className="">
                  <div className=" flex w-full justify-center">
                    <img
                      id="frontInsuranceCardImage"
                      src="../assets/images/card-front.svg"
                      alt=""
                    />
                  </div>
                  <div className=" w-full py-2 text-center ">
                    <span className="text-sm  font-bold text-zinc-800">
                      Front of Insurance Card
                    </span>
                    <p className="text-sm font-normal text-zinc-800">
                      Place card on a flat, well-lit surface and tap the button
                      below
                    </p>
                  </div>
                  <div className="items-center justify-center gap-2.5 rounded-[100px] border-2 border-sky-950 bg-slate-100 py-2 text-center">
                    <label
                      className=" text-center text-base font-semibold text-sky-700"
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
            <div className="relative mt-4">
              <div className=" bg-slate-100/opacity-60 items-center rounded border border-sky-950 bg-slate-100 px-10 py-7 align-middle">
                <div className="">
                  <div className=" flex w-full justify-center">
                    <img
                      id="backInsuranceCardImage"
                      src="../assets/images/card-back.svg"
                      alt=""
                    />
                  </div>
                  <div className=" w-full py-2 text-center ">
                    <span className="text-sm  font-bold text-zinc-800">
                      Back of Insurance Card
                    </span>
                    <p className="text-sm font-normal text-zinc-800">
                      Place card on a flat, well-lit surface and tap the button
                      below
                    </p>
                  </div>
                  <div className="items-center justify-center gap-2.5 rounded-[100px] border-2 border-sky-700 py-2 text-center">
                    <label
                      className=" text-center text-base font-semibold text-sky-700"
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
        {/* Validation Status  for testing */}
        {/* <div
            className={`${isLoading ? 'block' : 'hidden'}`}
          >
            <div className={`mt-4 items-center justify-center gap-10 rounded border border-emerald-50   ${
              values.isValidInsurance === 'true'
                ? 'text-status-green-text  bg-[#31936e]/25'
                : 'text-status-red-text bg-[#d13e27]/25'
            }`}>
              <div className=" py-3 text-center text-sm font-bold ">
                
                {values.isValidInsurance === 'true'
                  ? 'Valid Insurance'
                  : 'Invalid Insurance'}
                
              </div>
            </div>
          </div> */}
        {/* No i dont have */}
        <div
          className={`flex flex-col ${values.isValidInsurance !== 'true' ? 'block' : 'hidden'}`}
        >
          <div className="relative mt-4 items-center">
            <div className="flex gap-4">
              <div className="flex h-6 w-6 justify-center self-center rounded-lg border border-sky-700 p-0.5">
                <input
                  id="hasInsurance"
                  type="checkbox"
                  disabled={isLoading}
                  checked={values.hasInsurance === '0'}
                  onChange={() => handleCheckboxChange('0')}
                  className="peer-not rounded-md border-hidden p-0.5"
                ></input>
              </div>
              <div className=" inline-flex flex-col items-start justify-center">
                <label
                  htmlFor="havePhysician"
                  className="text-right  text-base font-normal text-[#2a2f31]"
                >
                  No, I don&apos;t have.
                </label>
                <label className=" text-sm font-normal text-[#5e6366]">
                  You will be self-paying.
                </label>
              </div>
            </div>
          </div>

          <div className={`text-xs font-normal text-zest-6 `}>
            {errors.hasInsurance as string}
          </div>
        </div>

        {/* Validate FOR TESTING NO LOADER*/}
        {/* <div
          className={`py-4  ${values.isValidInsurance !== 'true' ? 'block' : 'hidden'}`}
        >
          <button
            id="validate"
            type="button"
            onClick={(e) => {
              handleValidation();
              handleChange(e);
            }}
            className={` bg-spruce-4 w-full rounded-3xl py-2 text-center  text-white `}
          >
            Validate Insurance
          </button>
        </div> */}

        {/* Validate Button FOR TESTING */}
        <div
          className={`py-4 ${!values.isValidInsurance && values.isValidInsurance !== 'true' && values.hasInsurance === '1' ? 'block' : 'hidden'} ${isLoading ? 'bg-[#e8f2f5]' : ''}`}
        >
          <button
            id="falseValidate"
            type="button"
            onClick={falseValidation}
            className={`relative w-full rounded-3xl bg-spruce-4 py-2 text-center text-white`}
          >
            {isLoading ? (
              <span className=" flex items-center   justify-center">
                <svg
                  className="mr-3 h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              'Validate Insurance'
            )}
          </button>
        </div>

        {/* Action */}
        <div
          className={`flex items-end gap-4 ${values.insuranceSubscriber === '1' || values.insuranceSubscriber === undefined ? 'h-full' : 'h-full'}`}
        >
          <div className="w-2/6 ">
            <button
              id="back"
              onClick={(e) => {
                handleChange(e);

                if (values.isValidInsurance === 'true') {
                  values.isValidInsurance = 'false';
                  values.hasInsurance = null;
                  onHandleBack();
                }
              }}
              className={` text-black w-full rounded-3xl border-2 border-slate-600 py-2 text-center font-semibold `}
            >
              Back
            </button>
          </div>
          <div className="w-4/6">
            {values.hasInsurance ? (
              <button
                id={values.isValidInsurance === 'true' ? 'Next' : 'validate'}
                onClick={handleValidation}
                type="button"
                className={` w-full  rounded-3xl bg-spruce-4 py-2 text-center font-semibold  text-white `}
              >
                {isLoading ? (
                  <span className=" flex items-center   justify-center">
                    <svg
                      className="mr-3 h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  `${values.isValidInsurance === 'true' ? 'Next' : 'Validate'}`
                )}
              </button>
            ) : (
              <div
                className={` w-full rounded-3xl  py-2 text-center text-sm font-normal text-[#5e6366]  `}
              >
                Select an option to proceed
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
