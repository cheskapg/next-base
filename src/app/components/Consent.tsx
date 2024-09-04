import { useState } from "react";
import GlobalDropdowns from "../interface/GlobalDropdowns";
import RegionSpecificDetails from "../interface/RegionSpecificDetails";
import SignaturePad from "react-signature-pad-wrapper";
import SignaturePadComponent from "./SignaturePadComponent";

export default function Consent({
  region,
  globalDropdowns,
}: {
  region: RegionSpecificDetails;
  globalDropdowns: GlobalDropdowns;
}) {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isSignatureEmpty, setIsSignatureEmpty] = useState<boolean>(true);

  // Callback function to update isSignatureEmpty in the parent
  const handleSignatureEmptyChange = (isEmpty: boolean) => {
    setIsSignatureEmpty(isEmpty);
  };
  const handleDivClick = () => {
    setIsClicked(true);
    // Optionally reset isClicked state after checking
    setTimeout(() => setIsClicked(false), 0); // Reset state immediately for next click
  };
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">Consent</h1>
        <p className="text-gray-600">Consent - Self {step}</p>
      </div>
      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Conditions of Registration</h2>
          <p className="text-gray-700 mb-4">
            We ask all patients to review and agree to our Conditions of
            Registration before being seen.
          </p>
          <button
            onClick={nextStep}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            Read all the conditions to agree
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-lg mb-2">Sign Consent</h2>
          <p className="text-gray-700 mb-4">
            By signing below, you also acknowledge you have been
            provided with a copy of the Notice of Privacy Practices,
            you promise that all information you have given is correct and that you
            are the patient or otherwise legally authorized to execute and accept this document on the patient's behalf, and assume financial responsibility for the patient by signing this form.          </p>
          {/* Add more content here as needed */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agree">
              I agree to the Conditions of Registration
            </label>
          </div>
          <div className="border border-[#DBDDDE] rounded-lg"
            onClick={handleDivClick}>
            {/* <SignaturePad canvasProps={{}} redrawOnResize={true}  /> */}
            <SignaturePadComponent onSignatureEmptyChange={handleSignatureEmptyChange} // Pass the callback
              isClicked={isClicked} setIsClicked={setIsClicked} />

          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className={`py-2 px-4 rounded ${agreed ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
                }`}
              disabled={!agreed}
            >
              Sign Consent
            </button>
          </div>
        </div>
      )}
      {/* // with guarantor  */}
      {step === 3 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Sign Consent</h2>
          <p className="text-gray-700 mb-4">
            By signing below, you also acknowledge you have been provided a
            copy...
          </p>
          <textarea
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Please sign here"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Back
            </button>
            <button
              onClick={() => alert("Registration Completed")}
              className={`py-2 px-4 rounded ${signature
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-600"
                }`}
              disabled={!signature}
            >
              Complete Registration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
