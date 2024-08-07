import React from 'react';
import { useFormik } from 'formik';

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

  const initialValues = questions.reduce((values: any, question: any) => {
    values[question.id] = ''; // Initialize each question with an empty string
    question.options.forEach(
      (option: { component: string; id: string | number }) => {
        if (option.component !== 'Checkbox') {
          values[option.id] = '';
        }
      },
    );
    return values;
  }, {});

  const handleCheckboxChange = (
    e: { target: { name: any; checked: any } },
    questionId: string,
  ) => {
    const { name, checked } = e.target;
    let selectedOptions = values[questionId].split(',').filter(Boolean);

    if (checked) {
      if (name === 'N/A') {
        selectedOptions = ['N/A'];
      } else {
        selectedOptions = selectedOptions.filter(
          (option: string) => option !== 'N/A',
        );
        selectedOptions.push(name);
      }
    } else {
      selectedOptions = selectedOptions.filter(
        (option: any) => option !== name,
      );
    }
    setFieldValue(questionId, selectedOptions.join(','));

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
    <>
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
                            disabled={values[question.id].includes('N/A') && option.id !== 'N/A'}

                            checked={values[question.id].includes(option.id)}
                            className={`peer-not align-center h-5 w-5  rounded-md border border-sky-700 bg-sky-700`}
                          />
                        </div>
                      )}
                    </div>
                    <div className="options w-full">
                      <label htmlFor={option.id}>{option.label}</label>
                      {option.component === 'Textbox' && (
                        <div className=" flex grow justify-center self-center rounded-md border border-red-500">
                          <textarea
                            id={option.id}
                            name={option.id}
                            onChange={handleChange}
                            value={values[option.id]}
                            className=" w-full grow"
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
    </>
  );
};

export default BehavorialQuestions;
