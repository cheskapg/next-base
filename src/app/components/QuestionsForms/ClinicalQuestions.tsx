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
                id="back"
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
