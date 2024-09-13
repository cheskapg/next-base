/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "@/node_modules/next/link";
import {
  fetchCarriers,
  fetchClinicalQuestions,
  fetchServiceIntakeQuestions,
  updateInsuranceDetails,
  validateSubscriberId,
} from "../actions/api"; // Adjust the path as necessary
import { useFormik } from "formik";
import DoYouHaveInsuranceForm from "./InsuranceForms/DoYouHaveInsuranceForm";
import SubscriberForm from "./InsuranceForms/SubscriberForm";
import { FormProvider, useFormState } from "./FormContext";
import ImageUpload from "./Fields/ImageUpload";
import { patientSchema } from "../schemas/patient";
export default function Insurance() {
  // const [insuranceStep, setInsuranceStep] = useState(1);
  const [values, setValues] = useState<FormValues>({});
  const [isValidInsurance, setIsValidInsurance] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [IsSubmitting, setIsSubmitting] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const [triggerSubmit, setTriggerSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [carriers, setCarriers] = useState({});
  const handleErrors = (newErrors: any) => {
    setErrors(newErrors);
    setHasErrors(Object.keys(newErrors).length > 0);
  };
  const [hasErrors, setHasErrors] = useState(false);
  const handleCarrierUpdate = (newValues: any) => {
    console.log(newValues, "new values carrier update")
    setValues((prevValues) => ({ ...prevValues, ...newValues }));
  };
  const handleIsSubmitting = (isSubmitting: boolean) => {
    setIsSubmitting(isSubmitting);
  };
  const handleCurrentStep = (currentStep: number) => {
    setInsuranceStep(currentStep);
  };
  // const handleValidateResult1 = (result: boolean) => {
  //   setValidateResult1(result);
  // };
  // const handleValidateResult2 = (result: boolean) => {
  //   setValidateResult2(result);
  // };
  // const handleValidationStatus1 = (status: boolean) => {
  //   setValidationStatus1(status);
  // };
  // const handleValidationStatus2 = (status: boolean) => {
  //   setValidationStatus2(status);
  // };
  const handleRteData1 = (rteData1: any) => {
    setRteData1(rteData1);
  };
  const handleRteData2 = (rteData2: any) => {
    setRteData2(rteData2);
  };

  const resetState = () => {
    setIsValidInsurance(false);
    setIsValidating(false);
    setTriggerValidation(false);
    setTriggerSubmit(false);
    // setValidateResult1(false);
    // setValidateResult2(false);
    setIsSubmitting(false);
  };
  const {
    onHandleNext,
    setClinicalQuestionsData,
    onHandleBack,
    patientData,
    setInsuranceData,
    setRteData1,
    rteData1,
    setRteData2,
    rteData2,
    setValidationStatus1,
    validationStatus1,
    setValidateResult1,
    validateResult1,
    setValidationStatus2,
    validationStatus2,
    validateResult2,
    setValidateResult2,
    insuranceData,
    setInsuranceStep,
    insuranceStep,
    subscriberData,
    setSubscriberData,
    setAdditionalSubscriberData,
    // additionalSubscriberData,
  } = useFormState();

  const onHandleFormSubmit = async (data: any) => {
    switch (insuranceStep) {
      case 1:
        // Validation logic
        console.log(patientData, " patientdata in insurace");

        if (data.hasInsurance1 === "1") {
          if (!validateResult1) {
            setTriggerValidation(true);
            // setInsuranceData((prev: any) => ({ ...prev, ...data }));

          } else {
            setInsuranceStep(insuranceStep + 1);
          }

          //simulate api call await
          if (isValidInsurance) {
            // setInsuranceData((prev: any) => ({ ...prev, ...data }));

            setInsuranceStep(insuranceStep + 1);
            resetState();
          }
        } else {
          //no insurance
          onHandleNext();
        }
        break;

      case 2:
        // setInsuranceData((prev: any) => ({
        //   ...prev,
        //   ...data,
        // }));
        setTriggerSubmit(true);

        // setInsuranceData((prev: any) => ({ ...prev, ...subscriberData}));
        //call api to store  subscriber data to db
        console.log(insuranceData, " insuranceddata all");

        console.log(subscriberData, " subscriberData all");
        break;
      case 3:
        if (data.hasInsurance2 === "1") {
          if (!validateResult2) {
            // setInsuranceData((prev: any) => ({ ...prev, ...data }));

            setTriggerValidation(true);
          } else {
            setInsuranceStep(insuranceStep + 1);
          }

          //simulate api call await
          if (isValidInsurance) {
            // setInsuranceData((prev: any) => ({ ...prev, ...data }));


            setInsuranceStep(insuranceStep + 1);
            // setSubscriberData([]);// clear subscriber data for new info on the next one

            resetState();
          }
        } else {
          //no insurance
          // setInsuranceData((prev: any) => ({ ...prev, ...data }));
          onHandleNext();
        }
        break;
      case 4:
        // setInsuranceData((prev: any) => ({
        //   ...prev,
        //   ...data

        // }));
        setTriggerSubmit(true);

        // setInsuranceData((prev: any) => ({ ...prev, additionalSubscriberData}));
        //call api to store  subscriber data to db
        console.log(insuranceData, " insuranceddata all");
        // console.log(additionalSubscriberData, " additionalSubscriberData all");
        // onHandleNext();
        break;

      default:
        break;
    }
  };
  //from carrier
  const handleInsuranceDataChange = (data: any, index: any) => {
    console.log("handling ", data)
    // setInsuranceData((prev: any) => ({ ...prev, ...data }));
    setInsuranceData((prevData: any) => {
      // Create a copy of the current insurance data
      const updatedData = [...prevData];

      // Ensure the section index is valid
      const section = index - 1; // Adjusting for zero-based indexing

      // Update the specific section with the new data
      updatedData[section] = {
        ...updatedData[section], // Preserve existing data in the section
        ...data, // Merge the new data
      };

      return updatedData;
    });
  };
  // const handleSubscriberDataChange = (data: any) => {

  //   // setSubscriberData((prev: any) => ({ ...prev, ...data }));
  //       setInsuranceData((prev: any) => ({ ...prev, ...data }));
  // };
  //optional since subscriber will be sent to api after main sub then
  // addtl sub will replace data usig setsubscriberdata and  another request will be sent
  // to update the other rte virtual sub
  // const handleAdditionalSubscriberChange = (data: any) => {
  //   // setAdditionalSubscriberData(data);
  //   setInsuranceData((prev: any) => ({ ...prev, ...data }));

  // };

  // useEffect(() => {
  //   const handleInsuranceDataChange = (data: any) => {
  //     setInsuranceData((prev: any) => ({ ...prev, ...data }));
  //   };
  //   const handleSubscriberDataChange = (data: any) => {
  //     setSubscriberData(data);
  //     // setInsuranceData((prev: any) => ({ ...prev, ...data }));
  //   };

  //   const handleAdditionalSubscriberChange = (data: any) => {
  //     setAdditionalSubscriberData(data);
  //     // setInsuranceData((prev: any) => ({ ...prev, ...data }));

  //   };
  //   // Call the handleInsuranceDataChange function when the component mounts
  //   handleInsuranceDataChange({
  //     /* initial insurance data */
  //   });
  //   handleSubscriberDataChange({
  //     /* initial insurance data */
  //   });
  //   handleAdditionalSubscriberChange({
  //     /* initial insurance data */
  //   });
  // }, [setInsuranceData]);

  const getCarriers = async () => {
    setCarriers(await fetchCarriers(patientData.regionId));
    console.log("Carriers: " + carriers);
  };
  useEffect(() => {
    // setInsuranceData(insuranceData)
    console.log("Triggered submit with insuranceData: ", insuranceData);
    // setSubscriberData(subscriberData);
    // setAdditionalSubscriberData(additionalSubscriberData);
    console.log(subscriberData, "subsk");
    // console.log(additionalSubscriberData, "additionalSubscriberData subsk");
  }, [triggerSubmit, insuranceData]);

  useEffect(() => {
    getCarriers();
  }, []);

  useEffect(() => {
    if (isValidInsurance) {
      onHandleFormSubmit(values);
    }
  }, [isValidInsurance]);
  
  useEffect(() => {

    console.log(hasErrors, "has errors insurance")
  }, [hasErrors]);

  const handleBack = () => {
    if (insuranceStep > 1) {
      // setIsValidInsurance(false);
      // setIsValidating(false);
      // setTriggerValidation(false);
      setInsuranceStep(insuranceStep - 1);
    } else {
      onHandleBack();
    }
  };

  const isNextDisabled = () => {
    if (insuranceStep === 2 || insuranceStep === 4) {
      // For current step = 2 or 4, monitor IsSubmitting

      return hasErrors || IsSubmitting;
    } else {
      // For "Do You Have Insurance" Form
      const currentValidateResult =
        insuranceStep === 3 ? validateResult2 : validateResult1;

      return (
        isValidating ||
        // currentValidateResult ||
        (hasErrors && values.hasInsurance2 === "1") ||
        (hasErrors && values.hasInsurance1 === "1")
      );
    }
  };
  interface FormValues {
    hasInsurance1?: string;
    subscriberId?: string;
    // Add other fields as needed
    hasInsurance2?: string;
    subscriberId2?: string;

    insuranceCarrier?: string;

    insuranceFirstName?: string;
    insuranceLastName?: string;
    insuranceDob?: string;
    insurancePhone?: string;
  }

  return (
    <div className="flex flex-1">
      <FormProvider>
        {/* <form onSubmit={(e) => e.preventDefault()} className="flex flex-1 flex-col"> */}
        <div className={`flex flex-1 flex-col p-6`}>
          <div className="text-xl">
            {insuranceStep === 1
              ? "Do you have health insurance"
              : insuranceStep === 2
                ? "Insurance Details"
                : insuranceStep === 3
                  ? "Do you have additional health insurance"
                  : insuranceStep === 4
                    ? "Additional Insurance Details"
                    : "Insurance"}
          </div>

          {insuranceStep === 1 && (
            <DoYouHaveInsuranceForm
              section={1}
              isValidInsurance={isValidInsurance}
              onInsuranceDataChange={handleInsuranceDataChange}
              setRteData={handleRteData1}
              rteData={rteData1}
              setIsValidInsurance={setIsValidInsurance} // Pass
              validateResult={validateResult1}
              setValidateResult={setValidateResult1}
              validationStatus={validationStatus1}
              setValidationStatus={setValidationStatus1} // Pass
              isValidating={isValidating}
              handleErrors={handleErrors}
              setIsValidating={setIsValidating} // Pass
              onCheckboxChange={handleCarrierUpdate} // update the checkbox values to parent
              // hasInsurance1={values.hasInsurance1 || ""}
              triggerValidation={triggerValidation}
              setTriggerValidation={setTriggerValidation}
              carriers={carriers}
              registrationId={patientData.registrationId}
            />
          )}
          {insuranceStep === 2 && (
            <SubscriberForm
              section={1}
              patientDetails={patientData}
              onSubscriberDataChange={handleInsuranceDataChange}
              setCurrentStep={handleCurrentStep}
              currentStep={insuranceStep}
              // onSubmit={handleCarrierUpdate}
              onRteDataChange={rteData1} /// pass to subs
              handleErrors={handleErrors}
              setIsSubmitting={handleIsSubmitting} // Pass the handleIsSubmitting function
              isSubmitting={IsSubmitting}
              triggerSubmit={triggerSubmit}
              setTriggerSubmit={setTriggerSubmit}
              regId={patientData.registrationId}
              dob={patientData.dateOfBirth}
            />
          )}
          {insuranceStep === 3 && (
            <DoYouHaveInsuranceForm
              section={2}
              isValidInsurance={isValidInsurance}
              onInsuranceDataChange={handleInsuranceDataChange}
              setIsValidInsurance={setIsValidInsurance} // Pass
              validateResult={validateResult2}
              setValidateResult={setValidateResult2}
              validationStatus={validationStatus2}
              setValidationStatus={setValidationStatus2} // Pass
              setRteData={handleRteData2}
              rteData={rteData2}
              isValidating={isValidating}
              setIsValidating={setIsValidating} // Pass
              onCheckboxChange={handleCarrierUpdate} // update the checkbox values to parent
              handleErrors={handleErrors}
              // hasInsurance1={values.hasInsurance1 || ""}
              triggerValidation={triggerValidation}
              setTriggerValidation={setTriggerValidation}
              carriers={carriers}
              registrationId={patientData.registrationId}
            />
          )}
          {insuranceStep === 4 && (
            <SubscriberForm
              section={2}
              patientDetails={patientData}
              onSubscriberDataChange={handleInsuranceDataChange}
              setCurrentStep={handleCurrentStep}
              currentStep={insuranceStep}
              // onSubmit={handleCarrierUpdate}
              onRteDataChange={rteData2}
              triggerSubmit={triggerSubmit}
              handleErrors={handleErrors}
              setIsSubmitting={handleIsSubmitting}
              isSubmitting={IsSubmitting}
              setTriggerSubmit={setTriggerSubmit}
              regId={patientData.registrationId}
              dob={patientData.dateOfBirth}
            />
          )}

          {/* Action */}
          <div className={` flex items-end gap-4 `}>
            <div className="w-2/6 ">
              <button
                id="back"
                onClick={() => {
                  // e.preventDefault();
                  handleBack();
                }}
                // disabled={
                // isValidating ||
                // (currentStep === 1
                //   ? validateResultSection1
                //   : currentStep === 3
                //     ? validateResultSection2
                //     : false)
                // }
                className={` text-black h-10  w-full rounded-3xl border-2 border-slate-600  text-center font-semibold `}
              >
                <span className="flex items-center justify-center">Back</span>
              </button>
            </div>
            {values[`hasInsurance1`] === "0" ||
              values[`hasInsurance1`] === "1" ||
              values[`hasInsurance2`] === "0" ||
              values[`hasInsurance2`] === "1" ? (
              <div className="w-4/6">
                <button
                  disabled={isNextDisabled()}
                  id="Next"
                  type="submit"
                  onClick={(e) => {
                    console.log(insuranceStep);
                    e.preventDefault();
                    onHandleFormSubmit(values);
                  }}
                  className={`${(insuranceStep === 1 &&
                      values.hasInsurance1 === "1" &&
                      hasErrors) ||
                      (insuranceStep === 3 &&
                        values.hasInsurance2 === "1" &&
                        hasErrors) ||
                      (insuranceStep === 2 && hasErrors) ||
                      (insuranceStep === 4 && hasErrors)
                      ? "pointer-events-none opacity-50"
                      : ""
                    } bg-spruce-4 w-full rounded-3xl py-2 text-center font-semibold text-white`}
                >
                  {isValidating ? (
                    <span className="flex items-center justify-center">
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
                      Validating...
                    </span>
                  ) : (
                    <>
                      {insuranceStep === 1 && values.hasInsurance1 === "1" ? (
                        <span>Validate Insurance</span>
                      ) : insuranceStep === 1 ? (
                        <span>Next</span>
                      ) : null}

                      {insuranceStep === 2 && <span>Next</span>}

                      {insuranceStep === 3 && values.hasInsurance2 === "1" ? (
                        <span>Validate Insurance</span>
                      ) : insuranceStep === 3 ? (
                        <span>Next</span>
                      ) : null}

                      {insuranceStep === 4 && <span>Submit</span>}
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="w-4/6">
                <div className=" flex h-10 items-center justify-center gap-2.5 rounded-[100px] pl-4 ">
                  <div className=" text-sm font-normal text-[#5e6366]">
                    Select an option to proceed
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* </form> */}
      </FormProvider>
    </div>
  );
}
