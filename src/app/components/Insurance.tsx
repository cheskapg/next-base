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
  // Do you have insurance component values
  const [doYouHaveInsuranceValues, setDoYouHaveInsuranceValues] = useState({
    isValidInsurance: '',
    hasInsurance: '',
    insuranceCarrier: '',
    subscriberId: '',
    subscriberDob: '',
  });
  const handleDoYouHaveInsuranceChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setDoYouHaveInsuranceValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (value: string) => {
    setFieldValue('hasInsurance', value);
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

        <DoYouHaveInsuranceComponent
          doYouHaveInsuranceValues={doYouHaveInsuranceValues}
          // errors={errors}
          handleChange={handleDoYouHaveInsuranceChange}
          handleCheckboxChange={handleCheckboxChange}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}
interface DoYouHaveInsurance {
  doYouHaveInsuranceValues: {
    isValidInsurance: string;
    hasInsurance: string;
    insuranceCarrier: string;
    subscriberId: string;
  };
  // errors: {
  //   hasInsurance: string;
  //   subscriberId: string;
  // };

  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;

  handleCheckboxChange: (value: string) => void;
  isLoading: boolean;
}
export const DoYouHaveInsuranceComponent: React.FC<DoYouHaveInsurance> = ({
  doYouHaveInsuranceValues: values,
  // errors,
  handleChange,
  handleCheckboxChange,
  isLoading,
}) => {
  return (
    <>
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
                // checked={values.hasInsurance === '1'}
                onChange={() => handleCheckboxChange('1')}
                className="peer-not rounded-md border-hidden p-0.5"
              />
            </div>
            <div className="inline-flex flex-col items-start justify-center">
              <label
                htmlFor="havePhysician"
                className="text-right text-base font-normal text-[#2a2f31]"
              >
                Yes, I have.
              </label>
              <label className="text-sm font-normal text-[#5e6366]">
                We will be validating your insurance.
              </label>
            </div>
          </div>
        </div>
        <div className="text-xs font-normal text-zest-6">
          {/* {errors.hasInsurance as string} */}
          errors
        </div>
      </div>

      {/* Carrier Section */}
      <div
        id="carrierSection"
        className={`flex h-full flex-1 flex-col bg-[#e8f2f5] p-4 ${
          !values.isValidInsurance &&
          values.isValidInsurance !== 'true' &&
          values.hasInsurance === '1'
            ? 'block'
            : 'hidden'
        }`}
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
              className={`w-full rounded-lg border-[#6e787a] px-4 py-2 pt-6 ${
                isLoading ? 'bg-[#e8f2f5]' : 'border'
              }`}
            >
              <option value="Cigna HMO/PPO">Cigna HMO/PPO</option>
              <option value="Kaiser Permanente">Kaiser Permanente</option>
            </select>
            <svg
              className={`absolute left-[85%] top-4 mt-2 rounded-full bg-slate-200 text-xs ${
                values.isValidInsurance !== 'true' ? 'hidden' : 'block'
              }`}
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
            className={`absolute ${
              isLoading ? 'bg-[#e8f2f5]' : ''
            } left-0 top-0 ml-4 mt-2 text-xs text-black-4`}
          >
            Who is the insurance carrier?
          </label>
        </div>
        <div>
          {/* Subscriber */}
          <div className="relative mt-4 items-center">
            <div className="flex">
              <input
                id="subscriberId"
                placeholder="Subscriber ID"
                value={values.subscriberId}
                onChange={handleChange}
                disabled={isLoading}
                name="subscriberId"
                className={`${
                  isLoading ? ' bg-[#e8f2f5] text-[#6e787a]' : 'border'
                } w-full rounded-lg border-[#6e787a] px-4 py-2 pt-6`}
              />
              <svg
                className={`absolute left-[90%] top-4 mt-2 rounded-full bg-slate-200 text-xs ${
                  values.isValidInsurance !== 'true' ? 'hidden' : 'block'
                } ${isLoading ? 'bg-[#e8f2f5]' : ''}`}
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
              className={`absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4 ${
                isLoading ? 'bg-[#e8f2f5]' : ''
              }`}
            >
              Subscriber ID
            </label>
          </div>
          <div className="text-xs font-normal text-zest-6">
            {/* {errors.subscriberId as string} */}
            error
          </div>
        </div>
      </div>

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
                // checked={values.hasInsurance === '0'}
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
          {/* {errors.hasInsurance as string} */}
          erorsz
        </div>
      </div>
    </>
  );
};
