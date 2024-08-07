import React from 'react';
import { useFormik } from 'formik';

const BehavorialQuestions = () => {
  const questions = [
    {
      id: 'question1',
      label: 'Please Select any mental health illnesses that you have been diagnosed with:',
      options: [
        { id: 'anxiety', label: 'Anxiety', component: "Checkbox" },
        { id: 'depression', label: 'Depression', component: "Checkbox" },
        { id: 'personality-disorder', label: 'Personality Disorder', component: "Checkbox" },
        { id: 'ptsd', label: 'PTSD', component: "Checkbox" },
      ],
    },
    {
      id: 'question2',
      label: 'Please list any other medical problems you have been diagnosed with:',
      options: [
        { id: 'otherMedicalConditions', label: 'Other Medical Conditions', component: "Textbox" },
      ],
    },
  ];

  const initialValues = questions.reduce((values : any, question: any) => {
    question.options.forEach((option: { id: string | number; component: string; })=> {
      values[option.id] = option.component === "Checkbox" ? false : "";
    });
    return values;
  }, {});

  const { values, errors, handleSubmit, handleChange, isValid, setSubmitting } =
useFormik({
    initialValues: initialValues,
    onSubmit: values => {
      console.log('Form values:', values);
    },
  });

  return (
    <>
      <form onSubmit={values.handleSubmit} className="">
        <div>
          {questions.map((question) => (
            <div key={question.id} className="flex flex-col">
              <div className="relative mt-4 items-center">
                <h2 className="mb-2 text-lg">{question.label}</h2>
                {question.options.map((option) => (
                  <div key={option.id} className="mb-3 flex">
                    <div className="align-center flex">
                      {option.component === "Checkbox" && (
                        <div className={`mr-5 flex h-5 w-5 justify-center self-center rounded-md border-[#DBDDDE]`}>
                          <input
                            type="checkbox"
                            name={option.id}
                            onChange={values.handleChange}
                            // checked={values[option.id]}
                            className={`peer-not align-center h-5 w-5 rounded-md border border-sky-700 `}
                          />
                        </div>
                      )}
                    </div>
                    <div className="options">
                      <label htmlFor={option.id}>{option.label}</label>
                      {option.component === "Textbox" && (
                        <div className="mr-5 flex justify-center self-center border rounded-md border-red-500">
                          <textarea
                            id={option.id}
                            name={option.id}
                            onChange={handleChange}
                            value={values[option.id]}
                            className=""
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
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </>
  );
};

export default BehavorialQuestions;
