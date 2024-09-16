import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Insurance from "../models/Insurance";
import Guarantor from "../models/Guarantor";
import Patient from "../models/Patient";
import { calculateAge } from "../utils/helper";
import { fetchGuarantorRegistrationById } from "../actions/api";
import ServiceQuestions from "../models/ServiceQuestions";
import ClinicalQuestions from "../models/ClinicalQuestions";
import ClinicalAnswers from "../models/ClinicalAnswers";
import ServiceAnswers from "../models/ServiceAnswers";

interface ServiceQuestion {
  conditional_id: number | null;
  conditional_value: string | null;
  conditions: string | null;
  custom_features: string | null;
  excluded_visit_reason: string | null;
  form_display: boolean;
  high_risk_answer: string | null;
  high_risk_conditions: string | null;
  id: number;
  input_type: "text" | "date" | "dropdown" | "checkbox" | "radio"; // Extend this union type based on other possible values
  is_required: boolean;
  minimum_age: number | null;
  options: string | null;
  question: string;
  region_id: number;
  section: string;
  service_line_id: number;
  service_line_name: string;
  subtext: string | null;
  visit_reason: string | null;
}

interface IFormContext {
  patientData: any;
  setPatientData: Dispatch<SetStateAction<any>>;
  onHandleBack: () => void;
  onHandleNext: () => void;
  insuranceData: any;
  setInsuranceData: Dispatch<SetStateAction<any>>;
  step: number;
  steppedBack: boolean;
  guarantorData: any;
  serviceQuestionsData: any;
  setInsuranceStep: Dispatch<SetStateAction<any>>;
  insuranceStep: any;
  setValidationStatus1: Dispatch<SetStateAction<any>>;
  validationStatus1: any;
  setValidateResult1: Dispatch<SetStateAction<any>>;
  validateResult1: any;
  setValidationStatus2: Dispatch<SetStateAction<any>>;
  validationStatus2: any;
  setValidateResult2: Dispatch<SetStateAction<any>>;
  validateResult2: any;
  clinicalQuestionsData: any[]; // Specify the type of the array elements
  clinicalAnswersData: any; // Added this line
  setClinicalAnswersData: Dispatch<SetStateAction<any>>; // Added this line
  subscriberData: any; // Added this line
  setSubscriberData: Dispatch<SetStateAction<any>>; // Added this line
  rteData1: any; // Added this line
  setRteData1: Dispatch<SetStateAction<any>>; // Added this line
  rteData2: any; // Added this line
  setRteData2: Dispatch<SetStateAction<any>>; // Added this line
  additionalSubscriberData: any; // Added this line
  setAdditionalSubscriberData: Dispatch<SetStateAction<any>>; // Added this line
  // setServiceLineId: Dispatch<SetStateAction<any>>;
  setServiceQuestionsData: Dispatch<SetStateAction<any>>;
  setServiceAnswersData: Dispatch<SetStateAction<any>>;
  serviceAnswersData: any; // Added this line
  setClinicalQuestionsData: Dispatch<SetStateAction<any>>;
  setGuarantorData: Dispatch<SetStateAction<any>>;
  setSteppedBack: Dispatch<SetStateAction<any>>;
  envVariables: {
    behavioralKey: string;
    therapistKey: string;
    workersCompKey: string;
    mercyApplicableRegions: string;
  };
  setEnvVariables: Dispatch<SetStateAction<any>>;

}

