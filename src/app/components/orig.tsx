import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { states } from '../../constants/constants';
import { createValidationSchema} from '../../schemas/insurance';
import {
  LoadIdentification,
  LoadInsurance,
  updateInsuranceDetails,
} from '../../actions/api';
import ImageUpload from '../Fields/ImageUpload';
import { formatPhoneNumber } from '@/app/utils/helper';
import { useFormState } from '../FormContext';

interface SubscriberFormProps {
  section: any;
  patientDetails: any;
  currentStep: any;
  isSubmitting: boolean;
  // onSubmit: any;
  triggerSubmit: boolean;
  onSubscriberDataChange: any;
  onRteDataChange: any;
  setTriggerSubmit: (triggerSubmit: boolean) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setCurrentStep: (currentStep: number) => void;
  handleErrors: (errors: any) => void; // Add this prop
  regId: number;
  dob: string;
}
const SubscriberForm = ({
  section,
  patientDetails,
  currentStep,
  isSubmitting,
  // onSubmit,
  triggerSubmit,
  onSubscriberDataChange,
  onRteDataChange,
  setTriggerSubmit,
  setIsSubmitting,
  setCurrentStep,
  handleErrors,
  regId,
  dob,
}: SubscriberFormProps) => {
  const { virtual_subscriber, id } = onRteDataChange || {}; // Destructure virtual_subscriber from onRteDataChange
  const stateList = states;
  const { setInsuranceData, insuranceData } = useFormState();

  const [touchedImages, setTouchedImages] = useState({
    [`frontInsuranceCard${section}`]: false,
    [`backInsuranceCard${section}`]: false,
  });
  const handleTouched = (field: any) => {
    setTouchedImages((prev:any) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleError = (field: any, hasError: any) => {
    setErrorUploads((prev:any) => ({
      ...prev,
      [field]: hasError,
    }));
  };



  const [errorUploads, setErrorUploads] = useState({
    [`frontInsuranceCard${section}`]: false,
    [`backInsuranceCard${section}`]: false,
  });
  const [frontInsuranceCard, setFrontInsuranceCard] = useState(null);
  const [backInsuranceCard, setBackInsuranceCard] = useState(null);
  const sectionIndex = section - 1; // Adjust for zero-based indexing
  const getDefault = (key: string, defaultValue: any) => {
    return insuranceData?.[key] !== undefined ? insuranceData[key] : defaultValue;
  };
  
  const initialValues = {
    [`insuranceFirstName${section}`]: getDefault(`insuranceFirstName${section}`, ''),
    [`insuranceLastName${section}`]: getDefault(`insuranceLastName${section}`, ''),
    [`insuranceDob${section}`]: getDefault(`insuranceDob${section}`, ''),
    [`insurancePhone${section}`]: getDefault(`insurancePhone${section}`, ''),
    [`insuranceAddress${section}`]: getDefault(`insuranceAddress${section}`, ''),
    [`insuranceAddress2_${section}`]: getDefault(`insuranceAddress2_${section}`, ''),
    [`insuranceCity${section}`]: getDefault(`insuranceCity${section}`, ''),
    [`insuranceState${section}`]: getDefault(`insuranceState${section}`, ''),
    [`insuranceZip${section}`]: getDefault(`insuranceZip${section}`, ''),
    [`insuranceSubscriber${section}`]: getDefault(`insuranceSubscriber${section}`, ''),
    [`frontInsuranceCard${section}`]: getDefault(`frontInsuranceCard${section}`, ''),
    [`backInsuranceCard${section}`]: getDefault(`backInsuranceCard${section}`, ''),
  };

  const validationSchema = createValidationSchema(section);
console.log(insuranceData, 'initial insuranceData');
console.log(initialValues, 'initialValues');
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setTouched,
    touched,
    setErrors,
    setFieldValue,
    resetForm,
    setValues,
  } = useFormik({
    initialValues ,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true, // Ensures validation runs on change

    enableReinitialize: true,
    onSubmit: (values: any) => {
      onHandleFormSubmit(values);
      console.log(values, 'subsk values form');
    },
  });
  const [sameAsPatient, setSameAsPatient] = useState(false);

  // Ensure to call handleErrors with the updated errors for image upload
  useEffect(() => {
    setErrors(errors);
    handleErrors(errors);
    console.log(errors, "errors");
  }, [errors]);
  

  // Set touched state for images when they are touched
  useEffect(() => {
    if (touched[`frontInsuranceCard${section}`]) {
      handleTouched(`frontInsuranceCard${section}`);
    }
    if (touched[`backInsuranceCard${section}`]) {
      handleTouched(`backInsuranceCard${section}`);
    }
  }, [touched[`frontInsuranceCard${section}`], touched[`backInsuranceCard${section}`]]);

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    fieldName: string
  ) => {
    const newValue = e.target.value;
  
    // Update Formik field value
    setFieldValue(fieldName, newValue);
  
    // Update insuranceData state
    setInsuranceData((prevData: any) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    const newValue = e.target.value;
  
    // Update Formik field value
    setFieldValue(fieldName, newValue);
  
    // Update insuranceData state
    setInsuranceData((prevData: any) => ({
      ...prevData,
      [fieldName]: newValue,
    }));

  };
  useEffect(() => {
    if (onRteDataChange) {
      console.log(onRteDataChange, 'SUBSCRIBER FORM RTE DATAA');
      console.log(
        onRteDataChange.subscriber_relation,
        ' RTE onRteDataChange.subscriber_relation',
      );
    }
  }, []);

  useEffect(() => {
    if (onRteDataChange) {
      console.log(onRteDataChange, 'RTE DATA IN SUBSCRIBER ZZZ');
      handleCheckPrice(onRteDataChange);
      // handleOutOfNetwork(onRteDataChange);  // uncomment this to handle the data from rte
      testInNetwork(''); // remove this or passs "test" or any string to make it false
    }
  }, [onRteDataChange]); // Run the effect whenever onRteDataChange changes

  const handleSameAsPatientChange = (e: any) => {
    setSameAsPatient(e.target.checked);
    console.log(patientDetails, 'patientData');

    if (!e.target.checked) {
      // Clear the fields when the checkbox is unchecked
      setFieldValue(`insuranceAddress${section}`, '');
      setFieldValue(`insuranceAddress2_${section}`, '');
      setFieldValue(`insuranceCity${section}`, '');
      setFieldValue(`insuranceState${section}`, '');
      setFieldValue(`insuranceZip${section}`, '');
    }
  };
  useEffect(() => {
    if (sameAsPatient) {
      // Populate the fields when the checkbox is checked

      setFieldValue(`insuranceAddress${section}`, patientDetails.addressLine1);
      setFieldValue(
        `insuranceAddress2_${section}`,
        patientDetails.addressLine2,
      );
      setFieldValue(`insuranceCity${section}`, patientDetails.city);
      setFieldValue(`insuranceState${section}`, patientDetails.state);
      setFieldValue(`insuranceZip${section}`, patientDetails.zipCode);
      setErrors(errors);
    } else {
      // Clear the fields when the checkbox is unchecked
      setFieldValue(`insuranceAddress${section}`, '');
      setFieldValue(`insuranceAddress2_${section}`, '');
      setFieldValue(`insuranceCity${section}`, '');
      setFieldValue(`insuranceState${section}`, '');
      setFieldValue(`insuranceZip${section}`, '');
    }
  }, [sameAsPatient, patientDetails]);
  //FORR DROP DOWN CHANGES
  const resetFormValues = () => {
    const index = section - 1; // Adjust for zero-based indexing
    const data = insuranceData[index] || {}; // Get the insurance data for the current section

    // Construct newValues dynamically
    const newValues = {
      ...data,
      insuranceSubscriber: values[`insuranceSubscriber${section}`] || '', // Preserve existing subscriber value
    };

    setValues(newValues);
  };

  // const resetFormValues = () => {
  //   const newValues = { ...initialValues };
  //   newValues[`insuranceSubscriber${section}`] =
  //     values[`insuranceSubscriber${section}`];
  //   setValues(newValues);
  // };


  useEffect(() => {
    // handleInsuranceSubscriber();

    loadIds();
  }, []); // Run once on mount
  useEffect(() => {
    // handleInsuranceSubscriber();

    console.log('YOUR values:', values);
    console.log('YOUR INSURANCE:', insuranceData);
  }, [values, insuranceData]); // Run once on mount
  
  useEffect(() => {
    const subscriberValue = values[`insuranceSubscriber${section}`];
    const subscriber_relation = onRteDataChange?.subscriber_relation;
    
    const isPatientSelected = subscriberValue === 'Patient';
    const isSubscriberRelationSelected = subscriber_relation === subscriberValue;
    const isOtherValueSelected = !isPatientSelected && !isSubscriberRelationSelected;
  
    let newErrors = { ...errors };
  
    // Clear errors and set values based on selection
    if (!subscriberValue) {
      // Set an error if the field is required but empty
      newErrors[`insuranceSubscriber${section}`] = 'This field is required';
    } else {
      // Clear the error for subscriber field
      delete newErrors[`insuranceSubscriber${section}`];
      
      if (isPatientSelected) {
        const patientValues = {
          [`insuranceSubscriber${section}`]: 'Patient',
          [`insuranceFirstName${section}`]: patientDetails.firstName || '',
          [`insuranceLastName${section}`]: patientDetails.lastName || '',
          [`insuranceDob${section}`]: patientDetails.dateOfBirth
            ? new Date(patientDetails.dateOfBirth).toISOString().substring(0, 10)
            : '',
          [`insurancePhone${section}`]: patientDetails.phoneNumber || '',
          [`insuranceAddress${section}`]: patientDetails.addressLine1 || '',
          [`insuranceAddress2_${section}`]: patientDetails.addressLine2 || '',
          [`insuranceCity${section}`]: patientDetails.city || '',
          [`insuranceState${section}`]: patientDetails.state || '',
          [`insuranceZip${section}`]: patientDetails.zipCode || '',
          [`frontInsuranceCard${section}`]:  'null',
          [`backInsuranceCard${section}`]:  'null',
        };
        delete errors[`frontInsuranceCard${section}`];
      delete errors[`backInsuranceCard${section}`];
        setTouched(
            {
              [`insuranceFirstName${section}`]: false,
              [`insuranceLastName${section}`]: false,
              [`insuranceDob${section}`]: false,
              [`insurancePhone${section}`]: false,
              [`insuranceAddress${section}`]: false,
              [`insuranceAddress2_${section}`]: false,
              [`insuranceCity${section}`]: false,
              [`insuranceState${section}`]: false,
              [`insuranceZip${section}`]: false,
              [`frontInsuranceCard${section}`]: false,
              [`backInsuranceCard${section}`]: false,
            },
            false,
          );
          setErrors(errors);
   

        setValues((prevData: any) => ({ ...prevData, ...patientValues }));
        setInsuranceData((prevData: any) => ({ ...prevData, ...patientValues }));
      } else if (isSubscriberRelationSelected) {
        const virtualSubscriber = {
          [`insuranceFirstName${section}`]: virtual_subscriber?.first_name || '',
          [`insuranceLastName${section}`]: virtual_subscriber?.last_name || '',
          [`insuranceDob${section}`]: virtual_subscriber?.dob
            ? new Date(virtual_subscriber?.dob).toISOString().substring(0, 10)
            : '',
          [`insurancePhone${section}`]: virtual_subscriber?.phone_number || '',
          [`insuranceAddress${section}`]: virtual_subscriber?.virtual_address?.address_1 || '',
          [`insuranceAddress2_${section}`]: virtual_subscriber?.virtual_address?.address_2 || '',
          [`insuranceCity${section}`]: virtual_subscriber?.virtual_address?.city || '',
          [`insuranceState${section}`]: virtual_subscriber?.virtual_address?.state || '',
          [`insuranceZip${section}`]: virtual_subscriber?.virtual_address?.zipcode || '',
          [`insuranceSubscriber${section}`]: subscriber_relation || '',
          [`frontInsuranceCard${section}`]: insuranceData
            ? insuranceData[`frontInsuranceCard${section}`]
            : '',
          [`backInsuranceCard${section}`]: insuranceData
            ? insuranceData[`backInsuranceCard${section}`]
            : '',
        };
    
        setValues((prevData: any) => ({ ...prevData, ...virtualSubscriber }));
        setInsuranceData((prevData: any) => ({ ...prevData, ...virtualSubscriber }));
        setErrors(newErrors);

      } else if (isOtherValueSelected) {
        const clearedValues = {
          [`insuranceFirstName${section}`]: '',
          [`insuranceLastName${section}`]: '',
          [`insuranceDob${section}`]: '',
          [`insurancePhone${section}`]: '',
          [`insuranceAddress${section}`]: '',
          [`insuranceAddress2_${section}`]: '',
          [`insuranceCity${section}`]: '',
          [`insuranceState${section}`]: '',
          [`insuranceZip${section}`]: '',
          [`frontInsuranceCard${section}`]:  '',
          [`backInsuranceCard${section}`]: '',
        };
    
        newErrors[`insuranceSubscriber${section}`] = ''; // Clear error if other is selected
        delete newErrors[`frontInsuranceCard${section}`];
        delete newErrors[`backInsuranceCard${section}`];
        setValues((prevData: any) => ({
          ...prevData,
          [`insuranceSubscriber${section}`]: subscriberValue,
          ...clearedValues,
        }));
        setInsuranceData((prevData: any) => ({
          ...prevData,
          [`insuranceSubscriber${section}`]: subscriberValue,
          ...clearedValues,
        }));
              setErrors(newErrors);

      }
    
    //   Remove errors related to insurance cards if not applicable
      if (subscriberValue !== 'Patient') {
        delete newErrors[`frontInsuranceCard${section}`];
        delete newErrors[`backInsuranceCard${section}`];
      }
  
    }
  }, [values[`insuranceSubscriber${section}`], onRteDataChange]);
  const [frontInsuranceImage, setFrontInsuranceImage] = useState(null);
  const [backInsuranceImage, setBackInsuranceImage] = useState(null);

  const [isValidCopay, setIsValidCopay] = useState(false);
  const [isValidNetwork, setIsValidNetwork] = useState(false);

  // const additionalSubscriberValues = Object.keys(values)
  //   .filter((key) => key.endsWith('2'))
  //   .reduce<Record<string, any>>((obj, key) => {
  //     obj[key] = values[key];
  //     return obj;
  //   }, {});

  const submit = () => {
    setIsSubmitting(true);

    // Simulate validation delay
    // console.log(
    //   'Additional Subscriber Form Values before going to the next page:',
    //   additionalSubscriberValues,
    // );

    // Update parent state
    console.log('onSubmit SUBFORMM formm insurance data:', values);
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  const copayAmountUc = onRteDataChange?.copay_amount_uc;

  useEffect(() => {
    if (triggerSubmit) {
      onHandleFormSubmit(values);

      submit();
    }
  }, [triggerSubmit]);
  const sequence = section === '' ? 1 : section === '2' ? 2 : 1; // Defaults to 1 if section is not "2"

  const onHandleFormSubmit = async (data: any) => {
    // Save the submitted data to insuranceData
    // setInsuranceData((prevData: any) => {
    //   // Create a copy of the current insurance data
    //   const updatedData = [...prevData];

    //   // Ensure the section index is valid
    //   const index = section - 1; // Adjusting for zero-based indexing

    //   // Update the specific section with the new data
    //   updatedData[index] = {
    //     ...updatedData[index], // Preserve existing data in the section
    //     ...data, // Merge the new data
    //   };

    //   return updatedData;
    // });

    console.log('SETTING  DATA', data);
    console.log('SETTING INSURANCE DATA', insuranceData);
    onSubscriberDataChange(data, section);

    if (values[`insuranceSubscriber${section}`] !== 'Patient') {
      const frontImage = frontInsuranceCard != null ? frontInsuranceImage : null;
      const backImage = backInsuranceCard != null ? backInsuranceImage : null;

      const formData = new FormData();
      formData.append('regId', JSON.stringify(regId));
      formData.append('dob', dob);
      formData.append('type', 'INSURANCE');
      formData.append('sequence', JSON.stringify(sequence));

      if (frontImage != null)
        formData.append('frontIdentificationImage', frontImage);
      if (backImage != null)
        formData.append('backIdentificationImage', backImage);

      const response = await fetch(`/api/upload`, {
        method: 'POST',
        body: formData,
      });
      await updateInsuranceDetails(regId, id, data, sequence);
      // //Upload Insurance Subscriber

      console.log(response);
    } else {
      console.log("NO INSURANCE IMAGE NEEDED - Patient");

    }


    // onSubscriberDataChange((prev: any) => ({ ...prev, ...data })); // pass data to insurance

    setTriggerSubmit(false);
    setIsSubmitting(false);
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

  const loadIds = async () => {
    const imageObj: any = JSON.parse(await LoadInsurance(regId, dob, sequence));
    console.log(JSON.stringify(imageObj?.BackImage?.file_name));

    const frontImage = imageObj?.FrontImage?.encodedImage || null;
    const backImage = imageObj?.BackImage?.encodedImage || null;

    if (frontImage !== null) {
      setFieldValue(`frontInsuranceCard${section}`, frontImage);
      setFrontInsuranceCard(frontImage);

    }
    if (backImage !== null) {
      setFieldValue(`backInsuranceCard${section}`, backImage);
      setBackInsuranceCard(backImage);

    }

  };


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
  const handleCheckPrice = (onRteDataChange: any) => {
    try {
      const copayAmountUc = onRteDataChange?.copay_amount_uc;

      if (
        copayAmountUc !== null &&
        copayAmountUc !== undefined &&
        copayAmountUc !== ''
      ) {
        setIsValidCopay(true);
        console.log(`Copay is valid: $${copayAmountUc}`);
      } else {
        setIsValidCopay(false);
        console.log('Invalid copay');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOutOfNetwork = (onRteDataChange: any) => {
    try {
      const inNetwork = onRteDataChange?.rte_error;

      if (inNetwork === '') {
        // setIsValidNetwork(true); //- this is to handle in or out of network checks uncomment this
        console.log(`Network is valid: ${inNetwork}`);
      } else {
        // setIsValidNetwork(false);//- this is to handle in or out of network checks uncomment this
        console.log('Invalid Network');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const testInNetwork = (testValue: string) => {
    const inNetwork = testValue;

    if (inNetwork === '') {
      setIsValidNetwork(true);
      console.log(`Network is valid: ${inNetwork}`);
    } else {
      setIsValidNetwork(false);
      console.log('Invalid Network');
    }
  };

  return (
    <>
      <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
        {isValidNetwork ? (
          isValidCopay ? (
            // Show the green box with valid copay and network
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
              <div className="self-stretch">
                <div>
                  <span className="text-black text-sm font-bold">
                    Estimated copay:{' '}
                  </span>
                  <span className="text-black text-sm font-normal ">
                    {copayAmountUc !== null ? `$${copayAmountUc}` : 'Not '}
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
                  <img
                    alt="Error"
                    src="../assets/images/error-green.svg"
                    className=" h-10 w-10 text-center text-base text-xl font-black text-[#066632]"
                  />
                </div>
                <div className="text-black shrink grow basis-0 text-xs font-normal">
                  Please bring your insurance card with you when you arrive at
                  the center.
                </div>
              </div>
            </div>
          ) : (
            // Show fallback copay message (still in-network, but no copay info)
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
            </div>
          )
        ) : (
          // Show the yellow box if out of network
          <div className="mt-4 inline-flex  flex-col items-start justify-center gap-2.5 rounded bg-[#fef2e5] p-3">
            <div className="flex flex-col items-start justify-center ">
              <div className="self-stretch">
                <div>
                  <span className="text-sm font-bold text-[#A64f00]">
                    It looks like we cannot retrieve information from your
                    insurance company at this time.
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-black  text-sm ">
                    Your insurance is currently out-of-network for therapy
                    services. The self-pay fee for your therapy visit will be
                  </span>
                  <span className="text-black text-sm font-bold ">
                    {copayAmountUc !== null ? ` $${copayAmountUc}.` : 'Not '}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

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
              onChange={(e) => handleSelectChange(e, `insuranceSubscriber${section}`)}
              className={`w-full rounded-lg border border-poise-2 px-4 py-2 pt-6  ${errors[`insuranceSubscriber${section}`]
                  ? 'border---red-500'
                  : 'border-poise-2'
                }  `}
            >
              <option defaultValue="">Select an option</option>
              <option value="Patient">Patient</option>
              <option value="Spouse">Spouse</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Guardian">Guardian</option>
              <option value="self">Self</option>
              <option value="other">Other</option>
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
            <div
              className={`${errors[`insuranceFirstName${section}`] && touched[`insuranceFirstName${section}`] ? 'text-status-red-text' : 'text-black-4 '} relative mt-4 items-center `}
            >
              <input
                id={`insuranceFirstName${section}`}
                placeholder="John"
                name={`insuranceFirstName${section}`}
                value={values[`insuranceFirstName${section}`] || ''}
                onChange={(e) => handleTextChange(e, `insuranceFirstName${section}`)}
                onBlur={handleBlur}
                className={`border ${errors[`insuranceFirstName${section}`] && touched[`insuranceFirstName${section}`] ? 'border-red-500' : 'border-poise-2'}  w-full rounded-lg px-4 py-2 pt-6 `}
              />
              <label
                htmlFor="firstName"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs "
              >
                Patient&apos;s Legal First Name{' '}
                <span className={`text-xs font-normal text-zest-6 `}>*</span>
              </label>
              {errors[`insuranceFirstName${section}`] &&
                touched[`insuranceFirstName${section}`] && (
                  <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                    {errors[`insuranceFirstName${section}`] as string}
                  </span>
                )}
            </div>
            {/* Last Name */}
            <div
              className={`${errors[`insuranceLastName${section}`] && touched[`insuranceLastName${section}`] ? 'text-status-red-text' : 'text-black-4 '} relative mt-4 items-center`}
            >
              <input
                id={`insuranceLastName${section}`}
                placeholder="Doe"
                value={values[`insuranceLastName${section}`] || ''}
                onBlur={handleBlur}
                name={`insuranceLastName${section}`}
                onChange={(e) => handleTextChange(e, `insuranceLastName${section}`)}
                className={`${errors[`insuranceLastName${section}`] && touched[`insuranceLastName${section}`] ? 'border-red-500' : 'border-poise-2'}  w-full rounded-lg border px-4 py-2 pt-6`}
              />
              <label
                htmlFor="lastName"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs"
              >
                Patient&apos;s Legal Last Name{' '}
                <span className={`text-xs font-normal text-zest-6 `}>*</span>
              </label>
              {errors[`insuranceLastName${section}`] &&
                touched[`insuranceLastName${section}`] && (
                  <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                    {errors[`insuranceLastName${section}`] as string}
                  </span>
                )}
            </div>
            <div
              className={`${errors[`insuranceDob${section}`] && touched[`insuranceDob${section}`] ? 'text-status-red-text' : 'text-black-4 '} relative mt-4 flex w-full`}
            >
              <input
                type="date"
                id={`insuranceDob${section}`}
                name={`insuranceDob${section}`}
                onChange={(e) => handleTextChange(e, `insuranceDob${section}`)}
                onBlur={handleBlur}
                value={values[`insuranceDob${section}`] || ''}
                className={`${errors[`insuranceDob${section}`] && touched[`insuranceDob${section}`] ? 'border-red-500' : 'border-poise-2'} w-full rounded-lg border  py-2 pl-4 pt-6 text-black-4`}
                placeholder="mm/dd/yyyy"
              />
              <label
                htmlFor="dobLbl"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs"
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
            {errors[`insuranceDob${section}`] &&
              touched[`insuranceDob${section}`] && (
                <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                  {errors[`insuranceDob${section}`] as string}
                </span>
              )}
            {/*Phone */}
            <div className="mt-4 flex">
              <div
                className={`${errors[`insurancePhone${section}`] && touched[`insurancePhone${section}`] ? 'text-status-red-text' : 'text-black-4 '} relative w-full`}
              >
                <input
                  type="tel"
                  name={`insurancePhone${section}`}
                  onChange={(e) => handleTextChange(e, `insurancePhone${section}`)}
                  onBlur={handleBlur}
                  value={
                    formatPhoneNumber(values[`insurancePhone${section}`]) || ''
                  }
                  placeholder="(555) 555-5555"
                  className={`${errors[`insurancePhone${section}`] && touched[`insurancePhone${section}`] ? 'border-red-500' : 'border-poise-2'} w-full rounded-lg border px-4 py-2 pt-6`}
                />
                <label className="absolute left-0 top-0 ml-4 mt-2 text-xs">
                  Phone Number{' '}
                  <span className={`text-xs font-normal text-zest-6 `}>*</span>
                </label>
                {errors[`insurancePhone${section}`] &&
                  touched[`insurancePhone${section}`] && (
                    <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                      {errors[`insurancePhone${section}`] as string}
                    </span>
                  )}
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
            <div
              className={`${errors[`insuranceAddress${section}`] && touched[`insuranceAddress${section}`] ? 'text-status-red-text' : 'text-black-4 '}  relative mt-4`}
            >
              <input
                type="text"
                id="address"
                name={`insuranceAddress${section}`}
                onChange={(e) => handleTextChange(e, `insuranceAddress${section}`)}
                onBlur={handleBlur}
                placeholder="123 Street"
                value={values[`insuranceAddress${section}`] || ''}
                className={` ${errors[`insuranceAddress${section}`] &&
                    touched[`insuranceAddress${section}`]
                    ? 'border-red-500'
                    : 'border-poise-2'
                  }  w-full rounded-lg border  px-4 py-2 pt-6`}
              />
              <label
                htmlFor="address"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs"
              >
                Address{' '}
                <span className={`text-xs font-normal text-zest-6 `}>*</span>
              </label>
            </div>
            {errors[`insuranceAddress${section}`] &&
              touched[`insuranceAddress${section}`] && (
                <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                  {errors[`insuranceAddress${section}`] as string}
                </span>
              )}
            {/* Address2 */}
            <div className="relative mt-4 text-black-4">
              <input
                type="text"
                id="address2"
                name={`insuranceAddress2_${section}`}

                onChange={(e) => handleTextChange(e, `insuranceAddress2_${section}`)}
                value={values[`insuranceAddress2_${section}`] || ''}
                placeholder="#1"
                className={`w-full rounded-lg border border-poise-2 px-4 py-2 pt-6`}
              />
              <label
                htmlFor="address2"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs "
              >
                Apt. Suite, Unit, (Optional)
              </label>
            </div>
            {/* <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
              {errors[`insuranceAddress2_${section}`] as string}
            </span> */}
            {/* City */}
            {/* City */}
            <div
              className={`${errors[`insuranceCity${section}`] &&
                  touched[`insuranceCity${section}`]
                  ? 'text-status-red-text'
                  : 'text-black-4'
                } relative mt-4`}
            >
              <input
                type="text"
                id="city"
                name={`insuranceCity${section}`}
                onChange={(e) => handleTextChange(e, `insuranceCity${section}`)}
                onBlur={handleBlur}
                value={values[`insuranceCity${section}`] || ''}
                className={`${errors[`insuranceCity${section}`] &&
                    touched[`insuranceCity${section}`]
                    ? 'border-red-500'
                    : 'border-poise-2'
                  } w-full rounded-lg border px-4 py-2 pt-6`}
              />
              <label
                htmlFor="city"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs"
              >
                City <span className="text-xs font-normal text-zest-6">*</span>
              </label>
            </div>
            {errors[`insuranceCity${section}`] &&
              touched[`insuranceCity${section}`] && (
                <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                  {errors[`insuranceCity${section}`] as string}
                </span>
              )}
            {/* State */}
            <div
              className={`${errors[`insuranceState${section}`] && touched[`insuranceState${section}`] ? 'text-status-red-text' : 'text-black-4 '}  mt-4 flex`}
            >
              <div className="relative w-3/5">
                <select
                  // name="state"
                  id="state"
                  name={`insuranceState${section}`}
                  onChange={(e) => handleSelectChange(e, `insuranceState${section}`)}
                  onBlur={handleBlur}
                  value={values[`insuranceState${section}`] || ''}
                  className={`border  text-black-4 ${errors[`insuranceState${section}`] &&
                      touched[`insuranceState${section}`]
                      ? 'border-red-500'
                      : 'border-poise-2'
                    } w-full rounded-lg px-4 py-2 pt-6`}
                >
                  <option disabled value={''}>
                    Choose State
                  </option>
                  <option value="">-- State --</option>
                  {stateList.map((state) => (
                    <option key={state.abbreviation} value={state.abbreviation}>
                      {state.abbreviation}
                    </option>
                  ))}
                </select>
                <label className="absolute left-0 top-0 ml-8 mt-2 text-xs">
                  State{' '}
                  <span className={`text-xs font-normal text-zest-6 `}>*</span>
                </label>
                <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                  {errors[`insuranceState${section}`] &&
                    touched[`insuranceState${section}`] && (
                      <span
                        className={`pl-2 text-xs font-normal  text-zest-6 `}
                      >
                        {errors[`insuranceState${section}`] as string}
                      </span>
                    )}
                </span>
              </div>
              <div
                className={`${errors[`insuranceZip${section}`] && touched[`insuranceZip${section}`] ? 'text-status-red-text' : 'text-black-4 '} relative w-3/4 pl-4`}
              >
                <input
                  type="text"
                  placeholder="-"
                  name={`insuranceZip${section}`}
                  onChange={(e) => handleTextChange(e, `insuranceZip${section}`)}
                  maxLength={5}
                  onBlur={handleBlur}
                  value={values[`insuranceZip${section}`] || ''}
                  className={` border ${errors[`insuranceZip${section}`] &&
                      touched[`insuranceZip${section}`]
                      ? 'border-red-500'
                      : 'border-poise-2'
                    }   w-full rounded-lg border-poise-2 px-4 py-2 pt-6`}
                ></input>
                <label className="absolute left-0 top-0 ml-8 mt-2 text-xs ">
                  Zip / Postal Code{' '}
                  <span className={`text-xs font-normal text-zest-6 `}>*</span>
                </label>
                {errors[`insuranceZip${section}`] &&
                  touched[`insuranceZip${section}`] && (
                    <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                      {errors[`insuranceZip${section}`] as string}
                    </span>
                  )}
              </div>
            </div>
            {/* // test insurance */}
            <div className="p-6">
              <div className=" text-black-4 text-base font-medium ">
                Upload insurance card
              </div>

              <div className=" text-black-4  pt-2 text-sm font-normal ">
                If you have a digital insurance card, download or screenshot
                both sides to upload.
              </div>

              {/* Insurance Front Card */}

              <div className="relative mt-4">
                <ImageUpload
                  id={`frontInsuranceCard${section}`}
                  name={`frontInsuranceCard${section}`}
                  label="Upload Front of Insurance Card"
                  error={errorUploads[`frontInsuranceCard${section}`] || false}
                  // touchedImage={touchedImages[`frontInsuranceCard${section}`]}
                  value={values[`frontInsuranceCard${section}`]}
                  setValue={(val) => {
                    setFieldValue(`frontInsuranceCard${section}`, val);
                    handleTouched(`frontInsuranceCard${section}`);
                  }}
                  setError={(err) =>
                    handleError(`frontInsuranceCard${section}`, err)
                  }
                  setInsuranceImage={setFrontInsuranceImage}
                />
              </div>
              {/* Insurance Back Card */}
              <div className="relative mt-4">
                <ImageUpload
                  id={`backInsuranceCard${section}`}
                  name={`backInsuranceCard${section}`}
                  label="Upload Back of Insurance Card"
                  error={errorUploads[`backInsuranceCard${section}`] || false}
                  // touchedImage={touchedImages[`backInsuranceCard${section}`]|| false}
                  value={values[`backInsuranceCard${section}`]}
                  setValue={(val: any) => {
                    setFieldValue(`backInsuranceCard${section}`, val);
                    handleTouched(`backInsuranceCard${section}`);
                  }}
                  setError={(err: any) =>
                    handleError(`backInsuranceCard${section}`, err)
                  }
                  setInsuranceImage={setBackInsuranceImage}
                />
              </div>
            </div>{' '}
          </div>
        </div>
      </form>
    </>
  );
};

export default SubscriberForm;
