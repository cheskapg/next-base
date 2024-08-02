import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useFormState } from '../FormContext';
import { subscriberSchema, subscriberSchema2 } from '@/schemas/insurance';
import { checkPrice, updateInsuranceDetails } from '@/actions/api';
import ImageUpload from '../Fields/ImageUpload';
interface SubscriberFormProps {
  section: any;
  patientData: any;
  currentStep: any;
  isSubmitting: boolean;
  onSubmit: any;
  triggerSubmit: boolean;
  setTriggerSubmit: (triggerSubmit: boolean) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setCurrentStep: (currentStep: number) => void;
  handleErrors: (errors: any) => void; // Add this prop
}
const SubscriberForm = ({
  section,
  patientData,
  currentStep,
  isSubmitting,
  onSubmit,
  triggerSubmit,
  setTriggerSubmit,
  setIsSubmitting,
  setCurrentStep,
  handleErrors,
}: SubscriberFormProps) => {
  const { setInsuranceData, insuranceData, onHandleNext } =
    useFormState();

  const initialValues = {
    [`insuranceFirstName${section}`]: insuranceData
      ? insuranceData[`insuranceFirstName${section}`]
      : '',
    [`insuranceLastName${section}`]: insuranceData
      ? insuranceData[`insuranceLastName${section}`]
      : '',
    [`insuranceDob${section}`]: insuranceData
      ? insuranceData[`insuranceDob${section}`]
      : '',
    [`insurancePhone${section}`]: insuranceData
      ? insuranceData[`insurancePhone${section}`]
      : '',
    [`insuranceAddress${section}`]: insuranceData
      ? insuranceData[`insuranceAddress${section}`]
      : '',
    [`insuranceAddress2_${section}`]: insuranceData
      ? insuranceData[`insuranceAddress2_${section}`]
      : '',
    [`insuranceCity${section}`]: insuranceData
      ? insuranceData[`insuranceCity${section}`]
      : '',
    [`insuranceState${section}`]: insuranceData
      ? insuranceData[`insuranceState${section}`]
      : '',
    [`insuranceZip${section}`]: insuranceData
      ? insuranceData[`insuranceZip${section}`]
      : '',
    [`insuranceSubscriber${section}`]: insuranceData
      ? insuranceData[`insuranceSubscriber${section}`]
      : '',

    [`frontInsuranceCard${section}`]: insuranceData
      ? insuranceData[`frontInsuranceCard${section}`]
      : '',
    [`backInsuranceCard${section}`]: insuranceData
      ? insuranceData[`backInsuranceCard${section}`]
      : '',
  };

  const validationSchema =
    section === '2' ? subscriberSchema2 : subscriberSchema;

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setTouched,
    setErrors,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      onHandleFormSubmit(values);
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [sameAsPatient, setSameAsPatient] = useState(false);

  const {
    insuranceAddress1,
    insuranceAddress2,
    insuranceCity,
    insuranceState,
    insuranceZip,
  } = values;
  const handleSameAsPatientChange = (e: any) => {
    setSameAsPatient(e.target.checked);
    console.log(patientData, 'patientData');
  };

  useEffect(() => {
    if (sameAsPatient) {
      setFieldValue(`insuranceAddress${section}`, patientData.addressLine1);
      setFieldValue(`insuranceAddress2_${section}`, patientData.addressLine2);
      setFieldValue(`insuranceCity${section}`, patientData.city);
      setFieldValue(`insuranceState${section}`, patientData.state);
      setFieldValue(`insuranceZip${section}`, patientData.zipCode);
    }
  }, [sameAsPatient]);

  useEffect(() => {
    if (values[`insuranceSubscriber${section}`] === 'Patient') {
      setTouched({}, false);
      setErrors({});
      // setValues(initialValues);
      //set patient subscriber if patient sub filll data
      handleErrors(errors); // Pass the current errors to the parent component
    } else {
      handleErrors(errors); // Pass the current errors to the parent component
      console.log(errors, "errors'");
    }
  }, [errors, handleErrors, values[`insuranceSubscriber${section}`]]);
  const [errorUpload, setErrorUpload] = useState(false);
  const [frontInsuranceCard, setFrontInsuranceCard] = useState('');
  const [backInsuranceCard, setBackInsuranceCard] = useState('');

  const [isValid, setIsValid] = useState(false);

  const handleCheckPrice = async (copay: string) => {
    try {
      const isValid = await checkPrice(copay);
      setIsValid(isValid);
      console.error(isValid);
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleFormSubmit = async (data: TFormValues) => {
    setIsSubmitting(true);
  
    try {
      const response = await updateInsuranceDetails(data);
      const updatedInsuranceData = response; // assuming the API returns the updated insurance data
  
      setInsuranceData((prev: any) => ({ ...prev, ...data }));
      console.log(`subscriber test: ${JSON.stringify(data)}`);
      onSubmit(data);
  
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        setTriggerSubmit(false);
        onHandleNext(); // navigate to the next step
        console.log('handlenext');
      } else {
        console.log('handlenext');
      }
    } catch (error) {
      console.log(error);
      alert('Oops! Something went wrong. Please try again');
    } finally {
      setIsSubmitting(false);
      setTriggerSubmit(false);
    }
  };
  useEffect(() => {
    if (triggerSubmit) {
      setIsSubmitting(true);

      onHandleFormSubmit(values);
      console.log(isSubmitting, 'is submitting child');
    } else {
      setIsSubmitting(false);
    }
  }, [triggerSubmit]);

  type TFormValues = {
    insuranceCarrier: string;
    subscriberId: string;
    hasInsurance: string;
    insuranceFirstName: string;
    insuranceLastName: string;
    insuranceDob: string;
    insurancePhone: string;
    insuranceAddress: string;
    insuranceAddress2: string;
    insuranceCity: string;
    insuranceState: string;
    insuranceZip: string;
    isValidInsurance: string;
    insuranceSubscriber: string;
    //insurance card

    frontInsuranceCard: string;
    backInsuranceCard: string;

    //additional subscriber
    insuranceCarrier2: string;
    subscriberId2: string;
    hasInsurance2: string;
    insuranceFirstName2: string;
    insuranceLastName2: string;
    insuranceDob2: string;
    insurancePhone2: string;
    insuranceAddress2_2: string;
    insuranceCity2: string;
    insuranceState2: string;
    insuranceZip2: string;
    isValidInsurance2: string;
    insuranceSubscriber2: string;
    //insurance card

    frontInsuranceCard2: string;
    backInsuranceCard2: string;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* //enable button for price checking test */}
        {/* <button
          // id="submit"
          type="button"
          onClick={() => {
            handleCheckPrice('30'); //
          }}
          className={` text-black h-10  w-full rounded-3xl border-2 border-slate-600  text-center font-semibold `}
        >
          <span className="flex items-center justify-center">check price</span>
        </button> */}
        <div className="mt-4 inline-flex  flex-col items-start justify-center gap-2.5 rounded bg-[#ebf9f1] p-3">
          <div className="inline-flex items-center justify-start gap-1">
            <div className="flex h-5 w-5 items-center justify-center rounded-[500px] p-0.5">
              <img
                alt="Check Green"
                src="../assets/images/u_check.svg"
                className="relative flex h-4 w-4 flex-col items-start justify-start"
              />
            </div>
            <div className="text-center text-sm font-bold text-[#066632]">
              Your insurance is valid.
            </div>
          </div>
          <div className="flex flex-col items-start justify-center ">
            {isValid ? (
              <>
                <div className="self-stretch">
                  <div>
                    <span className="text-black text-sm font-bold">
                      Estimated copay:{' '}
                    </span>
                    <span className="text-black text-sm font-normal ">
                      $30*.
                    </span>
                  </div>
                  <span className="text-black text-sm font-bold">
                    *Your final responsibility may include deductible or
                    co-insurance amounts based on your plan.
                  </span>
                  <span className="text-black text-sm font-normal"> </span>
                  <span className="text-black text-sm font-normal">
                    Info shown is from your insurance company as of today’s date
                    and is an estimate of your copay.
                  </span>
                </div>
                <div className=" mt-2 inline-flex items-center justify-start gap-2.5 self-stretch">
                  <div className="flex h-5 w-5 items-center justify-center">
                    <div className="font-['Font Awesome 6 Pro'] h-5 w-5 text-center text-base font-black text-[#066632]">
                      ⚠
                    </div>
                  </div>
                  <div className="text-black shrink grow basis-0 text-xs font-normal">
                    Please bring your insurance card with you when you arrive at
                    the center.
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div>
                  <span className="text-black text-sm font-bold  ">
                    Estimated copay:{' '}
                  </span>
                  <span className="text-black text-sm font-normal  ">
                    We are unable to calculate your copay at this time. If you
                    owe a copay, a staff member will provide you with the amount
                    due prior to your visit*.
                  </span>
                </div>
                <div>
                  <span className="text-black text-xs font-bold  ">
                    *Your final responsibility may include deductible or
                    co-insurance amounts based on your plan.
                  </span>
                  <span className="text-black text-[10px] font-normal "> </span>
                  <span className="text-black text-xs font-normal  ">
                    Info shown is from your insurance company as of today’s date
                    and is an estimate of your copay.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          id="subsciberSection"
          className={`mb-4  flex h-full flex-1 flex-col `}
        >
          {/* Who is the subscriber */}
          <div className="relative mt-4 items-center">
            <select
              id="insuranceSubscriber"
              name={`insuranceSubscriber${section}`}
              value={values[`insuranceSubscriber${section}`]}
              onChange={handleChange}
              className={`w-full rounded-lg border border-poise-2 px-4 py-2 pt-6  ${
                errors[`insuranceSubscriber${section}`]
                  ? 'border---red-500'
                  : 'border-poise-2'
              }  `}
            >
              <option disabled defaultValue="">
                Select an option
              </option>
              <option value="Patient">Patient</option>
              <option value="Spouse">Spouse</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Guardian">Guardian</option>
            </select>

            <label
              htmlFor="insuranceSubscriber"
              className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
            >
              Who is the subscriber?
            </label>
          </div>

          <div
            className={` ${errors[`insuranceFirstName${section}`] ? 'text-status-red-text' : 'text-black-4 '} flex h-full flex-1 flex-col ${values[`insuranceSubscriber${section}`] === 'Patient' || values[`insuranceSubscriber${section}`] === '' ? 'hidden' : 'block'}`}
          >
            {/* First Name */}
            <div className="relative mt-4 items-center">
              <input
                id={`insuranceFirstName${section}`}
                placeholder="John"
                name={`insuranceFirstName${section}`}
                value={values[`insuranceFirstName${section}`] || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border ${
                  errors[`insuranceFirstName${section}`]
                    ? 'border-red-500'
                    : 'border-poise-2'
                }  w-full rounded-lg px-4 py-2 pt-6 `}
              />

              <label
                htmlFor="firstName"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs "
              >
                Patient&apos;s Legal First Name{' '}
                <span className={`text-xs font-normal text-zest-6 `}>*</span>
              </label>
              <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                {errors[`insuranceFirstName${section}`] as string}
              </span>
            </div>
            {/* Last Name */}
            <div
              className={`${errors[`insuranceLastName${section}`] ? 'text-status-red-text' : 'text-black-4 '} relative mt-4 items-center`}
            >
              <input
                id={`insuranceLastName${section}`}
                placeholder="Doe"
                onChange={handleChange}
                name={`insuranceLastName${section}`}
                onBlur={handleBlur}
                value={values[`insuranceLastName${section}`] || ''}
                className={`${
                  errors[`insuranceLastName${section}`]
                    ? 'border-red-500'
                    : 'border-poise-2'
                }  w-full rounded-lg border px-4 py-2 pt-6`}
              />

              <label
                htmlFor="lastName"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs"
              >
                Patient&apos;s Legal Last Name
              </label>
              <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                {errors[`insuranceLastName${section}`] as string}
              </span>
            </div>
            <div
              className={`${errors[`insuranceDob${section}`] ? 'text-status-red-text' : 'text-black-4 '} relative mt-4 flex w-full`}
            >
              <input
                type="date"
                id={`insuranceDob${section}`}
                // name="dob"
                name={`insuranceDob${section}`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[`insuranceDob${section}`] || ''}
                className={`${
                  errors[`insuranceDob${section}`]
                    ? 'border-red-500'
                    : 'border-poise-2'
                } w-full rounded-lg border  py-2 pl-4 pt-6 text-black-4`}
                placeholder="mm/dd/yyyy"
              ></input>
              <label
                htmlFor="dobLbl"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs "
              >
                Patient&apos;s Date of Birth{' '}
                <span className={`text-xs font-normal text-zest-6 `}>*</span>
              </label>
              <img
                alt="Calendar"
                src="../assets/images/Calendar.svg"
                className="absolute right-0 top-0 z-10 mr-[15px] mt-[29px] w-4 items-end justify-end"
              ></img>
            </div>
            <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
              {errors[`insuranceDob${section}`] as string}
            </span>
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
                    errors[`insurancePhone${section}`]
                      ? 'border-red-500'
                      : 'border-poise-2'
                  }  w-full rounded-lg border px-4 py-2 pt-6`}
                ></input>
                <label className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4">
                  Phone Number{' '}
                  <span className={`text-xs font-normal text-zest-6 `}>*</span>
                </label>
                <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                  {errors[`insurancePhone${section}`] as string}
                </span>
              </div>
            </div>
            {/* Same as Patient */}
            <div className="relative mt-4 items-center">
              <input
                type="checkbox"
                name="sameAsPatientChkBox"
                id="sameAsPatientChkBox"
                onChange={handleSameAsPatientChange}
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
                  errors[`insuranceAddress${section}`]
                    ? 'border-red-500'
                    : 'border-poise-2'
                }  w-full rounded-lg border  px-4 py-2 pt-6`}
              />
              <label
                htmlFor="address"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
              >
                Address{' '}
                <span className={`text-xs font-normal text-zest-6 `}>*</span>
              </label>
            </div>
            <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
              {errors[`insuranceAddress${section}`] as string}
            </span>
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
                  errors[`insuranceCity${section}`]
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
                  className={`border  text-black-4 ${
                    errors[`insuranceState${section}`]
                      ? 'border-red-500'
                      : 'border-poise-2'
                  } w-full rounded-lg px-4 py-2 pt-6`}
                >
                  <option disabled value={''}>
                    Choose State
                  </option>
                  <option value="CA">CA</option>
                  <option value="NY">NY</option>
                  <option value="NV">NV</option>
                  <option value="TX">TX</option>
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
                  className={` border ${
                    errors[`insuranceZip${section}`]
                      ? 'border-red-500'
                      : 'border-poise-2'
                  }   w-full rounded-lg border-poise-2 px-4 py-2 pt-6`}
                ></input>
                <label className="absolute left-0 top-0 ml-8 mt-2 text-xs text-black-4">
                  Zip / Postal Code
                </label>
              </div>
            </div>
            {/* // test insurance */}
            <div className="p-6">
              <div className=" text-black text-base font-medium ">
                Upload insurance card
              </div>

              <div className="text-black pt-2 text-sm font-normal ">
                If you have a digital insurance card, download or screenshot
                both sides to upload.
              </div>

              {currentStep !== 2 && (
                <div>
                  <p>Current step is not 2, it's {currentStep}</p>
                </div>
              )}
              {/* Insurance Front Card */}

              <div className="relative mt-4">
                <ImageUpload
                  id={`frontInsuranceCard${section}`}
                  name={`frontInsuranceCard${section}`}
                  label="Upload Front of Insurance Card"
                  error={errorUpload}
                  setError={setErrorUpload}
                  value={`frontInsuranceCard${section}`}
                  setValue={setFrontInsuranceCard}
                ></ImageUpload>
              </div>
              {/* Insurance Back Card */}
              <div className="relative mt-4">
                <ImageUpload
                  id={`backInsuranceCard${section}`}
                  name={`backInsuranceCard${section}`}
                  label="Upload Back of Insurance Card"
                  error={errorUpload}
                  setError={setErrorUpload}
                  value={`backInsuranceCard${section}`}
                  setValue={setBackInsuranceCard}
                ></ImageUpload>
              </div>
            </div>{' '}
          </div>
        </div>
      </form>
    </>
  );
};

export default SubscriberForm;