const FormContext = createContext<IFormContext>({
  patientData: new Patient(),
  insuranceData: new Insurance(),
  setInsuranceStep: () => {},
  insuranceStep: 0,
  setInsuranceData: () => {},
  serviceQuestionsData: new ServiceQuestions(),
  setServiceQuestionsData: () => {},
  setServiceAnswersData: () => {},
  serviceAnswersData: [],
  setClinicalQuestionsData: () => {},
  clinicalQuestionsData: [],
  setValidationStatus1: () => {},
  validationStatus1: "",
  setValidateResult1: () => {},
  validateResult1: false,
  setValidationStatus2: () => {},
  validationStatus2: "",
  setValidateResult2: () => {},
  validateResult2: false,
  clinicalAnswersData: new ClinicalAnswers(), // Initialized with an empty array
  setClinicalAnswersData: () => {}, // No-op function for default context
  subscriberData: new ClinicalAnswers(), // Initialized with an empty array
  setSubscriberData: () => {}, // No-op function for default context
  rteData1: [], // Initialized with an empty array
  setRteData1: () => {}, // No-op function for default context
  rteData2: [], // Initialized with an empty array
  setRteData2: () => {}, // No-op function for default context
  additionalSubscriberData: new ClinicalAnswers(), // Initialized with an empty array
  setAdditionalSubscriberData: () => {}, // No-op function for default context
  // serviceLineId: "",
  // setServiceLineId: () => { },
  onHandleBack: () => {},
  onHandleNext: () => {},
  setPatientData: () => {},
  step: 0,
  steppedBack: false,
  guarantorData: new Guarantor(),
  setGuarantorData: () => {},
  setSteppedBack: () => {},
  setEnvVariables: () => {},
  envVariables: {
    behavioralKey: '',
    therapistKey: '',
    workersCompKey: '',
    mercyApplicableRegions: '',
  },
});

interface IProps {
  children: ReactNode;
}

