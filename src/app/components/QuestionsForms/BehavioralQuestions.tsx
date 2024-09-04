import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { FormProvider, useFormState } from '../FormContext';
// import BehavioralQuestions from '@/app/models/BehavioralQuestions';
// import { fetchClinicalQuestions } from '@/app/actions/api';
import { transform } from 'next/dist/build/swc';

const BehavorialQuestions = () => {
    //   const questions = [
    //     {
    //       id: 'question1',
    //       label:
    //         'Please Select any mental health illnesses that you have been diagnosed with:',
    //       options: [
    //         { id: 'anxiety', label: 'Anxiety', component: 'Checkbox' },
    //         { id: 'depression', label: 'Depression', component: 'Checkbox' },
    //         {
    //           id: 'personality-disorder',
    //           label: 'Personality Disorder',
    //           component: 'Checkbox',
    //         },
    //         { id: 'ptsd', label: 'PTSD', component: 'Checkbox' },
    //         { id: 'Other', label: 'Other', component: 'Checkbox' },

    //         { id: 'N/A', label: 'None', component: 'Checkbox' },
    //       ],
    //     },
    //     {
    //       id: 'question2',
    //       label:
    //         'Please list any other medical problems you have been diagnosed with:',
    //       options: [
    //         {
    //           id: 'otherMedicalConditions',
    //           label: 'Other Medical Conditions',
    //           component: 'Textbox',
    //         },
    //       ],
    //     },
    //     {
    //       id: 'question3',
    //       label:
    //         'Please select if your immediate family members have been diagnosed with either of the following:',
    //       options: [
    //         {
    //           id: 'mentalHealthDisorder',
    //           label: 'Mental Health Disorder',
    //           component: 'Checkbox',
    //         },
    //         {
    //           id: 'drugOrAlcoholAbuse',
    //           label: 'Drug or Alcohol Abuse',
    //           component: 'Checkbox',
    //         },
    //         { id: 'N/A', label: 'Not Applicable', component: 'Checkbox' },
    //       ],
    //       //add more questions here 
    //     },
    //   ];
    const [questionsData, setQuestionsData] = useState([]);
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
      
    const { behavioralQuestionsData, } = useFormState();
    //   const initialValues: any = questionsData.reduce((values: any, question: any) => {
    //     values[question.id] = behavioralQuestionsData[question.id] || ''; // Use data from context
    //     if (question.input_type === 'checkbox' && question.options) {
    //       question.options.split(',').forEach((option: any) => {
    //         values[option] = behavioralQuestionsData[option] || false;
    //       });
    //     }
    //     return values;
    //   }, {} as BehavioralQuestions);

    const initialValues: any = questionsData.reduce((values: any, question: any) => {
        values[question.id] = {
            questionId: question.id,
            answer: '', // Default empty string for answers
            personId: 0, // Assuming personId is 0 for initialization
            type: question.input_type,
            questionType: question.input_type,
        };
        // concatenate strings for checkbox as answer instead of initializing it
        //   if (question.input_type === 'checkbox' && question.options) {
        //     // Initialize options for checkbox questions
        //     question.options.split(',').forEach((option: any) => {
        //       values[option] = false; // Default to false for checkbox options
        //     });
        //   }


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
      const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
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
        // [key: string]: BehavioralQuestions;
      };
      const transformValues = (values: { [key: string]: any }): TransformedValues => {
        const transformed: TransformedValues = {};
      
        Object.keys(values).forEach((questionId) => {
          const { answer, personId, type, questionType } = values[questionId];
          
        //   transformed[questionId] = {
        //     answer: answer || '', // Default to an empty string if not provided
        //     personId: personId || 0, // Default to 0 if not provided
        //     questionId: Number(questionId), // Ensure it's a number
        //     questionType: questionType || '', // Default to an empty string if not provided
        //     type: type || '' // Default to an empty string if not provided
        //   };
        });
      
        return transformed;
      };
      
    useEffect(() => {
        const fetchQuestions = async () => {
            // const questions = await fetchClinicalQuestions(1000); // Example region ID
            // setQuestionsData(questions || []);

            // console.log(questions, "questionesz");

        };

        // Execute the fetch operation

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
        },
    });
    return (
        <FormProvider>
            <>
                <div className="flex flex-col p-6 ">
                    <h1 className="text-lg font-normal mb-4">Behavioral Health Questions</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {questionsData.map((question: any) => (
                            <div key={question.id} className="question container">
                                <h2 className="text-base font-medium  mb-2">{question.question}</h2>
                                {question.input_type === 'checkbox' && question.options && (
                                    <div className="space-y-2">
                                        {question.options.split(',').map((option: any) => (
                                            <div key={option} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={option}
                                                    name={option}
                                                    //   checked={}
                                                    checked={values[question.id]?.answer.split(',').includes(option) || false}

                                                    onChange={(e) => handleCheckboxChange(e, question.id)}
                                                    className="mr-2 h-5 w-5 rounded border-gray-300"
                                                />
                                                <label htmlFor={option} className="text-base font-normal text-[#2a2f31]">{option}</label>
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
                                        <input
                                            type="text"
                                            id={question.id}
                                            name={question.id}
                                            onChange={(e) => handleTextChange(e, question.id)}
                                            value={values[question.id]?.answer || ''} // Accessing answer from Formik state
                                            placeholder={question.subtext || ''}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                )}
                                {question.input_type === 'textarea' && (
                                    <div className="mt-2">
                                        <textarea
                                            id={question.id}
                                            name={question.id}
                                            value={values[question.id]?.answer || ''} // Accessing answer from Formik state
                                            onChange={handleChange}
                                            placeholder={question.subtext || ''}
                                            className="w-full p-2 border rounded-md"
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

export default BehavorialQuestions;
