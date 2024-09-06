import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { FormProvider, useFormState } from '../FormContext';

import { transform } from 'next/dist/build/swc';
import ClinicalQuestions from '@/models/ClinicalQuestions';
import { fetchClinicalQuestions, updateClinicalQuestions } from '@/actions/api';

const ClinicalQuestionsPage = () => {
  // for static api
  type ClinicalQuestion = {
    id: number;
    region_id: number;
    section: string;
    question: string;
    subtext: string | null;
    options: string | null;
    input_type: string;
    visit_reason: string | null;
    conditional_id: number | null;
    conditional_value: string | null;
    minimum_age: number | null;
    is_required: boolean;
    form_display: boolean;
    high_risk_answer: string | null;
    high_risk_answer_status: string | null;
  };

  const [questionsData, setQuestionsData] = useState<ClinicalQuestion[]>([]);
  const updateFieldValue = (
    setFieldValue: any,
    values: any,
    questionId: number,
    newAnswer = '',
    personId = 0, // Default value if not provided
    type = '', // Default value if not provided
    questionType = '', // Default value if not provided
  ) => {
    setFieldValue(questionId, {
      questionId,
      answer: newAnswer,
      personId,
      type,
      questionType,
    });
  };

  const {
    clinicalQuestionsData,
    setClinicalQuestionsData,
    patientData,
    onHandleNext,
    onHandleBack
  } = useFormState();
  const [clinicalAnswersData, setClinicalAnswersData] = useState(clinicalQuestionsData);

  const initialValues: any = questionsData.reduce(
    (values: any, question: any) => {
      values[question.id] = {
        questionId: clinicalAnswersData?.questionId ||  question.id,
        answer: clinicalAnswersData?.questionId || '', // Default empty string for answers
        personId:patientData.personId || 0, // Assuming personId is 0 for initialization
        type: clinicalAnswersData?.type || question.input_type,
        questionType: clinicalAnswersData?.questionType || question.input_type,
      };
      return values;
    },
    {},
  );

  //   Explicitly define initial values for each question
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: number,
  ) => {
    const { name, checked } = e.target;
    let selectedOptions =
      values[questionId]?.answer.split(',').filter(Boolean) || [];

    if (checked) {
      if (!selectedOptions.includes(name)) {
        selectedOptions.push(name);
      }
    } else {
      selectedOptions = selectedOptions.filter(
        (option: any) => option !== name,
      );
    }

    updateFieldValue(
      setFieldValue,
      values,
      questionId,
      selectedOptions.join(','),
      0, // or pass a specific personId if needed
      'checkbox', // or pass a specific type if needed
      'checkbox', // or pass a specific questionType if needed
    );
  };
  const handleRadioChange = (
    e: { target: { value: any } },
    questionId: number,
  ) => {
    const newValue = e.target.value;

    updateFieldValue(
      setFieldValue,
      values,
      questionId,
      newValue,
      0, // or pass a specific personId if needed
      'radio', // or pass a specific type if needed
      'radio', // or pass a specific questionType if needed
    );
  };
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionId: number,
  ) => {
    const newValue = e.target.value;

    updateFieldValue(
      setFieldValue,
      values,
      questionId,
      newValue,
      0, // or pass a specific personId if needed
      'text', // or pass a specific type if needed
      'text', // or pass a specific questionType if needed
    );
  };
  
  const mockPatientData = {
    id: 2780618,
  };

  const mockClinicalQuestion = {
    questionId: 1,
    answer: 'High Blood Pressure',
    personId: mockPatientData.id, // Make sure the personId is set correctly
    type: 'checkbox',
    questionType: 'checkbox',
  };
  const onHandleFormSubmit = async (values: any) => {
    try {
      const clinicalAnswers = Object.keys(values).map((key) => ({
        ...values[key],
        personId: patientData.personId, // Ensure the correct patient ID is assigned
      }));
      setClinicalQuestionsData((prev: any) => ({
        ...prev,
        ...values,
      }));
      console.log(clinicalAnswers, 'value on handle psalm');
      console.log(patientData.patientId, 'patient id psalm');

      console.log(
        clinicalAnswers.toString,
        'All clinical questions updated successfully',
      );

      console.log(clinicalQuestionsData, 'clinicalQuestions');
      // onHandleNext();
    } catch (error) {
      console.log(error);
      alert('Oops! Something went wrong. Please try again.');
    }
  };
  useEffect(() => {
    console.log(clinicalQuestionsData, 'Updated clinicalQuestionsData');
  }, [clinicalQuestionsData]);
  const onHandleFCormSubmit = async (values: any) => {
    try {
      for (const key of Object.keys(values)) {
        const updatedValue = {
          ...values[key],
          personId: patientData.personId, // Ensure the correct patient ID is assigned
        };
        console.log(updatedValue, 'value on handle psalm');
        //   personId: patientData.patientId, // Ensure the correct patient ID is assigned
        console.log(patientData, 'patient id psalm');
        await updateClinicalQuestions(patientData.patientId, updatedValue);
      }

      setClinicalQuestionsData((prev: any) => ({
        ...prev,
        ...values,
      }));
      console.log('All clinical questions updated successfully');

      onHandleNext();
    } catch (error) {
      console.log(error);
      alert('Oops! Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await fetchClinicalQuestions(1000); // Example region ID
      setQuestionsData(questions || []);
      console.log(questions, 'questionesz');
    };
    fetchQuestions();
  }, []);
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    handleChange,
    isValid,
    setSubmitting,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log('Form values:', values);

      onHandleFormSubmit(values);
    },
  });
  useEffect(() => {
    fetchClinicalAnswers();
  }, []);

  const fetchClinicalAnswers = async () => {
    const response = clinicalQuestionsData
    setClinicalAnswersData((prev: any) => ({
      ...prev,
      ...response,
    }));

  };
  return (
    <FormProvider>
      <>
        <div className="flex flex-col p-6 ">
          <h1 className="mb-4 text-lg font-normal">
            Clinical Health Questions
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {questionsData.map((question: any) => (
              <div key={question.id} className="question container">
                <h2 className="mb-4 text-base  font-medium">
                  {question.question}
                </h2>
                {question.input_type === 'checkbox' && question.options && (
                  <div className="space-y-2 ">
                    {question.options.split(',').map((option: any) => (
                      <div key={option} className="flex items-center">
                        <div className="mb-4">
                          <input
                            type="checkbox"
                            id={option}
                            name={option}
                            checked={
                              values[question.id]?.answer
                                .split(',')
                                .includes(option) || false
                            }
                            onChange={(e) =>
                              handleCheckboxChange(e, question.id)
                            }
                            className="mr-2 h-5 w-5  rounded border-gray-300"
                          />
                          <label
                            htmlFor={option}
                            className="text-base font-normal text-[#2a2f31]"
                          >
                            {option}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {question.input_type === 'radio' && question.options && (
                  <div className="space-y-2">
                    {question.options.split(',').map((option: any) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="radio"
                          id={option}
                          name={option}
                          value={option}
                          checked={values[question.id]?.answer === option}
                          onChange={(e) => handleRadioChange(e, question.id)}
                          className="mr-2 h-4 w-4 border-gray-300 text-blue-600"
                        />
                        <label htmlFor={option} className="text-sm">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                {question.input_type === 'text' && (
                  <div className="mt-2">
                    <textarea
                      id={question.id}
                      name={question.id}
                      onChange={(e) => handleTextChange(e, question.id)}
                      value={values[question.id]?.answer || ''} // Accessing answer from Formik state
                      placeholder={question.subtext || 'Enter information'}
                      className="block w-full  rounded-md border text-base"
                    ></textarea>
                  </div>
                )}
                {question.input_type === 'textarea' && (
                  <div className="mt-2 h-full">
                    <textarea
                      id={question.id}
                      name={question.id}
                      value={values[question.id]?.answer || ''} // Accessing answer from Formik state
                      onChange={handleChange}
                      rows={3}
                      placeholder={question.subtext || ''}
                      className="h-10 w-full 
                                            rounded-md border p-2"
                    ></textarea>
                  </div>
                )}
                {question.is_required && (
                  <span className="text-sm text-red-500">Required</span>
                )}
              </div>
            ))}
            {/* <button
              type="submit"
              disabled={!isValid}
              className="mt-4 rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button> */}
            <div className={`flex p-4 items-end gap-4 `}>
        <div className="w-2/6 ">
          <button
            id="back"
            onClick={onHandleBack}
            className={` w-full rounded-3xl text-black text-center h-10 py-2 border-slate-600 border-2  `}
          >
            Back
          </button>
        </div>
        <div className="w-4/6">
          <button
            id="submit"
            type="submit"
            className={` w-full  rounded-3xl text-white text-center py-2  bg-spruce-4 ${isValid ? "" : "pointer-events-none opacity-50"}`}
            disabled={isValid ? false : true}
          >
            Next
          </button>
        </div>
      </div>
          </form>
        </div>
      </>
    </FormProvider>
  );
};

export default ClinicalQuestionsPage;
