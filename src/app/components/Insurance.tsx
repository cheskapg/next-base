'use client';

import React, { useState } from 'react';
// import Link from "@/node_modules/next/link";
import { useFormik } from 'formik';
import { useFormState } from './FormContext';
import { DayPicker } from 'react-day-picker';
import Identification from './Indentification';

import { handleWebpackExternalForEdgeRuntime } from 'next/dist/build/webpack/plugins/middleware-plugin';
import { insuranceSchema } from '@/schemas/insurance';
import ImageUpload from './Fields/ImageUpload';
// import { insuranceSchema } from "../schemas/insurance";
// import { loadUploadedImage } from "../utils/helper";

export default function Insurance() {
  const { onHandleNext, onHandleBack, setPatientData, patientData } =
    useFormState();
  //   console.log("insurance " + patientData);

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    isValid,
    handleBlur,
    validateForm,
    setFieldValue,
    touched,
  } = useFormik({
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
      insuranceAddress2_: patientData ? patientData.insuranceAddress2_ : '',
      insuranceCity: patientData ? patientData.insuranceCity : '',
      insuranceState: patientData ? patientData.insuranceState : '',
      insuranceZip: patientData ? patientData.insuranceZip : '',
      isValidInsurance: patientData ? patientData.isValidInsurance : '',
      insuranceSubscriber: patientData ? patientData.insuranceSubscriber : '',
      subscriberDob: patientData ? patientData.subscriberDob : '',

      // Additional Insurance Fields
      insuranceCarrier2: patientData ? patientData.insuranceCarrier2 : '',
      subscriberId2: patientData ? patientData.subscriberId2 : '',
      hasInsurance2: patientData ? patientData.hasInsurance2 : '',
      insuranceFirstName2: patientData ? patientData.insuranceFirstName2 : '',
      insuranceLastName2: patientData ? patientData.insuranceLastName2 : '',
      insuranceDob2: patientData ? patientData.insuranceDob2 : '',
      insurancePhone2: patientData ? patientData.insurancePhone2 : '',
      insuranceCountry2: patientData ? patientData.insuranceCountry2 : '',
      insuranceAddress2_2: patientData ? patientData.insuranceAddress2_2 : '',
      insuranceCity2: patientData ? patientData.insuranceCity2 : '',
      insuranceState2: patientData ? patientData.insuranceState2 : '',
      insuranceZip2: patientData ? patientData.insuranceZip2 : '',
      isValidInsurance2: patientData ? patientData.isValidInsurance2 : '',
      insuranceSubscriber2: patientData ? patientData.insuranceSubscriber2 : '',
      subscriberDob2: patientData ? patientData.subscriberDob2 : '',
    },

    validationSchema: insuranceSchema,
    validateOnChange: true,
    // isValidating: true,
    validateOnBlur: true,
    enableReinitialize: true,

    onSubmit: (values: any) => {
      onHandleFormSubmit(values);
    },
  });

  type TFormValues = {
    insuranceCarrier: string;
    subscriberId: string;
    hasInsurance: string;
    insuranceFirstName: string;
    insuranceLastName: string;
    insuranceDob: string;
    insurancePhone: string;
    insuranceCountry: string;
    insuranceAddress: string;
    insuranceAddress2_: string;
    insuranceCity: string;
    insuranceState: string;
    insuranceZip: string;
    subscriberDob: string;
    isValidInsurance: string;
    insuranceSubscriber: string;
    // Additional Insurance Fields
    insuranceCarrier2: string;
    subscriberId2: string;
    hasInsurance2: string;
    insuranceFirstName2: string;
    insuranceLastName2: string;
    insuranceDob2: string;
    insurancePhone2: string;
    insuranceCountry2: string;
    insuranceAddress2_2: string;
    insuranceCity2: string;
    insuranceState2: string;
    insuranceZip2: string;
    subscriberDob2: string;
    isValidInsurance2: string;
    insuranceSubscriber2: string;
  };
  // Function to reset Formik fields on back of insurance
  const resetInsuranceFields = (section?: number) => {
    const fieldNames = [
      'insuranceCarrier',
      'insuranceFirstName',
      'insuranceLastName',
      'insuranceDob',
      'insurancePhone',
      'insuranceCountry',
      'insuranceAddress',
      'insuranceAddress2_',
      'insuranceCity',
      'insuranceState',
      'insuranceZip',
      'isValidInsurance',
      'insuranceSubscriber',
      'subscriberDob',
    ];
    //set to empty
    fieldNames.forEach((field) => {
      setFieldValue(`${field}${section || ''}`, '');
    });
    // set the patient data also
    setPatientData((prev: any) => {
      const newData = { ...prev };
      fieldNames.forEach((field) => {
        newData[`${field}${section || ''}`] = '';
      });
      return newData;
    });
  };

  //  for loader
  const [isValidating, setIsValidating] = useState(false);
  //     to proceed to insurance steps
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Validation function to check if the subscriber ID is valid
  const validateSubscriberId = (subscriberId: string) => {
    // Define valid subscriber IDs
    const validSubscriberIds = ['1111c'];

    // Check if the provided subscriber ID is in the valid list
    return validSubscriberIds.includes(subscriberId);
  };
  //for validation of insurance - result show status
  const [isValidInsurance, setIsValidInsurance] = useState(false);
  const [validationStatus, setValidationStatus] = useState(0);
  // 1 = validating 2 = done 0 is default state

  // to update api here for checking
  const handleValidation = (subscriberId: string, onSuccess: () => void) => {
    setIsValidating(true);
    setValidationStatus(1);
    console.log(
      isValidInsurance,
      validationStatus,
      'isValidInsurance validationStatus',
    );
    // Simulate validation delay
    setTimeout(() => {
      if (validateSubscriberId(subscriberId)) {
        setValidationStatus(2);
        setIsValidInsurance(true); // if valid - passed from validate sub Id
        setIsValidating(false);
        // Simulate validation delay
        console.log(
          isValidInsurance,
          validationStatus,
          'isValidInsurance validationStatus',
        );

        // Proceed to next step after an additional 3-second delay
        setTimeout(() => {
          setValidationStatus(0);
          setIsValidInsurance(false); // Reset validation state for future submissions
          console.log(
            isValidInsurance,
            validationStatus,
            'isValidInsurance validationStatus',
          );

          onSuccess();
        }, 3000); // 3 seconds delay
      } else {
        setValidationStatus(2);
        setIsValidInsurance(false); // if not valid
        setIsValidating(false);
      }
    }, 2000); // Simulated validation time
  };

  // check field errors in each part of the steps, destructuring the formik set of fields
  //to check fields according to step = e.g in first step ( subsciberid and dob only)
  type FieldSets = {
    [key: string]: string[];
  };
  const checkErrors = async (section: keyof FieldSets): Promise<boolean> => {
    // Retrieve the fields based on the section
    const fields = fieldSets[section] || [];
    const errors = await validateForm();
    console.log(errors, 'errors');

    // Check if there are errors for the specified fields
    const hasErrors = fields.some((field: string | number) => errors[field]);
    console.log(hasErrors, 'hasss');
    return hasErrors;
  };
  const [errorUpload, setErrorUpload] = useState(false);
  const [frontInsuranceCard, setFrontInsuranceCard] = useState('');
  const [backInsuranceCard, setBackInsuranceCard] = useState('');

  const fieldSets: FieldSets = {
    doYouHaveInsurance: ['subscriberId', 'subscriberDob'],
    doYouHaveInsurance2: ['subscriberId2', 'subscriberDob2'],
    subscriberForm: [
      'insuranceSubscriber',
      'insuranceFirstName',
      'insuranceLastName',
      'insuranceDob',
      'insurancePhone',
      // 'insuranceCountry',
      'insuranceAddress',
      // 'insuranceAddress2_',
      'insuranceCity',
      // 'insuranceState',
      'insuranceZip',
      // 'isValidInsurance',
      // 'insuranceSubscriber',
      // 'subscriberDob',
    ],
    subscriberForm2: [
      'insuranceSubscriber2',
      'insuranceFirstName2',
      'insuranceLastName2',
      'insuranceDob2',
      'insurancePhone2',
      // // 'insuranceCountry2',
      'insuranceAddress2',
      // // 'insuranceAddress2_2',
      'insuranceCity2',
      // 'insuranceState2',
      'insuranceZip2',
      // 'isValidInsurance2',
      // 'insuranceSubscriber2',
      // 'subscriberDob2',
    ],
    // Add more field sets if needed
  };

  // Utility function to check if any field in the list is empty
  //for initial load
  const areFieldsEmpty = (fields: string[], values: any) => {
    return fields.some(
      (field) => !values[field] || values[field].trim() === '',
    );
  };

  // Function to check if the form is valid based on the current step
  const isFormValid = (section: keyof FieldSets, values: any): boolean => {
    const fields = fieldSets[section] || [];
    //if fields are empty return true -- is form valid? false - vice versa
    return !areFieldsEmpty(fields, values);
  };
  const [disableNext, setDisableNext] = useState(false);
  const [formStatus, setFormStatus] = useState(false);
  const onHandleFormSubmit = async (data: TFormValues) => {
    console.log(`test${JSON.stringify(data)}`);

    switch (currentStep) {
      case 1:
        //if user has insurance
        if (data[`hasInsurance`] === '1') {
          const errorsPresent = await checkErrors('doYouHaveInsurance');
          const formValid = isFormValid('doYouHaveInsurance', data);

          if (errorsPresent || !formValid) {
            console.error('Validation errors present or form is not valid');
            return; // Exit if there are errors or form is not valid
          }

          if (validateSubscriberId(data[`subscriberId`])) {
            handleValidation(data[`subscriberId`], () => {
              setCurrentStep(currentStep + 1);
            });
          }
          // Handle invalid subscriber ID scenario
          else {
            handleValidation(data[`subscriberId`], () => {});
            console.error('Invalidss subscriber ID');
          }
        }
        //if user has no insurance

        if (data[`hasInsurance`] === '0') {
          // next page if no
          setPatientData((prev: any) => ({ ...prev, ...data }));
          onHandleNext();
        }

        break;

      case 2:
        const errorsPresent = await checkErrors('subscriberForm');
        const formValid = isFormValid('subscriberForm', data);

        if (errorsPresent || !formValid) {
          console.error('Validation errors present or form is not valid');
          console.error(formValid, errorsPresent, 'dafak');
          return; // Exit if there are errors or form is not valid
        }

        setPatientData((prev: any) => ({ ...prev, ...data }));
        setCurrentStep(currentStep + 1);
        break;
      case 3:
        // Validate subscriber ID for step 3
        if (data[`hasInsurance2`] === '1') {
          const errorsPresent = await checkErrors('doYouHaveInsurance2');
          const formValid = isFormValid('doYouHaveInsurance2', data);

          if (errorsPresent || !formValid) {
            console.error('Validation errors present or form is not valid');
            return; // Exit if there are errors or form is not valid
          }


          if (validateSubscriberId(data[`subscriberId2`])) {
            handleValidation(data[`subscriberId2`], () => {
              setCurrentStep(currentStep + 1);
            });


          } else {
            handleValidation(data[`subscriberId2`], () => {});
            console.error('Invalidss subscriber ID');
            // Handle invalid subscriber ID scenario
          }
        } else {
          setPatientData((prev: any) => ({ ...prev, ...data }));
          onHandleNext();
        }
        break;
      case 4:
        const errorsPresent2 = await checkErrors('subscriberForm2');
        const formValid2 = isFormValid('subscriberForm2', data);

        if (errorsPresent2 || !formValid2) {
          console.error('Validation errors present or form is not valid');
          console.error(formValid2, errorsPresent2, 'dafak');
          return; // Exit if there are errors or form is not valid
        }

        setPatientData((prev: any) => ({ ...prev, ...data }));
        setCurrentStep(currentStep + 1);
        break;
      default:
        if (currentStep < 4) {
          setPatientData((prev: any) => ({ ...prev, ...data }));
          setCurrentStep(currentStep + 1);
        } else {
          setPatientData((prev: any) => ({ ...prev, ...data }));
          onHandleNext();
        }
        break;
    }
  };

  // if back is pressed and there are fields that are validated, clear form
  const handleBack = (values: TFormValues) => {
    if (currentStep > 1) {
      console.log(currentStep, 'back');
      console.log('Current Step:', currentStep);

      switch (currentStep) {
        case 2:
          resetInsuranceFields();
          setValidationStatus(0);
          break;
        case 4:
          resetInsuranceFields(2);
          break;
        default:
          if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
          } else {
            onHandleBack();
          }
          break;
      }
      setCurrentStep(currentStep - 1);
    } else {
      onHandleBack(); // Navigate to the previous page if at the beginning of the steps
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="h-full min-h-screen">
        <div
          className={`flex flex-1 flex-col p-6 ${values.insuranceSubscriber === '1' || values.insuranceSubscriber === undefined ? 'h-screen' : 'h-full'} `}
        >
          <div className="text-xl ">
            {(() => {
              switch (currentStep) {
                case 1:
                  return 'Do you have health insurance';
                case 2:
                  return 'Insurance Details';
                case 3:
                  return 'Do you have additional health insurance';
                case 4:
                  return 'Additional Insurance Details';
                default:
                  return 'Insurance';
              }
            })()}
          </div>

          {currentStep === 1 && (
            <DoYouHaveInsuranceForm
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              errors={errors}
              handleBlur={handleBlur}
              touched={touched}
              // handleCheckboxChange={handleCheckboxChange}
              isValidInsurance={isValidInsurance}
              isValidating={isValidating}
              validationStatus={validationStatus}
              section=""
            />
          )}
          {currentStep === 2 && (
            <SubscriberForm
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              section=""
              errors={errors}
              errorUpload={errorUpload}
              setErrorUpload={setErrorUpload}
              setFrontInsuranceCard={setFrontInsuranceCard}
              setBackInsuranceCard={setBackInsuranceCard}
            />
          )}
          {currentStep === 3 && (
            <DoYouHaveInsuranceForm
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              errors={errors}
              handleBlur={handleBlur}
              touched={touched}
              // handleCheckboxChange={handleCheckboxChange}
              isValidInsurance={isValidInsurance}
              isValidating={isValidating}
              validationStatus={validationStatus}
              section="2"
            />
          )}
          {currentStep === 4 && (
            <SubscriberForm
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              section="2"
              errors={errors}
              //insurance card
              errorUpload={errorUpload}
              setErrorUpload={setErrorUpload}
              setFrontInsuranceCard={setFrontInsuranceCard}
              setBackInsuranceCard={setBackInsuranceCard}
            />
          )}

          {/* Action */}
          <div
            className={` flex h-full items-end gap-4 ${values.insuranceSubscriber === '1' || values.insuranceSubscriber === undefined ? 'h-full' : 'h-full'}`}
          >
            <div className="w-2/6 ">
              <button
                id="back"
                onClick={(e) => {
                  e.preventDefault();
                  handleBack(values);
                }}
                className={` text-black h-10  w-full rounded-3xl border-2 border-slate-600  text-center font-semibold `}
              >
                <span className="flex items-center justify-center">Back</span>
              </button>
            </div>
            {values[`hasInsurance`] === '0' ||
            values[`hasInsurance`] === '1' ||
            values[`hasInsurance2`] === '0' ||
            values[`hasInsurance2`] === '1' ? (
              <div className="w-4/6">
                <button
                  // disabled={isValid && isFormValid ? false : true}
                  id="Next"
                  onClick={(e) => {
                    e.preventDefault();

                    onHandleFormSubmit(values);
                  }}
                  className={`w-full rounded-3xl bg-spruce-4 py-2 text-center font-semibold text-white`}
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
                      {currentStep === 1 && values[`hasInsurance`] === '1' ? (
                        <span>Validate</span>
                      ) : currentStep === 1 ? (
                        <span>Next</span>
                      ) : null}

                      {currentStep === 2 && <span>Next for Step 2</span>}

                      {currentStep === 3 && values[`hasInsurance2`] === '1' ? (
                        <span>Validate</span>
                      ) : currentStep === 3 ? (
                        <span>Next</span>
                      ) : null}

                      {currentStep === 4 && <span>Submit</span>}
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="w-4/6">
                <div className=" flex h-10 items-center justify-center gap-2.5 rounded-[100px] px-4 ">
                  <div className=" text-sm font-normal text-[#5e6366]">
                    Select an option to proceed
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

const SubscriberForm = ({
  values,
  handleChange,
  handleBlur,
  touched,
  section,
  errors,
  //insurancecard
  errorUpload,
  setErrorUpload,
  setFrontInsuranceCard,
  setBackInsuranceCard,
}: {
  errors: any;
  values: any;
  handleChange: any;
  handleBlur: any;
  touched: any;
  section: any;
  //insurance cards
  errorUpload: any;
  setErrorUpload: any;
  setFrontInsuranceCard: any;

  setBackInsuranceCard: any;
}) => (
  <div
    id="subsciberSection"
    className={`mb-4 mt-4 flex h-full flex-1 flex-col `}
  >
    {/* Who is the subscriber */}
    <div className="relative mt-4 items-center">
      <select
        id="insuranceSubscriber"
        name={`insuranceSubscriber${section}`}
        value={values[`insuranceSubscriber${section}`] || ''}
        onChange={handleChange}
        className={`w-full rounded-lg border border-poise-2 px-4 py-2 pt-6  ${
          touched.insuranceSubscriber && errors.insuranceSubscriber
            ? 'border-red-500'
            : 'border-poise-2'
        }  `}
      >
        <option disabled defaultValue="">
          -- Select an Option --
        </option>
        <option value="1">Patient</option>
        <option value="2">Spouse</option>
        <option value="3">Mother</option>
        <option value="4">Father</option>
        <option value="5">Guardian</option>
      </select>

      <label
        htmlFor="insuranceSubscriber"
        className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
      >
        Who is the subscriber?
      </label>
    </div>

    <div
      className={`flex h-full flex-1 flex-col ${values[`insuranceSubscriber${section}`] === '1' || values[`insuranceSubscriber${section}`] === '' ? 'hidden' : 'block'}`}
    >
      {/* First Name */}
      <div className="relative mt-4 items-center">
        <input
          id="firstName"
          placeholder="John"
          name={`insuranceFirstName${section}`}
          value={values[`insuranceFirstName${section}`] || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`border ${
            touched.insuranceFirstName && errors.insuranceFirstName
              ? 'border-red-500'
              : 'border-poise-2'
          }  w-full rounded-lg px-4 py-2 pt-6 `}
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
          onChange={handleChange}
          name={`insuranceLastName${section}`}
          onBlur={handleBlur}
          value={values[`insuranceLastName${section}`] || ''}
          className={`${
            touched.insuranceLastName && errors.insuranceLastName
              ? 'border-red-500'
              : 'border-poise-2'
          }  w-full rounded-lg border px-4 py-2 pt-6`}
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
          // name="dob"
          name={`insuranceDob${section}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[`insuranceDob${section}`] || ''}
          className={`${
            touched.insuranceDob && errors.insuranceDob
              ? 'border-red-500'
              : 'border-poise-2'
          } w-full rounded-lg border  py-2 pl-4 pt-6 text-black-4`}
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
            name={`insurancePhone${section}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[`insurancePhone${section}`] || ''}
            placeholder="(555) 555-5555"
            className={`${
              touched.insurancePhone && errors.insurancePhone
                ? 'border-red-500'
                : 'border-poise-2'
            }  w-full rounded-lg border px-4 py-2 pt-6`}
          ></input>
          <label className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4">
            Phone Number
          </label>
        </div>
      </div>

      {/* Same as Patient */}
      <div className="relative mt-4 items-center">
        <input
          type="checkbox"
          name="sameAsPatientChkBox"
          id="sameAsPatientChkBox"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Same address as patient"
          className=" rounded-md border-poise-2 px-2 py-2 pt-2"
        ></input>
        <label
          htmlFor="sameAsPatientChkBox"
          className="absolute left-0 top-0 ml-8 mt-1 text-sm text-black-4"
        >
          Same as patient
        </label>
      </div>

      {/* Address */}
      <div className="relative mt-4">
        <input
          type="text"
          id="address"
          name={`insuranceAddress${section}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[`insuranceAddress${section}`] || ''}
          placeholder="999 High Garden"
          className={` ${
            touched.insuranceAddress && errors.insuranceAddress
              ? 'border-red-500'
              : 'border-poise-2'
          }  w-full rounded-lg border  px-4 py-2 pt-6`}
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
          name={`insuranceAddress2_${section}`}
          onChange={handleChange}
          value={values[`insuranceAddress2_${section}`] || ''}
          placeholder="#1"
          className={`w-full rounded-lg border border-poise-2 px-4 py-2 pt-6`}
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
          name={`insuranceCity${section}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[`insuranceCity${section}`] || ''}
          placeholder="Winterfell"
          className={`${
            touched.insuranceCity && errors.insuranceCity
              ? 'border-red-500'
              : 'border-poise-2'
          } w-full rounded-lg border border-poise-2 px-4 py-2 pt-6`}
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
            // name="state"
            id="state"
            name={`insuranceState${section}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[`insuranceState${section}`] || ''}
            className={` ${
              touched.insuranceState && errors.insuranceState
                ? 'border-red-500'
                : 'border-poise-2'
            } w-full rounded-lg px-4 py-2 pt-6`}
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
            name={`insuranceZip${section}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[`insuranceZip${section}`] || ''}
            className={` ${
              touched.insuranceZip && errors.insuranceZip
                ? 'border-red-500'
                : 'border-poise-2'
            }   w-full rounded-lg border-poise-2 px-4 py-2 pt-6`}
          ></input>
          <label className="absolute left-0 top-0 ml-8 mt-2 text-xs text-black-4">
            Zip / Postal Code
          </label>
        </div>
      </div>

      {/* <div className=" text-black pt-8 text-base font-medium">
        Upload insurance card
      </div>
      <div className="text-black text-sm font-normal">
        If you have a digital insurance card, download or screenshot both sides
        to upload.
      </div> */}

      {/* <Identification /> */}
      {/* Insurance Front Card */}
      {/* <div className="relative mt-4">
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
                Place card on a flat, well-lit surface and tap the button below
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
      </div> */}

      {/* Insurance Back Card */}
      {/* <div className="relative mt-4">
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
                Place card on a flat, well-lit surface and tap the button below
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
      </div> */}

      {/* Action */}
    </div>
  </div>
);

{
  /* Do you have insurance */
}
const DoYouHaveInsuranceForm = ({
  values,
  handleChange,
  setFieldValue,
  errors,
  handleBlur,
  touched,
  // handleCheckboxChange,
  isValidInsurance,
  isValidating,
  validationStatus,
  section,
}: {
  values: any;
  handleChange: any;
  setFieldValue: any;
  errors: any;
  handleBlur: any;
  touched: any;
  // handleCheckboxChange: any;
  isValidInsurance: any;
  isValidating: any;
  validationStatus: any;
  section: any;
}) => (
  <>
    <div className={`flex flex-col `}>
      <div className="relative mt-4 items-center">
        <div className="flex gap-4">
          <div className="flex h-6 w-6 justify-center self-center rounded-lg border border-sky-700 p-0.5">
            <input
              id="hasInsurance"
              type="checkbox"
              disabled={isValidating || isValidInsurance === 0}
              name="hasInsurance"
              onBlur={handleBlur}
              checked={values[`hasInsurance${section}`] === '1'}
              onChange={() => setFieldValue(`hasInsurance${section}`, '1')}
              // onChange={() => handleCheckboxChange('1')}
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
    {/* Carrier section */}
    {values[`hasInsurance${section}`] === '1' && (
      <div
        id="carrierSection"
        className={`flex h-full flex-1 flex-col bg-[#e8f2f5] ${!isValidating && validationStatus === 2 && !isValidInsurance ? 'bg-[#d13e27]/10' : ''} p-4`}
      >
        {/* Who is the insurance carrier */}
        <div className="relative mt-4 items-center">
          <div>
            <select
              id="insuranceCarrier"
              name={`insuranceCarrier${section}`}
              value={values[`insuranceCarrier${section}`] || ''}
              onChange={handleChange}
              disabled={
                isValidating || (validationStatus === 2 && isValidInsurance)
              }
              // onBlur={handleBlur}

              className={`  ${!isValidating && validationStatus == 0 && isValidInsurance ? 'border-[#d13e27]' : 'border-[#dbddde]'}   ${isValidating ? ' flex-col border border-[#dbddde] bg-[#e8f2f5]  text-[#6e787a] opacity-70' : 'border'} w-full rounded-lg  px-4 py-2 pt-6 ${!isValidating && validationStatus == 2 ? 'text-[#2a2f31]' : ''} `}
            >
              <option value="Cigna HMO/PPO">Cigna HMO/PPO</option>
              <option value="Kaiser Permanente">Kaiser Permanente</option>
            </select>
            {/* <svg
              className={` absolute left-[85%] top-4  mt-2  rounded-full  bg-slate-200 text-xs ${values[`isValidInsuranc${section}`] || ''} !== 'true' ? 'hidden' : 'block'} `}
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
            </svg> */}
          </div>
          <label
            htmlFor="insuranceCarrier"
            className={`absolute ${isValidating ? 'bg-[#e8f2f5]' : ''} left-0 top-0 ml-4 mt-2 text-xs text-black-4 `}
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
                name={`subscriberId${section}`}
                value={values[`subscriberId${section}`] || ''}
                onChange={handleChange}
                disabled={
                  isValidating || (validationStatus === 2 && isValidInsurance)
                }
                onBlur={handleBlur}
                // name="subscriberId"
                className={` border
                  ${isValidating 
                    ? 'border-[#dbddde] bg-[#e8f2f5] text-[#6e787a] opacity-70'
                    : validationStatus === 2 
                      ? isValidInsurance 
                        ? 'border-[#6ea787a]' 
                        : 'border-red-500' 
                      : 'border-[#6e787a]'
                  } 
                  ${!values[`subscriberId${section}`] 
                    ? 'border-red-500' 
                    : 'border-[#6e787a]'
                  } 
                  w-full rounded-lg px-4 py-2 pt-6
                `}
              />

              <svg
                className={` absolute left-[90%] top-4  mt-2  rounded-full  bg-slate-200 text-xs ${values.isValidInsurance !== 'true' ? 'hidden' : 'block'}  ${isValidating ? 'bg-[#e8f2f5]' : ''}`}
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
              className={`absolute left-0 top-0 ml-4  mt-2 text-xs text-black-4  ${isValidating ? 'bg-[#e8f2f5]' : ''}`}
            >
              Subscriber Id
            </label>
          </div>
          
          <div className=" text-sm text-black-2">
            This is NOT group, issuer, or RX number and may contain letters and
            numbers.
          </div>
        </div>

        {/* Add Subscriber Date of Birth */}
        <div className={`  relative flex w-full`}>
          <input
            type="date"
            id="subscriberDob"
            name={`subscriberDob${section}`}
            value={values[`subscriberDob${section}`] || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={
              isValidating || (validationStatus === 2 && isValidInsurance)
            }
            // ${isValidInsurance  ? 'border-[#dbddde]' : 'border-[#d13e27]'}

            className={`border
              ${isValidating 
                ? 'border-[#dbddde] bg-[#e8f2f5] text-[#6e787a] opacity-70'
                : validationStatus === 2 
                  ? isValidInsurance 
                    ? 'border-[#6e787a]' 
                    : 'border-red-500' 
                  : 'border-[#6e787a]'
              }
              ${!values[`subscriberDob${section}`] 
                ? 'border-red-500' 
                : 'border-[#6e787a]'
              } 
              w-full appearance-none rounded-lg px-4 py-2 pt-6
              ${touched[`subscriberDob${section}`] && errors[`subscriberDob${section}`] 
                ? 'border-red-500' 
                : 'border-[#6e787a]'
              }
            `}
            placeholder="mm/dd/yyyy"
          ></input>

          <label
            htmlFor="subscriberDobLbl"
            className={`absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4 $${errors[`dateOfBirth${section}`] || ''} ? 'text-zest-6' : ''}`}
          >
            Subscriber Date of Birth
            <span className={`text-xs font-normal text-zest-6 `}></span>
          </label>
          <img
            alt="Calendar"
            src="../assets/images/Calendar.svg"
            className="absolute right-0 top-0 z-10 mr-[15px] mt-[29px] w-4 items-end justify-end"
          ></img>
        </div>

        <div className={`pl-4 text-xs font-normal text-zest-6`}>
          {errors[`dateOfBirth${section}`] as string}
        </div>

        {!isValidating && validationStatus == 2 && (
          <div
            className={`${isValidInsurance ? 'bg-[#31936e]/25  text-status-green-text' : ' bg-[#d13e27]/25 text-status-red-text'} mt-4 inline-flex h-[33px] items-center justify-center gap-2.5 rounded px-3 py-2`}
          >
            <div className={`text-center text-sm font-bold `}>
              {isValidInsurance ? 'Valid Insurance' : 'Invalid Insurance'}
            </div>
          </div>
        )}
      </div>
    )}

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
              disabled={isValidating}
              name={`hasInsurance${section}`}
              checked={values[`hasInsurance${section}`] === '0'}
              onChange={() => setFieldValue(`hasInsurance${section}`, '0')}
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
    <></>
  </>
);
