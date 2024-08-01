import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useFormState } from '../FormContext';
import {
  doYouHaveInsuranceSchema,
  doYouHaveInsuranceSchema2,
} from '@/schemas/insurance';
import { validateSubscriberId } from '../../actions/api';
const DoYouHaveInsuranceForm = ({
  section,
  isValidInsurance,
  setIsValidInsurance,
  isValidating,
  setIsValidating,
  onSubmit,
  triggerValidation,
  setTriggerValidation,
}: {
  onSubmit: any;
  section: any;
  isValidInsurance: boolean;
  isValidating: any; // Make statusUpdate optional
  setIsValidInsurance: (isValidInsurance: boolean) => void;
  setIsValidating: (isValidating: boolean) => void;

  setTriggerValidation: (triggerValidation: boolean) => void;
  hasInsurance: any;
  triggerValidation: any;
}) => {
  const { setInsuranceData, insuranceData } = useFormState();

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      [`insuranceCarrier${section}`]: insuranceData
        ? insuranceData[`insuranceCarrier${section}`]
        : '',
      [`subscriberId${section}`]: insuranceData
        ? insuranceData[`subscriberId${section}`]
        : '',
      [`hasInsurance${section}`]: insuranceData
        ? insuranceData[`hasInsurance${section}`]
        : '',
      // ... other dynamic fields for the section
    },
    validationSchema:
      section === '2' ? doYouHaveInsuranceSchema2 : doYouHaveInsuranceSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      onHandleFormSubmit(values);
    },
  });

  const [validationStatus, setValidationStatus] = useState('');
  // const {
  //   values,
  //   errors,
  //   handleChange,
  //   handleBlur,
  //   setFieldValue,
  //   handleSubmit,
  // } = formik;

  const handleCheckboxChange = (value: any) => {
    setValidationStatus('');

    setFieldValue(`hasInsurance${section}`, value);
    console.log(
      'isValidating',
      isValidating,
      'isValidInsurance',
      isValidInsurance,
      'validationStatus',
      validationStatus,
    );

    // Notify parent of the change
    onSubmit({
      ...values,
      [`hasInsurance${section}`]: value,
    });
  };

  const validate = async () => {
    setIsValidating(true);
    setValidationStatus('validating');
    console.log(isValidInsurance, validationStatus, ' validating');
  
    // Simulate validation delay
    setTimeout(async () => {
      if (await validateSubscriberId(values[`subscriberId${section}`])) {
        onSubmit((prev:any) => ({ ...prev, ...values }));
        onHandleFormSubmit(values);
  
        // Update parent state
        console.log('child isVALIDInsursa:', isValidInsurance);
        console.log('onSubmit insurance data:', values);
  
        setIsValidInsurance(true);
        setValidationStatus('done');
      } else {
        setTriggerValidation(false);
        setValidationStatus('done');
      }
  
      // Reset state after validation
      setIsValidating(false);
      setTriggerValidation(false);
    }, 2000); // Simulated validation time
  };

  useEffect(() => {
    if (triggerValidation) {
      validate();
    }
  }, [triggerValidation]);
  // useEffect(() => {
  //   if(currentStep)
  //     validate();
  //     console.log("current", currentStep)

  // }, [currentStep]);

  const onHandleFormSubmit = (data: any) => {
    setInsuranceData((prev: any) => ({ ...prev, ...data }));
    setValidationStatus('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`flex flex-col `}>
          <div className="relative mt-4 items-center">
            <div
              onClick={() => {
                if (!isValidating) handleCheckboxChange('1');
              }}
              className="flex gap-4"
            >
              <div
                onClick={() => handleCheckboxChange('1')}
                className={`border-1 flex h-6 w-6 justify-center self-center rounded-lg border  ${values[`hasInsurance${section}`] === '1' ? 'border-sky-700 ' : 'border-[#DBDDDE] '} `}
              >
                <div
                  className={`flex h-5 w-5 justify-center self-center rounded-md  ${values[`hasInsurance${section}`] === '1' ? 'border border-sky-700 bg-sky-700' : ''} `}
                >
                  <input
                    type="checkbox"
                    disabled={isValidating || isValidInsurance}
                    name="hasInsurance"
                    onBlur={handleBlur}
                    checked={values[`hasInsurance${section}`] === '1'}
                    onChange={() => handleCheckboxChange('1')}
                    className={`peer-not h-5 w-5 appearance-none ${values[`hasInsurance${section}`] === '1' ? 'invisible' : ''}  rounded-md border-hidden `}
                  ></input>
                </div>
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
        </div>
        {/* Carrier section */}
        {values[`hasInsurance${section}`] === '1' && (
          <div
            id="carrierSection"
            className={`flex flex-1 flex-col ${!isValidating && validationStatus === 'done' && !isValidInsurance ? 'bg-[#d13e27]/10' : 'bg-[#e8f2f5] '} p-4`}
          >
            {/* Who is the insurance carrier */}
            <div className="relative mt-4 items-center">
              <div>
                <select
                  id="insuranceCarrier"
                  name={`insuranceCarrier${section}`}
                  value={values[`insuranceCarrier${section}`]}
                  onChange={handleChange}
                  disabled={
                    isValidating ||
                    (validationStatus === 'done' && isValidInsurance)
                  }
                  // onBlur={handleBlur}

                  className={`  ${!isValidating && validationStatus == 'done' && !isValidInsurance ? 'border-[#d13e27]' : 'border-[#dbddde]'}   ${isValidating ? ' flex-col border border-[#dbddde] bg-[#e8f2f5]  text-[#6e787a] opacity-70' : 'border'} w-full rounded-lg  py-2 pl-3 pt-6 ${!isValidating && validationStatus == 'done' ? 'text-[#2a2f31]' : ''} `}
                >
                  <option disabled value={''}>
                    Choose Carrier
                  </option>
                  <option value="Cigna HMO/PPO">Cigna HMO/PPO</option>
                  <option value="Kaiser Permanente">Kaiser Permanente</option>
                </select>
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
                      isValidating ||
                      (validationStatus === 'done' && isValidInsurance)
                    }
                    onBlur={handleBlur}
                    // name="subscriberId"
                    className={` border
                  ${
                    isValidating
                      ? 'border-[#dbddde] bg-[#e8f2f5] text-[#6e787a] opacity-70'
                      : validationStatus === 'done'
                        ? isValidInsurance
                          ? 'border-[#6ea787a]'
                          : 'border-red-500'
                        : 'border-[#6e787a]'
                  } 
                  ${
                    errors[`subscriberId${section}`]
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
                  className={`absolute left-0 top-0 ml-4  mt-2 text-xs text-black-4 ${errors[`subscriberId${section}`] ? 'text-status-red-text' : ''}   ${isValidating ? 'bg-[#e8f2f5]' : ''}`}
                >
                  Subscriber ID{' '}
                  <span className={`text-xs font-normal text-zest-6 `}>*</span>
                </label>
              </div>
              <span
                className={`pl-2 text-xs font-normal ${errors[`subscriberId${section}`] ? 'block' : 'hidden'} text-zest-6 `}
              >
                {errors[`subscriberId${section}`] as string}
              </span>
              <div className=" mb-2 pl-1 text-sm text-black-2">
                This is NOT group, issuer, or RX number and may contain letters
                and numbers.
              </div>
            </div>

            {!isValidating && validationStatus == 'done' && (
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
            <div
              onClick={() => {
                if (!isValidating) handleCheckboxChange('0');
              }}
              className="flex gap-4"
            >
              <div
                className={`border-1 flex h-6 w-6 justify-center self-center rounded-lg border  ${values[`hasInsurance${section}`] === '0' ? 'border-sky-700 ' : 'border-[#DBDDDE] '} `}
              >
                <div
                  className={`flex   h-5  w-5 justify-center self-center rounded-md  ${values[`hasInsurance${section}`] === '0' ? 'bg-sky-700 ' : ''}`}
                >
                  <input
                    id="hasInsurance"
                    type="checkbox"
                    disabled={isValidating}
                    name={`hasInsurance${section}`}
                    checked={values[`hasInsurance${section}`] === '0'}
                    onChange={() => handleCheckboxChange('0')}
                    className={`peer-not h-5 w-5 appearance-none ${values[`hasInsurance${section}`] === '0' ? 'invisible' : ''}  rounded-md border-hidden `}
                  ></input>
                </div>
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
        </div>
        <></>
      </form>
    </>
  );
};

export default DoYouHaveInsuranceForm;
