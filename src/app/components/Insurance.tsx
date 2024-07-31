import React, { use, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { FormProvider, useFormState } from './FormContext';
import DoYouHaveInsuranceForm from './InsuranceForms/DoYouHaveInsuranceForm';
import SubscriberForm from './InsuranceForms/SubscriberForm';
import { validateSubscriberId } from '../actions/api';
import { on } from 'events';

export default function Insurance() {
  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState<FormValues>({});
  const [isValidInsurance, setIsValidInsurance] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState(0);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);

  const updateValues = (newValues: any) => {
    setValues((prevValues) => ({ ...prevValues, ...newValues }));
  };
  const { onHandleNext, onHandleBack, setInsuranceData, insuranceData } =
    useFormState();
  const onHandleFormSubmit = async (data: any) => {
    // updateValues(data);

    switch (currentStep) {
      case 1:
        if (data.hasInsurance === '1') {
          setTriggerValidation(true);
          console.log(`triggerValidation`, triggerValidation);

          console.log(isValidInsurance, 'parent validity');
          console.log(isValidating, 'parent setIsValidating');

          // Proceed to next step after an additional 3-second delay
          setTimeout(() => {
            if (isValidInsurance) {
              setCurrentStep(currentStep + 1);
              setIsValidInsurance(false);
              setIsValidating(false);

              console.log(isValidInsurance, 'parent isValidInsurance');
            }
          }, 3000); // 3 seconds delay
        } else {
          //no insurance
          onHandleNext();
        }
        break;

      case 2:
        setTriggerNext(true);
        
        setCurrentStep(currentStep + 1);

        console.log(currentStep, 'currentstep');
        setIsValidInsurance(false);
        setIsValidating(false);
        setTriggerValidation(false);
        // Handle subscriber form submission

        // setCurrentStep(currentStep + 1);
        // // setTriggerNext(false);

        console.log(`test${JSON.stringify(data)}`);
        console.log(`triggerNext`, triggerNext);

        break;

      case 3:
        if (data.hasInsurance2 === '1') {
          setTriggerValidation(true);
          console.log(isValidInsurance, 'parent validity');
          console.log(isValidating, 'parent setIsValidating');

          // Proceed to next step after an additional 3-second delay
          setTimeout(() => {
            if (isValidInsurance) {
              setCurrentStep(currentStep + 1);
              setIsValidInsurance(false);
              console.log(isValidInsurance, 'parent isValidInsurance');
            }
          }, 3000); // 3 seconds delay
        } else {
          //no insurance
          onHandleNext();
        }
        break;

      case 4:
        // Handle additional subscriber form submission
        setCurrentStep(currentStep + 1);
        break;

      default:
        // Handle form completion
        break;
    }
  };

  useEffect(() => {
    if (triggerNext) {
      onHandleFormSubmit(values);
      console.log('Trigger Next is set to true', triggerNext);
      setTriggerNext(false); // Reset triggerNext after use
    }
  }, [triggerNext]);
  useEffect(() => {
    if (isValidInsurance) {
      onHandleFormSubmit(values);
    }
    // if (triggerNext) {
    //   setTriggerNext(triggerNext);
    //   onHandleFormSubmit(values);

    // }
  }, [isValidInsurance]);

  const handleBack = () => {
    if (currentStep > 1) {
      setIsValidInsurance(false);
      setIsValidating(false);
      setTriggerValidation(false);
      // setTriggerNext(false);
      setCurrentStep(currentStep - 1);
    } else {
      onHandleBack();
    }
  };
  interface FormValues {
    hasInsurance?: string;
    subscriberId?: string;
    // Add other fields as needed
    hasInsurance2?: string;
    subscriberId2?: string;
  }

  return (
    <FormProvider>
      {/* <form onSubmit={(e) => e.preventDefault()} className="flex flex-1 flex-col"> */}
      <div className={`flex flex-1 flex-col p-6`}>
        <div className="text-xl">
          {currentStep === 1
            ? 'Do you have health insurance'
            : currentStep === 2
              ? 'Insurance Details'
              : currentStep === 3
                ? 'Do you have additional health insurance'
                : currentStep === 4
                  ? 'Additional Insurance Details'
                  : 'Insurance'}
        </div>

        {currentStep === 1 && (
          <DoYouHaveInsuranceForm
            section=""
            isValidInsurance={isValidInsurance}
            setIsValidInsurance={setIsValidInsurance} // Pass
            isValidating={isValidating}
            setIsValidating={setIsValidating} // Pass
            onSubmit={updateValues} // update the checkbox values to parent
            hasInsurance={values.hasInsurance || ''}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        )}
        {currentStep === 2 && (
          <SubscriberForm
            section=""
            onSubmit={updateValues}
            triggerNext={triggerNext}
            setTriggerNext={setTriggerNext}
          />
        )}
        {currentStep === 3 && (
          <DoYouHaveInsuranceForm
            section="2"
            isValidInsurance={isValidInsurance}
            setIsValidInsurance={setIsValidInsurance} // Pass
            isValidating={isValidating}
            setIsValidating={setIsValidating} // Pass
            onSubmit={updateValues} // update the checkbox values to parent
            hasInsurance={values.hasInsurance || ''}
            triggerValidation={triggerValidation}
            setTriggerValidation={setTriggerValidation}
          />
        )}
        {currentStep === 4 && (
          <SubscriberForm
            section="2"
            onSubmit={updateValues}
            triggerNext={triggerNext}
            setTriggerNext={setTriggerNext}
          />
        )}

        {/* Action */}
        <div className={` flex h-full items-end gap-4 `}>
          <div className="w-2/6 ">
            <button
              id="back"
              onClick={() => {
                // e.preventDefault();
                handleBack();
              }}
              disabled={isValidating || isValidInsurance ? true : false}
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
                disabled={isValidating || isValidInsurance ? true : false}
                id="Next"
                type="submit"
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
                    {currentStep === 1 && values.hasInsurance === '1' ? (
                      <span>Validate Insurance</span>
                    ) : currentStep === 1 ? (
                      <span>Next</span>
                    ) : null}

                    {currentStep === 2 && <span>Next</span>}

                    {currentStep === 3 && values.hasInsurance === '1' ? (
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
      {/* </form> */}
    </FormProvider>
  );
}
