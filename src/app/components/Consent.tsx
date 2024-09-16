import { useEffect, useRef, useState } from 'react';
import GlobalDropdowns from '../interface/GlobalDropdowns';
import RegionSpecificDetails from '../interface/RegionSpecificDetails';
import SignaturePadComponent from './SignaturePadComponent';
import { useFormState } from './FormContext';
import { calculateAge } from '../utils/helper'

export default function Consent({
  region,
  globalDropdowns,
}: {
  region: RegionSpecificDetails;
  globalDropdowns: GlobalDropdowns;
}) {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { patientData, onHandleBack, onHandleNext } =
    useFormState();
  const [signature, setSignature] = useState('');
  //signature
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [clearClicked, setClearClicked] = useState<boolean>(false);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [signatureDataURL, setSignatureDataURL] = useState<string | null>(null);
  const [signatureBlob, setSignatureBlob] = useState<Blob | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null); // New state to store the image URL

  const handleSignatureEmptyChange = (isEmpty: boolean) => {
    setIsSigned(!isEmpty); // This automatically handles whether the signature is signed
  };

  const handleSignatureChange = () => {
    setIsSigned(true);
  };

  const clearSignaturePad = () => {
    setClearClicked(true); // Trigger the clearing of the canvas
    setSubmitClicked(false);
    setUploadedImageUrl('');
  };
  const age = calculateAge('1990-02-02'); // test age 
  // const age = calculateAge(patientData.dateOfBirth);



  //for api v2
  const handleDataURLChange = async (dataURL: string | null) => {
    console.log('Data URL:', dataURL);
    setSignatureDataURL(dataURL);

    if (dataURL) {
      try {
        const response = await fetch(dataURL);
        const blob = await response.blob();
        setSignatureBlob(blob);
        convertBlobToUrl(blob); // For displaying the uploaded signature

        // Proceed with further actions, e.g., uploading the Blob
        // await uploadSignature(blob); // Uncomment and implement this function
        // go to next page
        onHandleNext();
        // Reset submitClicked after processing
        setSubmitClicked(false);
      } catch (error) {
        console.error('Error converting data URL to Blob:', error);
      }
    }
  };

  // Reset clearClicked state to false after clearing

  //for api call to upload signature 
  const uploadSignature = async (image: Blob) => {
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer YOUR_TOKEN`, // Replace YOUR_TOKEN with the actual token
          'Content-Type': 'application/octet-stream'
        },
        body: image,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);

      } else {
        console.log('Upload failed:', response);
      }
    } catch (error) {
      console.error('Error uploading signature:', error);
    }
  };

  // for testing 
  const convertBlobToUrl = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setUploadedImageUrl(url);
    // setSubmitClicked(false);

  };

  const handleCompleteRegistration = () => {
    if (isSigned) {
      setSubmitClicked(true); // Notify child to trim the signature
    } else {
      alert('Signature is required');
    }
  };


  useEffect(() => {
    if (clearClicked) {
      setClearClicked(false);
    }
  }, [clearClicked]);






  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, checked } = e.target;
    let newOptions: string[];

    if (checked) {
      newOptions = [...selectedOptions, name];
    } else {
      newOptions = selectedOptions.filter((option) => option !== name);
    }

    setSelectedOptions(newOptions);
  };

  const handleCheckClick = (option: string): void => {
    const isChecked = selectedOptions.includes(option);
    handleCheckboxChange({
      target: { name: option, checked: !isChecked },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const nextStep = () => {

    setStep(step + 1);
    if (age >= 18 && step == 1) {
      setStep(2); // self
    } else setStep(3); // guarantor
  }
  const prevStep = () => {
    if (age >= 18 && step == 2) {
      setStep(1); // self
    }
    if (age <= 18 && step == 3) {
      setStep(1); // guarantor
    }
    if (step == 1) {
      onHandleBack();
    }
  }
  return (
    <div className="flex flex-1 flex-col ">
      {step === 1 && (
        <div>
          <div className="px-6 pt-6 ">
            <h1 className="mb-4 text-lg font-normal">
              Conditions of Registration
            </h1>
            <div className="text-black text-sm">
              <span className="font-normal ">
                We ask all patients to review and agree to our Conditions of
                Registration before being seen.
                <br />
                Please see{' '}
              </span>
              <span className="text-sm font-bold text-[#04a7e0] ">
                the full Conditions of Registration here
              </span>
              <span className="">.</span>
            </div>
            <div>
              <div className="mt-5 font-normal">
                Please review the full agreement and summary below before
                providing your e-signature at the bottom.
              </div>
              {/* Medical consent */}
              <div className="my-5">
                <div className=" text-base font-bold ">Medical Consent:</div>
                <div className=" mt-2 font-normal ">
                  You agree to be treated by Mercy Clinical Oklahoma
                  Communities, Inc., Mercy Health Northwest Arkansas
                  Communities, Inc. d/b/a Mercy Clinic Northwest Arkansas, Mercy
                  Clinic East Communities, Inc., and Mercy Clinic Springfield
                  Communities, Inc., and its affiliated entities, including its
                  employed physicians, as managed by Mercy-GoHealth Urgent Care,
                  LLC (collectively, "Mercy-GoHealth Urgent Care") and consent
                  to the health care services provided to you, which may include
                  tests, examinations, imaging, and other treatment, as
                  determined necessary by your treating provider. You have the
                  right to refuse treatment at any time and to provide real-time
                  feedback and instructions on the care you receive.
                </div>
              </div>
              <div className="my-5">
                <div className=" text-base font-bold ">
                  Financial Agreement:
                </div>
                <div className=" mt-2 ">
                  You agree to pay for all services and care you receive,
                  according to Mercy-GoHealth Urgent Care's rates and terms, and
                  to allow Mercy-GoHealth Urgent Care to bill your insurance
                  <br />
                  company as appropriate to collect payment for services you
                  receive if you provide your insurance information. You also
                  agree to a $25 charge for any returned checks. If asked, you
                  <br />
                  agree to keep a card on-file with Mercy-GoHealth Urgent Care,
                  which may be charged up to a maximum of $250 related to
                  amounts you owe for services received. Mercy-GoHealth
                  <br />
                  Urgent Care will notify you 72 hours prior to any amounts
                  being charged to your card. You also agree to be contacted
                  regarding your bill for amounts owed. If you need financial
                  <br />
                  assistance, you may contact (650) 567-3232 (phone number is
                  market specific) to discuss further.
                </div>
              </div>
              <div className="my-5">
                <div className=" text-base font-bold ">Communications:</div>
                <div className=" mt-2 ">
                  You authorize Mercy-GoHealth Urgent Care to share your
                  telephone number, email address, and other contact information
                  with its affiliated entities and Mercy-GoHealth Urgent Care,
                  LLC, I agree to allow Mercy-GoHealth Urgent Care to contact me
                  after my visit via any means (e.g., phone, email, regular
                  mail, text message or other means) for any reason, including
                  without limitation, via automated notifications, appointment
                  reminders, or other means to effectuate the Purposes. You
                  acknowledge that electronic communications are never 100%
                  secure, but Mercy-GoHealth Urgent Care works hard to protect
                  your information.
                </div>
              </div>
              <div className="my-5">
                <div className=" text-base font-bold ">
                  Use of Patient Information:
                </div>
                <div className=" mt-2 ">
                  You understand that Mercy-GoHealth Urgent Care may use and
                  disclose your health information for treatment, payment, and
                  healthcare operations purposes. More information about
                  Mercy-GoHealth Urgent Care privacy practices can be found
                  here.
                </div>
              </div>
              <div className="my-5">
                <div className=" text-base font-bold ">
                  Electronic Communications:
                </div>
                <div className=" mt-2 ">
                  You agree to allow Mercy-GoHealth Urgent Care to contact you
                  after your visit via electronic means, including by phone,
                  email, and text message, such as after your visit to provide
                  feedback on your experience. You acknowledge that electronic
                  communications are never 100% secure, but Mercy-GoHealth
                  Urgent Care works hard to protect your information.
                </div>
              </div>
              <div className="my-5">
                <div className=" text-base font-bold ">
                  Patient Consent and Acknowledgement:
                </div>
                <div className=" mt-2 ">
                  You confirm you have read and fully understand Mercy-GoHealth
                  Urgent Care's full Conditions of Registration which can be
                  viewed in its entirety
                </div>
              </div>
            </div>
          </div>
          <div className="items-center justify-start ">
            <div className="mb-4 flex items-center justify-center">
              <div
                className={`border-1 flex h-6 w-6 justify-center self-center rounded-lg border ${selectedOptions.includes('Yes') ? 'border-sky-700' : 'border-[#DBDDDE]'}`}
                onClick={() => handleCheckClick('Yes')}
              >
                <div
                  className={`flex h-5 w-5 justify-center self-center rounded-md ${selectedOptions.includes('Yes') ? 'border border-sky-700 bg-sky-700' : ''}`}
                >
                  <input
                    type="checkbox"
                    id="yes-option"
                    name="Yes"
                    checked={selectedOptions.includes('Yes')}
                    onChange={handleCheckboxChange}
                    className={`peer-not h-5 w-5 appearance-none ${selectedOptions.includes('Yes') ? 'invisible' : ''} rounded-md border-hidden`}
                  />
                  {selectedOptions.includes('Yes') && (
                    <div className="absolute flex h-[18px] w-4 items-center justify-center text-white">
                      <svg
                        className="h-6 w-6"
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
                htmlFor="yes-option"
                className="ml-4 inline-flex flex-col items-start text-[#2a2f31]"
              >
                I agree to the Conditions of Registration
              </label>
            </div>
          </div>
          <div className="flex items-end gap-4 p-4 ">
            <div className="w-2/6 ">
              <button
                id="back"
                onClick={prevStep}
                className={` text-black h-10 w-full rounded-3xl border-2 border-slate-600 py-2 text-center  `}
              >
                Back
              </button>
            </div>

            <div className="w-4/6">
              <button
                id="submit"
                type="submit"
                onClick={nextStep}
                className={`w-full rounded-3xl bg-spruce-4 py-2 text-center text-white ${selectedOptions.includes('Yes')
                  ? ''
                  : 'cursor-not-allowed opacity-50'
                  }`}
                disabled={!selectedOptions.includes('Yes')}
              >
                Sign Consent
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="px-6 pt-6 ">
            <h1 className="mb-4 text-lg font-normal">Sign Consent</h1>
            <div className="text-black text-sm">
              <div>
                <span className="text-black text-sm font-normal">
                  By signing below, you also acknowledge you have been provided
                  with a copy of the {" "}
                </span>
                <span className="text-sm font-bold text-[#04a7e0] ">
                  Notice of Privacy Practices
                </span>
                <span className="text-black text-sm font-normal ">
                  , you promise that all information you have given is correct
                  and that you
                  <br />
                  are the patient or otherwise legally authorized to execute and
                  accept this document on the patient's behalf, and assume
                  financial responsibility for the patient by signing this form.
                </span>
              </div>
            </div>
            <div
              className="rounded-lg border border-[#DBDDDE] mt-4 relative "
              onMouseDown={handleSignatureChange}
              onTouchStart={handleSignatureChange}
              onClick={handleSignatureChange}

            >
              {!isSigned && (
                <div className="absolute text-xs text-black-4 ml-4 mt-2">
                  Please sign here
                </div>
              )}
              <SignaturePadComponent
                onSignatureEmptyChange={handleSignatureEmptyChange} // callback from child that canvas is empty
                submitClicked={submitClicked}
                isSigned={isSigned} // updates the status of the canvas
                clearClicked={clearClicked}
                onDataURLChange={handleDataURLChange}
              />
            </div>
            {isSigned && (
              <div className="flex justify-end">
                <button id="clear" onClick={clearSignaturePad} className="text-xs text-black-4">
                  Clear Signature
                </button>
              </div>
            )}
            {uploadedImageUrl && (
              <div>
                <div className="mt-4 flex ">
                  <h2 className="text-lg font-bold ">Uploaded Signature - for DEV viewing</h2>
                </div>
                <div className='flex justify-center'>
                  <img src={uploadedImageUrl} alt="Uploaded Signature" style={{ maxWidth: '50%' }} />
                </div>
              </div>
            )}


          </div>

          <div className="flex items-end gap-4 p-4">
            <div className="w-2/6">
              <button
                id="back"
                onClick={prevStep}
                className="text-black h-10 w-full rounded-3xl border-2 border-slate-600 py-2 text-center"
              >
                Back
              </button>
            </div>
            <div className="w-4/6">
              <button
                id="submit"
                type="submit"
                onClick={handleCompleteRegistration}
                className={`w-full rounded-3xl bg-spruce-4 py-2 text-center text-white ${!isSigned ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                disabled={!isSigned}
              >
                Complete Registration
              </button>
            </div>
          </div>
          {/* <div className="mt-4 flex justify-between">
            <button
              onClick={prevStep}
              className="rounded bg-gray-500 px-4 py-2 text-white"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className={`rounded px-4 py-2 ${
                isSigned
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
              disabled={!isSigned}
            >
              Sign Consent
            </button>
          </div> */}

        </div>
      )}
      {step === 3 && (
        <div>
          <div className="px-6 pt-6 ">
            <h1 className="mb-4 text-lg font-normal">Sign Consent</h1>
            <div className="text-black text-sm">
              <div>
                <span className="text-black text-sm font-normal">
                  By signing below, you also acknowledge you have been provided
                  with a copy of the {" "}
                </span>
                <span className="text-sm font-bold text-[#04a7e0] ">
                  Notice of Privacy Practices
                </span>
                <span className="text-black text-sm font-normal ">
                  , you promise that all information you have given is correct
                  and that you
                  <br />
                  are the patient or otherwise legally authorized to execute and
                  accept this document on the patient's behalf, and assume
                  financial responsibility for the patient by signing this form.
                </span>
              </div>
            </div>
            <div className="relative mt-4 items-center">
              <select
                id="insuranceSubscriber"
                // name={`insuranceSubscriber${section}`}
                // value={values[`insuranceSubscriber${section}`]}
                // onChange={handleChange}
                className={`w-full rounded-lg border border-poise-2 px-4 py-2 pt-6 ]
                ? 'border---red-500'
                : 'border-poise-2'
                }  `}
              >
                <option value="">
                  Select an option
                </option>
                <option value="Spouse">Spouse</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Guardian">Guardian</option>
                <option value="Guardian">Relative</option>
              </select>

              <label
                htmlFor="insuranceSubscriber"
                className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
              >
                Relationship to the Patient
              </label>
              {/* First Name */}
              <div className="relative mt-4 items-center">
                <input
                  // id={`insuranceFirstName${section}`}
                  placeholder="John"
                  // name={`insuranceFirstName${section}`}
                  // value={values[`insuranceFirstName${section}`] || ''}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`border ]
                  ? 'border-red-500'
                  : 'border-poise-2'
                  }  w-full rounded-lg px-4 py-2 pt-6 `}
                />

                <label
                  htmlFor="firstName"
                  className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
                >
                  Patient&apos;s Legal First Name{' '}
                  <span className={`text-xs font-normal text-zest-6 `}>*</span>
                </label>
                <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                  {/* {errors[`insuranceFirstName${section}`] as string} */}
                </span>
              </div>
              {/* Last Name */}
              <div
                className={` ? 'text-status-red-text' : 'text-black-4 '} relative mt-4 items-center`}
              >
                <input
                  // id={`insuranceLastName${section}`}
                  placeholder="Doe"
                  // onChange={handleChange}
                  // name={`insuranceLastName${section}`}
                  // onBlur={handleBlur}
                  // value={values[`insuranceLastName${section}`] || ''}
                  className={`
                  ? 'border-red-500'
                  : 'border-poise-2'
                  }  w-full rounded-lg border px-4 py-2 pt-6`}
                />

                <label
                  htmlFor="lastName"
                  className="absolute left-0 top-0 ml-4 mt-2 text-xs text-black-4"
                >
                  Patient&apos;s Legal Last Name
                </label>
                <span className={`pl-2 text-xs font-normal  text-zest-6 `}>
                  {/* {errors[`insuranceLastName${section}`] as string} */}
                </span>
              </div>
            </div>
            <div
              className="rounded-lg border border-[#DBDDDE] mt-4 "
              onMouseDown={handleSignatureChange}
              onTouchStart={handleSignatureChange}
              onClick={handleSignatureChange}

            >
              {!isSigned && (
                <div className="absolute text-xs text-black-4 ml-4 mt-2">
                  Please sign here
                </div>
              )}
              <SignaturePadComponent
                onSignatureEmptyChange={handleSignatureEmptyChange} // callback from child that canvas is empty
                submitClicked={submitClicked}
                isSigned={isSigned} // updates the status of the canvas
                clearClicked={clearClicked}
                onDataURLChange={handleDataURLChange}
              />
            </div>
            {isSigned && (
              <div className="flex justify-end">
                <button id="clear" onClick={clearSignaturePad} className="text-xs text-black-4">
                  Clear Signature
                </button>
              </div>
            )}
            {/* {uploadedImageUrl && (
              <div>
                <div className="mt-4 flex ">
                  <h2 className="text-lg font-bold ">Uploaded Signature - for DEV viewing</h2>
                </div>
                <div className='flex justify-center'>
                  <img src={uploadedImageUrl} alt="Uploaded Signature" style={{ maxWidth: '50%' }} />
                </div>
              </div>
            )} */}


          </div>

          <div className="flex items-end gap-4 p-4">
            <div className="w-2/6">
              <button
                id="back"
                onClick={prevStep}
                className="text-black h-10 w-full rounded-3xl border-2 border-slate-600 py-2 text-center"
              >
                Back
              </button>
            </div>
            <div className="w-4/6">
              <button
                id="submit"
                type="submit"
                onClick={handleCompleteRegistration}
                className={`w-full rounded-3xl bg-spruce-4 py-2 text-center text-white ${!isSigned ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                disabled={!isSigned}
              >
                Complete Registration
              </button>
            </div>
          </div>


        </div>
      )}
    </div>
  );
}
