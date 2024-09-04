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
// import { fetchGuarantorRegistrationById } from "../actions/api";
import BehavioralQuestions from "../models/BehavioralQuestions";
import ClinicalQuestions from "../models/ClinicalQuestions";

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
  behavioralQuestionsData: any;
  clinicalQuestionsData: any;
  setBehavioralQuestionsData: Dispatch<SetStateAction<any>>;
  setClinicalQuestionsData: Dispatch<SetStateAction<any>>;
  setGuarantorData: Dispatch<SetStateAction<any>>;
  setSteppedBack: Dispatch<SetStateAction<any>>;
}

const FormContext = createContext<IFormContext>({
  patientData: new Patient(),
  insuranceData: new Insurance(),
  setInsuranceData: () => {},
  behavioralQuestionsData: new BehavioralQuestions(),
  setBehavioralQuestionsData: () => {},
  setClinicalQuestionsData: () => {},
  clinicalQuestionsData: new ClinicalQuestions(),
  onHandleBack: () => {},
  onHandleNext: () => {},
  setPatientData: () => {},
  step: 0,
  steppedBack: false,
  guarantorData: new Guarantor(),
  setGuarantorData: () => {},
  setSteppedBack: () => {},
});

interface IProps {
  children: ReactNode;
}

export function FormProvider({ children }: IProps) {
  const [patientData, setPatientData] = useState(new Patient());
  const [insuranceData, setInsuranceData] = useState(new Insurance());
  const [step, setStep] = useState(1);
  const [behavioralQuestionsData, setBehavioralQuestionsData] = useState(
    new BehavioralQuestions(),
  );
  const [clinicalQuestionsData, setClinicalQuestionsData] = useState(
    new ClinicalQuestions(),
  );
  const [steppedBack, setSteppedBack] = useState(false);
  const [guarantorData, setGuarantorData] = useState(new Guarantor());

  function onHandleNext() {
    const age = calculateAge(patientData.dateOfBirth);
    if (age >= 18 && step == 2) {
      setStep((prev) => prev + 2);
    } else setStep((prev) => prev + 1);

    if (steppedBack) setSteppedBack(true);
  }

  function onHandleBack() {
    const age = calculateAge(patientData.dateOfBirth);
    if (age >= 18 && step == 4) {
      setStep((prev) => prev - 2);
    } else {
      setStep((prev) => prev - 1);
    }

    //setSteppedBack(true);
    //console.log(patientData);
  }

  return (
    <FormContext.Provider
      value={{
        patientData,
        setPatientData,
        insuranceData,
        setInsuranceData,
        onHandleBack,
        onHandleNext,
        behavioralQuestionsData,
        setBehavioralQuestionsData,
        clinicalQuestionsData,
        setClinicalQuestionsData,
        step,
        steppedBack,
        guarantorData,
        setGuarantorData,
        setSteppedBack,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}
