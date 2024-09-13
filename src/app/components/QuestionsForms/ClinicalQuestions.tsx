import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { FormProvider, useFormState } from "../FormContext";
import ClinicalQuestions from "@/app/models/ClinicalQuestions";
import {
  fetchClinicalAnswers,
  fetchClinicalQuestions,
} from "@/app/actions/api";
import { transform } from "next/dist/build/swc";
import ClinicalAnswers from "@/app/models/ClinicalAnswers";
import { updateClinicalAnswers } from "../../actions/api";
import test from "node:test";
import { createValidationSchema, generateQuestionsValidationSchema } from "@/app/schemas/questions/questionsValidator";
import { formatPhoneNumber } from "@/app/utils/helper";
const ClinicalQuestionsPage = () => {
  const {
    clinicalQuestionsData,
    steppedBack,
    setSteppedBack,
    setClinicalQuestionsData,
    setClinicalAnswersData,
    clinicalAnswersData,
    patientData,
    onHandleBack,
    onHandleNext,

    insuranceData,
  } = useFormState();
  console.log(insuranceData, "DFQ IN CLINICAL")

  // Convert clinicalQuestionsData to array and filter based on form_display
  const clinicalQuestionsArray = Array.isArray(clinicalQuestionsData)
    ? clinicalQuestionsData.filter((question) => question.form_display)
    : Object.values(clinicalQuestionsData).filter(
      (question: any) => question.form_display
    );

  const findQuestionById = (questionId: number) => {
    return clinicalQuestionsArray.find((q) => q.id === questionId);
  };
  const handleDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    questionId: number
  ) => {
    const newValue = e.target.value;
    const question = findQuestionById(questionId);

    // Update form state
    setFieldValue(`${questionId}`, {
      question_id: questionId,
      type: "dropdown",
      person_id: patientData.personId,
      questionType: question.section,
      answer: newValue,
    });

    // Update clinicalAnswersData
    setNewAnswers((prevClinicalAnswers: any) => ({
      ...prevClinicalAnswers,
      [questionId]: {
        questionId: questionId,
        type: "dropdown",
        personId: patientData.personId,
        questionType: question.section,
        answer: newValue,
      },
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: number
  ) => {
    const { name, checked } = e.target;
    const currentAnswers = values[questionId]?.answer ? values[questionId].answer.split(",") : [];
    const question = findQuestionById(questionId);
    console.log(question, "section", question.section, "section betch")
    let newAnswers;
    if (checked) {
      newAnswers = [...currentAnswers, name];
    } else {
      newAnswers = currentAnswers.filter((option: string) => option !== name);
    }

    // Update form state
    setFieldValue(`${questionId}`, {
      question_id: questionId,
      type: "checkbox",
      person_id: patientData.personId,
      questionType: question.section,
      answer: newAnswers.join(","),
    });

    // Update clinicalAnswersData
    setNewAnswers((prevClinicalAnswers: any) => ({
      ...prevClinicalAnswers,
      [questionId]: {
        questionId: questionId,
        type: "checkbox",
        personId: patientData.personId,
        questionType: question.section,
        answer: newAnswers.join(","),
      },
    }));
    console.log(question, "question", "value", newAnswers)
  };
  const handleCheckClick = (option: string, questionId: number) => {
    // Get the current value of the checkbox
    const currentAnswers = values[questionId]?.answer ? values[questionId].answer.split(",") : [];
    const isChecked = currentAnswers.includes(option);

    // Toggle the checkbox state
    handleCheckboxChange({ target: { name: option, checked: !isChecked } } as React.ChangeEvent<HTMLInputElement>, questionId);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionId: number
  ) => {
    const newValue = e.target.value;
    const question = findQuestionById(questionId);

    // Update form state
    setFieldValue(`${questionId}`, {
      question_id: questionId,
      type: "text",
      person_id: patientData.personId,
      questionType: question.section,
      answer: newValue,
    });

    // Update clinicalAnswersData
    setNewAnswers((prevClinicalAnswers: any) => ({
      ...prevClinicalAnswers,
      [questionId]: {
        questionId: questionId,
        type: "text",
        personId: patientData.personId,
        questionType: question.section,
        answer: newValue,
      },
    }));
  };

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: number
  ) => {
    const newValue = event.target.value; // This is in YYYY-MM-DD format
    const question = findQuestionById(questionId);

    // Update form state
    setFieldValue(`${questionId}`, {
      question_id: questionId,
      type: "date",
      person_id: patientData.personId,
      questionType: question.section,
      answer: newValue,
    });

    // Update clinicalAnswersData
    setNewAnswers((prevClinicalAnswers: any) => ({
      ...prevClinicalAnswers,
      [questionId]: {
        questionId: questionId,
        type: "date",
        personId: patientData.personId,
        questionType: question.section,
        answer: newValue,
      },
    }));
  };

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: number
  ) => {
    const newValue = e.target.value;
    const question = findQuestionById(questionId);

    // Update form state
    setFieldValue(`${questionId}`, {
      question_id: questionId,
      type: "radio",
      person_id: patientData.personId,
      questionType: question.section,
      answer: newValue,
    });

    // Update clinicalAnswersData
    setNewAnswers((prevClinicalAnswers: any) => ({
      ...prevClinicalAnswers,
      [questionId]: {
        questionId: questionId,
        type: "radio",
        personId: patientData.personId,
        questionType: question.section,
        answer: newValue,
      },
    }));
    console.log("radio changed question", question, "value ", newValue)
  };

  const [newAnswers, setNewAnswers] = useState<{ [key: number]: any }>({});

  //TURN OBJECTS TO ARRAY
  const formattedData = Object.values(clinicalAnswersData).map((item: any) => ({
    questionId: item.question_id,
    answer: item.answer,
    personId: patientData.personId, // Assuming personId corresponds to registration_id
    type: item.type,
    questionType: item.questionType, // Assuming questionType is the same as type
  }));
  //FORMAT THE KEYS AS THE QUESTIONID for the filling of form
  const formattedInitialValues = formattedData.reduce((acc: any, item: any) => {
    acc[item.questionId] = {
      answer: item.answer || "",  // default to an empty string if undefined
      questionId: item.questionId,
      personId: item.personId,
      type: item.type,
      questionType: item.questionType,
    };
    return acc;
  }, {});
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    setValues,
    handleChange,
    touched,
    handleBlur,
    setErrors,
    isValid,
    setSubmitting,
  } = useFormik({
    // initialValues: clinicalAnswersData,
    initialValues: formattedInitialValues || [],
    validationSchema: createValidationSchema(clinicalQuestionsArray),
    onSubmit: (values: any) => {
      console.log("Form valuess:", values);

      onHandleFormSubmit(values);
    },
  });

  useEffect(() => {
    getClinicalAnswers();
  }, []);
  useEffect(() => {
    setErrors(errors)
    console.log(errors, "worksz errors")
  }, [errors]);
  useEffect(() => {
    if (steppedBack) {
      getClinicalAnswers();
      setSteppedBack(false);
    }
  }, [steppedBack]);
  const hasErrors = Object.keys(errors).length > 0;

  const getClinicalAnswers = async () => {
    // Replace this with your actual data fetching logic
    const response = await fetchClinicalAnswers(patientData.registrationId);

    const formattedData = Object.values(response).map((item: any) => ({
      questionId: item.question_id,
      answer: item.answer,
      personId: patientData.personId, // Assuming personId corresponds to registration_id
      type: item.type,
      questionType: item.questionType, // Assuming questionType is the same as type
    }));

    const formattedInitialValues = formattedData.reduce((acc: any, item: any) => {
      acc[item.questionId] = {
        answer: item.answer || "",  // default to an empty string if undefined
        questionId: item.questionId,
        personId: item.personId,
        type: item.type,
        questionType: item.questionType,
      };
      return acc;
    }, {});

    setValues(formattedInitialValues);
  };

  const onHandleFormSubmit = async (values: any) => {
    try {
      // check if there are no question id
      console.log(patientData.personId, "personID")


      console.log(values, "values sksksks")
      const processedValues = Object.keys(newAnswers).map((key) => newAnswers[+key]);
      const formattedProcessValues = processedValues.reduce((acc: any, item: any) => {
        acc[item.questionId] = {
          answer: item.answer || "",  // default to an empty string if undefined
          questionId: item.questionId,
          personId: item.personId,
          type: item.type,
          questionType: item.questionType,
        };
        return acc;
      }, {});
      console.log("Processed   formattedData values:", formattedData);
      console.log("Processed   newAnswers values:", newAnswers);
      console.log("Processed   processedValues values:", processedValues);
      setClinicalAnswersData(processedValues);
      console.log("VALUES TO SUBMIT", values)
      // Send the data array to the API and wait for the response
      const response = await updateClinicalAnswers(patientData.registrationId, processedValues);
      console.log("Response from API:", response);


      console.log("Form submitted ");
      onHandleNext();

      // return response; // Return the response if needed
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <FormProvider>
      <>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className="p-6 flex flex-col flex-1">
            <h1 className="text-lg font-normal mb-4">
              Clinical Health Questions
            </h1>

            {clinicalQuestionsArray?.map((question: any) => (
             <div key={question.id} className="mb-2 question ">
             <h2 className="text-base font-medium  mb-4">
               {question.question}
               {question.is_required && question.input_type !== "label" &&(
                 <span className={`text-xs font-normal text-zest-6 `}>*</span>
               )}
             </h2>
             {question.input_type === "checkbox" && question.options && (
               <div className="space-y-2">
                 {question.options.split(",").map((option: any) => (
                   <div key={option} className="flex items-center">
                     <div className="mb-4 flex items-center">
                       <div
                         className={`border-1 flex h-6 w-6 justify-center self-center rounded-lg border ${values[question.id]?.answer?.split(",").includes(option) ? "border-sky-700" : "border-[#DBDDDE]"}`}
                         onClick={() => handleCheckClick(option, question.id)}
                       >
                         <div
                           className={`flex h-5 w-5 justify-center self-center rounded-md ${values[question.id]?.answer?.split(",").includes(option) ? "border border-sky-700 bg-sky-700" : ""}`}


                         >
                           <input
                             type="checkbox"
                             id={option}
                             onBlur={handleBlur}

                             name={option}
                             checked={
                               values[question.id]?.answer?.split(",").includes(option) || false
                             }
                             onChange={(e) => handleCheckboxChange(e, question.id)}
                             className={`peer-not h-5 w-5 appearance-none ${values[question.id]?.answer?.split(",").includes(option) ? "invisible" : ""} rounded-md border-hidden`}

                           />
                           {values[question.id]?.answer?.split(",").includes(option) && (
                             <div className="absolute flex items-center justify-center w-4 h-[18px] text-white">
                               <svg
                                 className="w-6 h-6"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="3"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                               >
                                 <path d="M6 12l4 4L18 8" />
                               </svg>
                             </div>
                           )}
                         </div>
                       </div>
                       <label
                         htmlFor={option}
                         className="text-base ml-4 font-normal text-[#2a2f31]"
                       >
                         {option}
                       </label>
                     </div>
                   </div>
                 ))}
               </div>
             )}
             {question.input_type === "radio" && question.options && (
               <div className="space-y-2">
                 {question.options.split(",").map((option: any) => (
                   <div key={option} className="flex items-center">
                     <div
                       className={`border-1 flex h-6 w-6 justify-center self-center rounded-lg border ${values[question.id]?.answer === option ? "border-sky-700" : "border-[#DBDDDE]"}`}
                     >
                       <div
                         className={`flex h-5 w-5 justify-center self-center rounded-md ${values[question.id]?.answer === option ? "border border-sky-700 bg-sky-700" : ""}`}
                       >
                         <input
                           type="radio"
                           id={`${question.id}-${option}`}
                           name={`question-${question.id}`}
                           onBlur={handleBlur}

                           value={option || ""}
                           checked={values[question.id]?.answer === option}
                           onChange={(e) => handleRadioChange(e, question.id)}
                           className={`peer-not h-5 w-5 appearance-none ${values[question.id]?.answer === option ? "invisible" : ""} rounded-md border-hidden`}
                         />
                       </div>
                     </div>
                     <label
                       htmlFor={option}
                       className="text-base ml-4 text-[#2a2f31]"
                     >
                       {option}
                     </label>
                   </div>
                 ))}
               </div>
             )}

             {question.input_type === "text" && (
               <div>
                 <textarea
                   id={question.id}
                   name={question.id}
                   onBlur={handleBlur}

                   rows={question.question.toLowerCase().includes("list") ? 6 : undefined}
                   onChange={(e) => handleTextChange(e, question.id)}
                   value={values[question.id]?.answer || ""}
                   placeholder={question.subtext || "Enter information"}
                   className="block w-full text-base border rounded-md"
                 ></textarea>
               </div>
             )}

             {question.input_type === "phone" && (
               <div className="flex">
                 <input
                   id={question.id}
                   name={question.id}
                   onBlur={handleBlur}

                   type="tel"
                   onChange={(e) => handleTextChange(e, question.id)}
                   value={formatPhoneNumber(values[question.id]?.answer) || ""}
                   placeholder={question.subtext || "123-456-7985"}
                   className="w-full rounded-md border px-4 py-3 text-base"
                 />
               </div>
             )}

             {question.input_type === "date" && (
               <div className="w-full relative flex">
                 <input
                   type="date"
                   id={question.id}
                   onBlur={handleBlur}

                   name={`question-${question.id}`}
                   value={values[question.id]?.answer || ""}
                   onChange={(e) => handleDateChange(e, question.id)}
                   className={`border ${errors[question.id] ? "border-red-600" : "border-gray-300"} w-full py-2 pt-6 rounded-lg appearance-none`}
                   placeholder="mm/dd/yyyy"
                 />
                 <label
                   htmlFor="dateOfInjury"
                   className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-3 ${errors.dateOfBirth ? "text-zest-6" : ""}`}
                 >
                   Input Date
                   <span className={`text-zest-6 text-xs font-normal `}>
                     *
                   </span>
                 </label>
                 <img
                   alt="Calendar"
                   src="../assets/images/Calendar.svg"
                   className="absolute right-0 top-0 mt-[29px] z-10 mr-[15px] items-end justify-end w-4"
                 />
                 
               </div>
             )}

             {question.input_type === "dropdown" && question.options && (
               <div className="my-2">
                 <select
                   id={question.id}
                   name={`question-${question.id}`}
                   onChange={(e) => handleDropdownChange(e, question.id)}
                   value={values[question.id]?.answer || ""}
                   onBlur={handleBlur}

                   className="block w-full text-base border rounded-md"
                 >
                   <option value="" disabled>
                     Select an option
                   </option>
                   {question.options.split(",").map((option: any) => (
                     <option key={option} value={option || ""}>
                       {option.replace("&comma;", ",")}
                     </option>
                   ))}
                 </select>
               </div>
             )}

             {errors[question.id] &&  touched[question.id]&& (
               <span className="pl-2 text-xs font-normal text-zest-6">
                 Required Field
               </span>
             )}
           </div>
            ))}

          </div>
          <div className="flex p-4 items-end gap-4 ">
            <div className="w-2/6 ">
              <button
                id="back"import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useFormState } from "../FormContext";
import {
createCarrierSchema
} from "../../schemas/insurance";
import { validateSubscriberId, } from "../../actions/api";
import Carrier from "@/app/models/Carrier";
interface DoYouHaveInsuranceProps {
  onCheckboxChange: any;
  section: 1| 2; // Restrict section to these two values
  isValidInsurance: boolean; // triggers page change
  onInsuranceDataChange: any;
  rteData: any;
  setRteData: (rteData: any) => void;
  validateResult: boolean; //disabled buttons and shows result
  validationStatus: string; //shows result
  isValidating: any; // Make statusUpdate optional
  setValidateResult: (validateResult: boolean) => void;
  setValidationStatus: (validationStatus: string) => void;
  setIsValidInsurance: (isValidInsurance: boolean) => void;
  setIsValidating: (isValidating: boolean) => void;
  handleErrors: (errors: any) => void; // Add this prop

  setTriggerValidation: (triggerValidation: boolean) => void;
  // hasInsurance: any;
  triggerValidation: any;
  carriers: any;
  registrationId: number;
}
const DoYouHaveInsuranceForm = ({
  section,
  isValidInsurance,
  setIsValidInsurance: setIsValidInsurance1,
  setValidateResult,
  onInsuranceDataChange,
  setRteData,
  rteData,
  validateResult,
  isValidating,
  validationStatus,
  setIsValidating,
  setValidationStatus,
  onCheckboxChange,
  triggerValidation,
  setTriggerValidation: setTriggerValidation1,
  handleErrors,
  carriers,
  registrationId,
}: DoYouHaveInsuranceProps) => {
  const { setInsuranceData, insuranceData, patientData,
    // validationStatus,

    // validateResult1,

    validationStatus2,
    validateResult2,
  } = useFormState();
  const validationSchema = createCarrierSchema(section);

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    touched,
    setErrors,
    setTouched,
  } = useFormik({
    initialValues: {
      [`insuranceCarrier${section}`]: insuranceData
        ? insuranceData[`insuranceCarrier${section}`]
        : "",
      [`subscriberId${section}`]: insuranceData
        ? insuranceData[`subscriberId${section}`]
        : "",
      [`hasInsurance${section}`]: insuranceData
        ? insuranceData[`hasInsurance${section}`]
        : "",
      // ... other dynamic fields for the section
    },
    validationSchema:validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      onHandleFormSubmit(values);
    },
  });
  useEffect(() => {
    if (section) {
      resetValidationState1();
      // setValidationStatus(prev => ({ ...prev, [section]: "" }));
      // Reset other fields as necessary
    }
  }, [section]);
  useEffect(() => {
    if (values[`hasInsurance${section}`] === "1") {
      handleErrors(errors);
      console.log(errors, "errors");
    } else {
      setTouched({}, false);
      setErrors({});
      handleErrors(errors); // Pass the current errors to the parent component
    }
  }, [errors, handleErrors, values[`hasInsurance${section}`]]);
  const sequence = section === 1 ? "1" : section === 2 ? "2" : "1"; // Defaults to 1 if section is not "2"


  // const [rteData1, setRteData1] = useState<any>();

  // const [validateResult, setValidateResult] = useState(false);

  const handleCheckboxChange = (value: any) => {
    setValidationStatus("");

    setFieldValue(`hasInsurance${section}`, value);

    // Notify parent of the change
    onCheckboxChange({
      ...values,
      [`hasInsurance${section}`]: value, section });
  };


  const resetValidationState1 = () => {
    setIsValidating(false);
    setTriggerValidation1(false);
    // setValidateResult(false);
    setIsValidInsurance1(false);

  };
  const validate = async () => {
    setIsValidating(true);
    setValidationStatus("validating");
    try {
      const { success, data } = await validateSubscriberId(
        registrationId,
        values[`subscriberId${section}`],
        values[`insuranceCarrier${section}`],
        sequence

      );
      setValidationStatus("done");

      setIsValidating(false);
      console.log(success, "Result from validateSubscriberId");
      console.log(data, "Returned Data from validateSubscriberId");

      // Set the validation status based on success
      if (success) {
        setValidateResult(true); // valid

        // Simulate delay for showing the valid status
        setTimeout(() => {
          // setValidateResult(false); // reset disabled

          setIsValidInsurance1(true); // Set isValidInsurance to true after 3 seconds
          // setRteData1(data);

          setInsuranceData((prev: any) => ({ ...prev, ...values })); // pass data to insurance
          setRteData(data)

          // Proceed with form submission 
          console.log("Form submitted with insurance data do you:", values);
          onHandleFormSubmit(values);

        }, 3000); // Delay of 3 seconds

      } else {
        console.log("Validation failed, resetting trigger.");

        setValidationStatus("done");
        resetValidationState1();

      }

      // In case of not  success, the final state updates happen in the timeout
      if (!success) {
        resetValidationState1();
      }

    } catch (error) {
      console.error("Error during validation:", error);
      setValidationStatus("error");
      setIsValidating(false);
      setTriggerValidation1(false);
      return false; // Return false in case of an error
    }
  };
  useEffect(() => {
    if (rteData) {

      console.log(rteData.valid, "rte valid")

    }
  }, [rteData]);

  useEffect(() => {
    if (triggerValidation) {
      validate();

    }
  }, [triggerValidation]);
  console.log("validation status", validationStatus)
  console.log("validation result", validateResult)

  const onHandleFormSubmit = (data: any) => {

    console.log("after validation status", validationStatus)
    console.log("after validation result", validateResult)
    console.log("doyouhave", data)

    onInsuranceDataChange(data, section);
    //  setInsuranceData((prev: any) => ({ ...prev, ...data }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`flex flex-col flex-1`}>
        <div className={`flex flex-col `}>
          <div className="relative mt-4 items-center">
            <div
                      onClick={() => !isValidating && handleCheckboxChange("1")}

              className="flex gap-4"
            >
              <div
                onClick={() => handleCheckboxChange("1")}
                className={`border-1 flex h-6 w-6 justify-center self-center rounded-lg border  ${values[`hasInsurance${section}`] === "1" ? "border-sky-700 " : "border-[#DBDDDE] "} `}
              >
                <div
                  className={`flex h-5 w-5 justify-center self-center rounded-md  ${values[`hasInsurance${section}`] === "1" ? "border border-sky-700 bg-sky-700" : ""} `}
                >
                  <input
                    type="checkbox"
                    disabled={isValidating || isValidInsurance}
                    name={`hasInsurance${section}`}
                    onBlur={handleBlur}
                    checked={values[`hasInsurance${section}`] === "1"}
                    onChange={() => handleCheckboxChange("1")}
                    className={`peer-not h-5 w-5 appearance-none ${values[`hasInsurance${section}`] === "1" ? "invisible" : ""}  rounded-md border-hidden `}
                  ></input>
                </div>
              </div>
              <div className=" inline-flex flex-col items-start justify-center">
                <label className="text-right  text-base font-normal text-[#2a2f31]">
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
        {values[`hasInsurance${section}`] === "1" && (
          <div
            id="carrierSection"
            className={`flex flex-col ${!isValidating && validationStatus === "done" && !validateResult
              ? "bg-[#d13e27]/10"
              : "bg-[#e8f2f5]"
              } p-4`}          >
            {/* Who is the insurance carrier */}
            <div className="relative mt-4 items-center">
              <div>
                <select
                  id="insuranceCarrier"
                  name={`insuranceCarrier${section}`}
                  value={values[`insuranceCarrier${section}`] || ""}
                  onChange={handleChange}
                  disabled={
                    isValidating ||
                    (validationStatus === "done" && validateResult)
                  }
                  className={`  ${!isValidating && validationStatus == "done" && !validateResult ? "border-[#d13e27]" : "border-[#dbddde]"}   ${isValidating ? " flex-col border border-[#dbddde] bg-[#e8f2f5]  text-[#6e787a] opacity-70" : "border"} w-full rounded-lg  py-2 pl-3 pt-6 ${!isValidating && validationStatus == "done" ? "text-[#2a2f31]" : ""}   ${touched[`insuranceCarrier${section}`] &&
                    errors[`insuranceCarrier${section}`]
                    ? "border-red-500"
                    : "border-[#6e787a]"
                    }  `}
                >
                  <option disabled value={""}>
                    Choose Carrier
                  </option>
                  {JSON.parse(carriers).map((carrier: any) => (
                    <option value={carrier.id} key={carrier.id}>
                      {carrier.display}
                    </option>
                  ))}
                </select>
              </div>
              <label
                htmlFor="insuranceCarrier"
                className={`absolute ${isValidating ? "bg-[#e8f2f5]" : ""} left-0 top-0 ml-4 mt-2 text-xs text-black-4 `}
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
                    value={values[`subscriberId${section}`] || ""}
                    onChange={handleChange}
                    disabled={
                      isValidating ||
                      (validationStatus === "done" && validateResult)
                    }
                    onBlur={handleBlur}
                    className={` border
                  ${isValidating
                        ? "border-[#dbddde] bg-[#e8f2f5] text-[#6e787a] opacity-70"
                        : validationStatus === "done"
                          ? validateResult
                            ? "border-[#6ea787a]"
                            : "border-red-500"
                          : "border-[#6e787a]"
                      } 
                  ${touched[`subscriberId${section}`] &&
                        errors[`subscriberId${section}`]
                        ? "border-red-500"
                        : "border-[#6e787a]"
                      } 
                  w-full rounded-lg px-4 py-2 pt-6
                `}
                  />

                  <svg
                    className={` absolute left-[90%] top-4  mt-2  rounded-full  bg-slate-200 text-xs ${values.isValidInsurance !== "true" ? "hidden" : "block"}  ${isValidating ? "bg-[#e8f2f5]" : ""}`}
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
                  className={`absolute left-0 top-0 ml-4  mt-2 text-xs text-black-4 ${touched[`subscriberId${section}`] && errors[`subscriberId${section}`] ? "text-status-red-text" : ""}   ${isValidating ? "bg-[#e8f2f5]" : ""}`}
                >
                  Subscriber ID{" "}
                  <span className={`text-xs font-normal text-zest-6 `}>*</span>
                </label>
              </div>
              <span
                className={`pl-2 text-xs font-normal ${errors[`subscriberId${section}`] ? "block" : "hidden"} text-zest-6 `}
              >
                {touched[`subscriberId${section}`] &&
                  (errors[`subscriberId${section}`] as string)}
              </span>
              <div className=" mb-2 pl-1 text-sm text-black-2">
                This is NOT group, issuer, or RX number and may contain letters
                and numbers.
              </div>
            </div>

            {!isValidating && validationStatus == "done" && (
              <div
                className={`${validateResult ? "bg-[#31936e]/25  text-status-green-text" : " bg-[#d13e27]/25 text-status-red-text"} mt-4 inline-flex h-[33px] items-center justify-center gap-2.5 rounded px-3 py-2`}
              >
                <div className={`text-center text-sm font-bold `}>
                  {validateResult ? "Valid Insurance" : "Invalid Insurance"}
                </div>
              </div>
            )}
          </div>
        )}

        {/* No i dont have */}
        <div
          className={`flex flex-col ${values.isValidInsurance !== "true" ? "block" : "hidden"}`}
        >
          <div className="relative mt-4 items-center">
            <div
              onClick={() => {
                if (!isValidating) handleCheckboxChange("0");
              }}
              className="flex gap-4"
            >
              <div
                className={`border-1 flex h-6 w-6 justify-center self-center rounded-lg border  ${values[`hasInsurance${section}`] === "0" ? "border-sky-700 " : "border-[#DBDDDE] "} `}
              >
                <div
                  className={`flex   h-5  w-5 justify-center self-center rounded-md  ${values[`hasInsurance${section}`] === "0" ? "bg-sky-700 " : ""}`}
                >
                  <input
                    id={`hasInsurance${section}`}
                    type="checkbox"
                    disabled={isValidating}
                    name={`hasInsurance${section}`}
                    checked={values[`hasInsurance${section}`] === "0"}
                    onChange={() => handleCheckboxChange("0")}
                    className={`peer-not h-5 w-5 appearance-none ${values[`hasInsurance${section}`] === "0" ? "invisible" : ""}  rounded-md border-hidden `}
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

                onClick={onHandleBack}
                className={` w-full rounded-3xl text-black text-center h-10 py-2 border-slate-600 border-2  `}
              >
                Back
              </button>
            </div>
            <div className="w-2/6 ">
              <button
                id="back"
                onClick={onHandleNext}
                className={` w-full rounded-3xl text-black text-center h-10 py-2 border-slate-600 border-2  `}
              >
                Skip
              </button>
            </div>
            <div className="w-4/6">
              <button
                id="submit"
                type="submit"
                onClick={onHandleFormSubmit}
                className={`  ${hasErrors
                  ? "pointer-events-none opacity-50"
                  : ""
                  } w-full  rounded-3xl text-white text-center py-2  bg-spruce-4 `}
                disabled={hasErrors}
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </>
    </FormProvider>
  );
};

export default ClinicalQuestionsPage;
