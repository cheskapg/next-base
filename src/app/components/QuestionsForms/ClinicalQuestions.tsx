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
        setFieldValue : any,
        values : any,
        questionId: number,
        newAnswer = '',
        personId = 0, // Default value if not provided
        type = '', // Default value if not provided
        questionType = '' // Default value if not provided
      ) => {
        setFieldValue(questionId, {
          questionId,
          answer: newAnswer,
          personId,
          type,
          questionType,
        });
      };
      
    const { clinicalQuestionsData, setClinicalQuestionsData, patientData, onHandleNext} = useFormState();
   
    const initialValues: any = questionsData.reduce((values: any, question: any) => {
        values[question.id] = {
            questionId: question.id,
            answer: '', // Default empty string for answers
            personId: 0, // Assuming personId is 0 for initialization
            type: question.input_type,
            questionType: question.input_type,
        };
             return values;
    }, {});

    //   Explicitly define initial values for each question
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
        const { name, checked } = e.target;
        let selectedOptions = values[questionId]?.answer.split(',').filter(Boolean) || [];
        
        if (checked) {
          if (!selectedOptions.includes(name)) {
            selectedOptions.push(name);
          }
        } else {
          selectedOptions = selectedOptions.filter((option: any) => option !== name);
        }
        
        updateFieldValue(
          setFieldValue,
          values,
          questionId,
          selectedOptions.join(','),
          0, // or pass a specific personId if needed
          'checkbox', // or pass a specific type if needed
          'checkbox' // or pass a specific questionType if needed
        );
      };
      const handleRadioChange = (e: { target: { value: any; }; }, questionId: number) => {
        const newValue = e.target.value;
        
        updateFieldValue(
          setFieldValue,
          values,
          questionId,
          newValue,
          0, // or pass a specific personId if needed
          'radio', // or pass a specific type if needed
          'radio' // or pass a specific questionType if needed
        );
      };
      const handleTextChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, questionId: number) => {
        const newValue = e.target.value;
        
        updateFieldValue(
          setFieldValue,
          values,
          questionId,
          newValue,
          0, // or pass a specific personId if needed
          'text', // or pass a specific type if needed
          'text' // or pass a specific questionType if needed
        );
      };
      type TransformedValues = {
        [key: string]: ClinicalQuestions;
      };
      const transformValues = (values: { [key: string]: any }): TransformedValues => {
        const transformed: TransformedValues = {};
      
        Object.keys(values).forEach((questionId) => {
          const { answer, personId, type, questionType } = values[questionId];
          
          transformed[questionId] = {
            answer: answer || '', // Default to an empty string if not provided
            personId: personId || 0, // Default to 0 if not provided
            questionId: Number(questionId), // Ensure it's a number
            questionType: questionType || '', // Default to an empty string if not provided
            type: type || '' // Default to an empty string if not provided
          };
        });
      
        return transformed;
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
            console.log(clinicalAnswers, "value on handle psalm");
            console.log(patientData.patientId, "patient id psalm");
      
            // Call the mock function
            await updateClinicalQuestions(patientData.patientId, clinicalAnswers);
          
      
          console.log("All clinical questions updated successfully");
      
        //   // Mock function for setClinicalQuestionsData
        //   const setClinicalQuestionsData = (data: any) => {
        //     console.log('Clinical questions data updated:', data);
        //   };
      
        //   // Mock function for onHandleNext
        //   const onHandleNext = () => {
        //     console.log('Proceeding to the next step');
        //   };
      
          setClinicalQuestionsData((prev: any) => ({
            ...prev,
            ...values,
          }));
      
          onHandleNext();
        } catch (error) {
          console.log(error);
          alert("Oops! Something went wrong. Please try again.");
        }
      };
      
      const onHandleFCormSubmit = async (values: any) => {
        try {
          for (const key of Object.keys(values)) {
            const updatedValue = {
              ...values[key],
              personId: patientData.personId, // Ensure the correct patient ID is assigned
            };
            console.log(updatedValue,"value on handle psalm")
            //   personId: patientData.patientId, // Ensure the correct patient ID is assigned
              console.log(patientData, "patient id psalm")
            await updateClinicalQuestions(patientData.patientId, updatedValue);
          }
      
          setClinicalQuestionsData((prev: any) => ({
            ...prev,
            ...values,
          }));
          console.log("All clinical questions updated successfully");
      
          onHandleNext();
        } catch (error) {
          console.log(error);
          alert("Oops! Something went wrong. Please try again.");
        }
      };
      
      
    useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await fetchClinicalQuestions(1000); // Example region ID
            setQuestionsData(questions || []);
            console.log(questions, "questionesz");
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
            
            const formattedValues = transformValues(values);
            console.log('Formatted Values:', formattedValues);
            onHandleFormSubmit(values)
        },
    });
    return (
        <FormProvider>
            <>
                <div className="flex flex-col p-6 ">
                    <h1 className="text-lg font-normal mb-4">Clinical Health Questions</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {questionsData.map((question: any) => (
                            <div key={question.id} className="question container">
                                <h2 className="text-base font-medium  mb-4">{question.question}</h2>
                                {question.input_type === 'checkbox' && question.options && (
                                    <div className="space-y-2 ">
                                        {question.options.split(',').map((option: any) => (
                                            <div key={option} className="flex items-center">
                                                <div className='mb-4'>
                                                <input
                                                    type="checkbox"
                                                    id={option}
                                                    name={option}
                                                    checked={values[question.id]?.answer.split(',').includes(option) || false}
                                                    
                                                    onChange={(e) => handleCheckboxChange(e, question.id)}
                                                    className="mr-2 h-5 w-5  rounded border-gray-300"
                                                    />
                                                <label htmlFor={option} className="text-base font-normal text-[#2a2f31]">{option}</label>
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
                                                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300"
                                                />
                                                <label htmlFor={option} className="text-sm">{option}</label>
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
                               className="block w-full  text-base border rounded-md"
                                ></textarea>
                                        {/* <input
                                            type="textarea"
                                            id={question.id}
                                            name={question.id}
                                            onChange={(e) => handleTextChange(e, question.id)}
                                            value={values[question.id]?.answer || ''} // Accessing answer from Formik state
                                            placeholder={question.subtext || ''}
                                            className="block w-full  text-base border rounded-md"
                                        /> */}
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
                                            className="w-full h-10 
                                            p-2 border rounded-md"
                                        ></textarea>
                                    </div>
                                )}
                                {question.is_required && (
                                    <span className="text-red-500 text-sm">Required</span>
                                )}
                            </div>
                        ))}
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="mt-4 rounded bg-blue-500 p-2 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </>
        </FormProvider>
    );
};

export default ClinicalQuestionsPage;