export function FormProvider({ children }: IProps) {
  const [patientData, setPatientData] = useState(new Patient());
  const [insuranceData, setInsuranceData] = useState<Insurance[]>([]);
  const [step, setStep] = useState(1);
  const [serviceQuestionsData, setServiceQuestionsData] = useState<
    ServiceQuestion[]
  >([]);
  const [serviceAnswersData, setServiceAnswersData] = useState<
    ServiceAnswers[]
  >([]);
  const [additionalSubscriberData, setAdditionalSubscriberData] = useState([]);
  const [validateResult1, setValidateResult1] = useState<boolean>();
  const [insuranceStep, setInsuranceStep] = useState<number>(1);
  const [validateResult2, setValidateResult2] = useState<boolean>();
  const [validationStatus1, setValidationStatus1] = useState<string>();
  const [validationStatus2, setValidationStatus2] = useState<string>();
  const [subscriberData, setSubscriberData] = useState([]);

  const [clinicalQuestionsData, setClinicalQuestionsData] = useState([]);
  const [rteData1, setRteData1] = useState<any>();
  const [rteData2, setRteData2] = useState<any>();

  const [steppedBack, setSteppedBack] = useState(false);
  const [guarantorData, setGuarantorData] = useState(new Guarantor());
  const regionId = patientData.regionId;
  const [envVariables, setEnvVariables] = useState({
    behavioralKey: '',
    therapistKey: '',
    workersCompKey: '',
    mercyApplicableRegions: '',
  });
  const [clinicalAnswersData, setClinicalAnswersData] = useState<
    ClinicalAnswers[]
  >([]);

  // Usage in your onHandleNext function
  function onHandleNext() {
    const age = calculateAge(patientData.dateOfBirth);

    const behavioralQuestions = Object.values(serviceQuestionsData).filter(
      (question) => question.service_line_id === 3
    );
    const workersCompQuestions = Object.values(serviceQuestionsData).filter(
      (question) => question.service_line_id === 2
    ); // Assuming 4 is the id for workers comp questions
    console.log(behavioralQuestions, "behavioral form");
    const isClinicalQuestionsDataEmpty =
      Object.keys(clinicalQuestionsData).length === 0;
    const isBehavioralQuestionsDataEmpty = behavioralQuestions.length === 0;
    const isWorkersCompQuestionsDataEmpty = workersCompQuestions.length === 0;

    console.log(`Age: ${age}`);
    console.log(`Current Step: ${step}`);
    console.log(
      `Is Clinical Questions Data Empty: ${isClinicalQuestionsDataEmpty}`
    );
    console.log(
      `Is Behavioral Questions Data Empty: ${isBehavioralQuestionsDataEmpty}`
    );
    console.log(
      `Is Workers Comp Questions Data Empty: ${isWorkersCompQuestionsDataEmpty}`
    );

    if (step === 2) {
      console.log("Step is 2 (Insurance)");
      if (age >= 18) {
        console.log("Patient is 18 or older");
        if (!isBehavioralQuestionsDataEmpty) {
          console.log("Navigating to Behavioral Questions Page (Step 4)");
          setStep(4); // Go to Behavioral Questions Page (Step 4)
        } else if (!isClinicalQuestionsDataEmpty) {
          console.log("Navigating to Clinical Questions Page (Step 5)");
          setStep(5); // Go to Clinical Questions Page (Step 5)
        } else if (!isWorkersCompQuestionsDataEmpty) {
          console.log("Navigating to Workers Comp Questions Page (Step 6)");
          setStep(6); // Go to Workers Comp Questions Page (Step 6)
        } else {
          console.log("Navigating to Identification (Step 7)");
          setStep(7); // Move to Identification (Step 7) if none are available
        }
      } else {
        console.log("Patient is under 18");
        console.log("Navigating to Guarantor (Step 3)");
        setStep(3); // Go to Guarantor (Step 3)
      }
    } else if (step === 3) {
      console.log("Step is 3 (Guarantor)");
      if (!isBehavioralQuestionsDataEmpty) {
        console.log("Navigating to Behavioral Questions Page (Step 4)");
        setStep(4); // Go to Behavioral Questions Page (Step 4)
      } else if (!isClinicalQuestionsDataEmpty) {
        console.log("Navigating to Clinical Questions Page (Step 5)");
        setStep(5); // Go to Clinical Questions Page (Step 5)
      } else if (!isWorkersCompQuestionsDataEmpty) {
        console.log("Navigating to Workers Comp Questions Page (Step 6)");
        setStep(6); // Go to Workers Comp Questions Page (Step 6)
      } else {
        console.log("Navigating to Identification (Step 7)");
        setStep(7); // Move to Identification (Step 7) if none are available
      }
    } else if (step === 4) {
      console.log("Step is 4 (Behavioral Questions Page)");
      if (!isClinicalQuestionsDataEmpty) {
        console.log("Navigating to Clinical Questions Page (Step 5)");
        setStep(5); // Go to Clinical Questions Page (Step 5)
      } else if (!isWorkersCompQuestionsDataEmpty) {
        console.log("Navigating to Workers Comp Questions Page (Step 6)");
        setStep(6); // Go to Workers Comp Questions Page (Step 6)
      } else {
        console.log("Navigating to Identification (Step 7)");
        setStep(7); // Move to Identification (Step 7) if none are available
      }
    } else if (step === 5) {
      console.log("Step is 5 (Clinical Questions Page)");
      if (!isWorkersCompQuestionsDataEmpty) {
        console.log("Navigating to Workers Comp Questions Page (Step 6)");
        setStep(6); // Go to Workers Comp Questions Page (Step 6)
      } else {
        console.log("Navigating to Identification (Step 7)");
        setStep(7); // Move to Identification (Step 7) if Workers Comp is not available
      }
    } else if (step === 6) {
      console.log("Navigating to Identification (Step 7)");
      setStep(7); // Move to Identification (Step 7) if Workers Comp is not available
    } else {
      console.log("Default behavior: Moving to next step");
      setStep((prev) => prev + 1); // Move to the next step
    }
  }

  const onHandleBack = () => {
    const age = calculateAge(patientData.dateOfBirth);
    const behavioralQuestions = Object.values(serviceQuestionsData).filter(
      (question) => question.service_line_id === 3
    );
    const workersCompQuestions = Object.values(serviceQuestionsData).filter(
      (question) => question.service_line_id === 2
    );

    console.log(behavioralQuestions, "behavioral form");
    console.log(workersCompQuestions, "workers comp form");

    const isClinicalQuestionsDataEmpty =
      Object.keys(clinicalQuestionsData).length === 0;
    const isBehavioralQuestionsDataEmpty = behavioralQuestions.length === 0;
    const isWorkersCompQuestionsDataEmpty = workersCompQuestions.length === 0;

    console.log(`Age: ${age}`);
    console.log(`Current Step: ${step}`);
    console.log(
      `Is Clinical Questions Data Empty: ${isClinicalQuestionsDataEmpty}`
    );
    console.log(
      `Is Behavioral Questions Data Empty: ${isBehavioralQuestionsDataEmpty}`
    );
    console.log(
      `Is Workers Comp Questions Data Empty: ${isWorkersCompQuestionsDataEmpty}`
    );
    if (step === 7) {
      console.log("Step is 7 ( Identification Page)");
      if (!isWorkersCompQuestionsDataEmpty) {
        console.log("Navigating back to Workers Comp Questions Page (Step 6)");
        setStep(6); // Go to Workers Comp Questions Page (Step 6)
      } else if (!isClinicalQuestionsDataEmpty) {
        console.log("Navigating back to Clinical Questions Page (Step 5)");
        setStep(5); // Go to Clinical Questions Page (Step 5)
      } else if (!isBehavioralQuestionsDataEmpty) {
        console.log("Navigating back to Behavioral Questions Page (Step 4)");
        setStep(4); // Go to Behavioral Questions Page (Step 4)
      } else {
        if (age >= 18) {
          console.log("Navigating back to Insurance (Step 2)");
          setStep(2); // Go back to Insurance if the patient is older than 18
        } else {
          console.log("Navigating back to Guarantor (Step 3)");
          setStep(3); // Go back to Guarantor if the patient is younger than 18
        }
      }
    } else if (step === 6) {
      console.log("Step is 6 (Workers Comp Questions Page)");
      if (!isClinicalQuestionsDataEmpty) {
        console.log("Navigating back to Clinical Questions Page (Step 5)");
        setStep(5); // Go to Clinical Questions Page (Step 5)
      } else if (!isBehavioralQuestionsDataEmpty) {
        console.log("Navigating back to Behavioral Questions Page (Step 4)");
        setStep(4); // Go to Behavioral Questions Page (Step 4)
      } else {
        if (age >= 18) {
          console.log("Navigating back to Insurance (Step 2)");
          setStep(2); // Go back to Insurance if the patient is older than 18
        } else {
          console.log("Navigating back to Guarantor (Step 3)");
          setStep(3); // Go back to Guarantor if the patient is younger than 18
        }
      }
    } else if (step === 5) {
      console.log("Step is 5 (Clinical Questions Page)");
      if (!isBehavioralQuestionsDataEmpty) {
        console.log("Navigating back to Behavioral Questions Page (Step 4)");
        setStep(4); // Go to Behavioral Questions Page (Step 4)
      } else {
        if (age >= 18) {
          console.log("Navigating back to Insurance (Step 2)");
          setStep(2); // Go back to Insurance if the patient is older than 18
        } else {
          console.log("Navigating back to Guarantor (Step 3)");
          setStep(3); // Go back to Guarantor if the patient is younger than 18
        }
      }
    } else if (step === 4) {
      console.log("Step is 4 (Behavioral Questions Page)");
      if (age >= 18) {
        console.log("Navigating back to Insurance (Step 2)");
        setStep(2); // Go back to Insurance if the patient is older than 18
      } else {
        console.log("Navigating back to Guarantor (Step 3)");
        setStep(3); // Go back to Guarantor if the patient is younger than 18
      }
    } else {
      console.log("Default behavior: Moving to previous step");
      setStep((prev) => prev - 1); // Move to the previous step
    }

    console.log("Stepped back detected");
    setSteppedBack(true);
  };

  return (
    <FormContext.Provider
      value={{
        patientData,
        setPatientData,
        insuranceStep,
        setInsuranceStep,
        insuranceData,
        setInsuranceData,
        onHandleBack,
        setValidationStatus1,
        validationStatus1,
        setValidateResult1,
        validateResult1,
        setValidationStatus2,
        validationStatus2,
        validateResult2,
        setValidateResult2,
        onHandleNext,
        serviceQuestionsData,
        subscriberData,
        additionalSubscriberData,
        setSubscriberData,
        rteData1,
        setRteData1,
        rteData2,
        setRteData2,
        setAdditionalSubscriberData,
        setServiceQuestionsData,
        serviceAnswersData,
        setServiceAnswersData,
        clinicalQuestionsData,
        setClinicalQuestionsData,
        clinicalAnswersData, // Added this line
        setClinicalAnswersData, // Added this line
        step,
        steppedBack,
        guarantorData,
        setGuarantorData,
        setSteppedBack,
        envVariables,
        setEnvVariables
        // serviceLineId,
        // setServiceLineId,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}
