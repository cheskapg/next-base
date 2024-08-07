import React from 'react';
import { useFormik } from 'formik';
import { FormProvider, useFormState } from '../FormContext';
import BehavioralQuestions from '@/models/BehavioralQuestions';

const BehavorialQuestions = () => {
  const questions = [
    {
      id: 'question1',
      label:
        'Please Select any mental health illnesses that you have been diagnosed with:',
      options: [
        { id: 'anxiety', label: 'Anxiety', component: 'Checkbox' },
        { id: 'depression', label: 'Depression', component: 'Checkbox' },
        {
          id: 'personality-disorder',
          label: 'Personality Disorder',
          component: 'Checkbox',
        },
        { id: 'ptsd', label: 'PTSD', component: 'Checkbox' },
        { id: 'Other', label: 'Other', component: 'Checkbox' },

        { id: 'N/A', label: 'None', component: 'Checkbox' },
      ],
    },
    {
      id: 'question2',
      label:
        'Please list any other medical problems you have been diagnosed with:',
      options: [
        {
          id: 'otherMedicalConditions',
          label: 'Other Medical Conditions',
      
          component: 'Textbox',
        },
      ],
    },

    {
      id: 'question3',
      label:
        'Please select if your immediate family members have been diagnosed with either of the following:',
      options: [
        {
          id: 'mentalHealthDisorder',
          label: 'Mental Health Disorder',
          component: 'Checkbox',
        },
        {
          id: 'drugOrAlcoholAbuse',
          label: 'Drug or Alcohol Abuse',
          component: 'Checkbox',
        },
        { id: 'N/A', label: 'Not Applicable', component: 'Checkbox' },
      ],
    },
  ];
  const { behavioralQuestionsData } = useFormState();

  //with each options as true or false just incase it is needed instead of cocatednated string
  const initialValues: any = questions.reduce((values: any, question: any) => {
    values[question.id] = behavioralQuestionsData[question.id] || ''; // Use data from context
    question.options.forEach((option: any) => {
      if (option.component !== 'Checkbox') {
        values[option.id] = behavioralQuestionsData[option.id] || '';
      }
    });
    return values;
  }, {} as BehavioralQuestions);

  //   Explicitly define initial values for each question

  const handleCheckboxChange = (
    e: { target: { name: any; checked: any } },
    questionId: string
  ) => {
    const { name, checked } = e.target;
    let selectedOptions = values[questionId].split(',').filter(Boolean);
  
    if (checked) {
      if (name === 'N/A') {
        selectedOptions = ['N/A'];
      } else {
        selectedOptions = selectedOptions.filter(
          (option: string) => option !== 'N/A'
        );
        selectedOptions.push(name);
      }
    } else {
      selectedOptions = selectedOptions.filter(
        (option: any) => option !== name
      );
    }
  
    // Check if 'Other' is selected and include its details
    if (selectedOptions.includes('Other')) {
      const otherDetails = values[`otherDetails-${questionId}`];
      if (otherDetails) {
        selectedOptions = selectedOptions.filter((option: string) => option !== 'Other');
        selectedOptions.push(`Other: ${otherDetails}`);
      }
    }
  
    // Format the concatenated string
    const formattedOptions = selectedOptions.join(', ');
  
    setFieldValue(questionId, formattedOptions);
  
    // Clear other checkboxes if 'N/A' is selected
    if (name === 'N/A' && checked) {
      questions.forEach((question) => {
        if (question.id === questionId) {
          question.options.forEach((option) => {
            if (option.id !== 'N/A') {
              setFieldValue(option.id, false);
            }
          });
        }
      });
    }
  };
  
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
    },
  });
  return (
    <FormProvider>
      <>
        <div className={`flex flex-1 flex-col p-6`}>
          <div className="text-xl">
            Behavioral Health Questions
            <form onSubmit={handleSubmit} className="">
              <div>
                {questions.map((question) => (
                  <div key={question.id} className="flex flex-col">
                    <div className="relative mt-4 items-center">
                      <h2 className="mb-2 text-lg ">{question.label}</h2>
                      {question.options.map((option) => (
                        <div key={option.id} className="mb-3 flex">
                          <div className="align-center flex">
                            {option.component === 'Checkbox' && (
                              //CUSTOM CHECK COLOR BUT NO CHECKMARK
                              //                               <div
                              //                                 className={`mr-5 flex h-5 w-5 justify-center self-center rounded-md
                              //     ${values[question.id]?.includes(option.id) ? 'border border-sky-700 bg-sky-700' : 'border-[#DBDDDE]'}
                              //   `}
                              //                               >
                              //                                 <input
                              //                                   type="checkbox"
                              //                                   name={option.id}
                              //                                   value={option.id}
                              //                                   onChange={(e) =>
                              //                                     handleCheckboxChange(e, question.id)
                              //                                   }
                              //                                   disabled={
                              //                                     values[question.id].includes('N/A') &&
                              //                                     option.id !== 'N/A'
                              //                                   }
                              //                                   checked={values[question.id]?.includes(
                              //                                     option.id,
                              //                                   )}
                              //                                   className={`peer-not align-center h-5 w-5 rounded-md border-hidden
                              //       ${values[question.id]?.includes(option.id) ? 'invisible' : ''}
                              //     `}
                              //                                 />
                              //                               </div>
                              <div
                                className={`mr-5 flex h-5 w-5 justify-center self-center rounded-md border-[#DBDDDE]`}
                              >
                                <input
                                  type="checkbox"
                                  name={option.id}
                                  // onChange={values.handleChange}
                                  value={values[option.id]}
                                  onChange={(e) =>
                                    handleCheckboxChange(e, question.id)
                                  }
                                  disabled={
                                    values[question.id].includes('N/A') &&
                                    option.id !== 'N/A'
                                  }
                                  checked={values[question.id].includes(
                                    option.id,
                                  )}
                                  className={`peer-not align-center h-5 w-5  rounded-md border`}
                                />
                              </div>
                            )}
                          </div>
                          <div
                            className={`options ${option.id === 'Other' && values[question.id]?.includes('Other') ? 'items-center flex flex-row' : 'flex flex-col'} w-full`}
                          >
                            <label className="flex align-center " htmlFor={option.id}>{option.label}</label>

                            {option.id === 'Other' &&
                              values[question.id]?.includes('Other') && (
                                <div className="ml-3 flex items-center">
                                <input
                                  type="text"
                                  id={`otherDetails-${question.id}`}
                                  name={`otherDetails-${question.id}`}
                                  onChange={handleChange}
                                  value={values[`otherDetails-${question.id}`] || ''}
                                  className="rounded-md border p-2"
                                  placeholder="Enter additional details"
                                />
                              </div>
                              )}

                            {option.component === 'Textbox' && (
                              <div className="mt-2 flex w-full grow rounded-md border border-red-500">
                                <textarea
                                  id={option.id}
                                  name={option.id}
                                  onChange={handleChange}
                                  value={values[option.id]}
                                  className="w-full grow"
                                  placeholder="Enter any additional medical problems"
                                ></textarea>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="mt-4 rounded bg-blue-500 p-2 text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    </FormProvider>
  );
};

export default BehavorialQuestions;
