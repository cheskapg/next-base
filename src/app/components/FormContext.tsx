import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
    useEffect,
  } from "react";
  import Patient from "../models/Patient";
  import Insurance from "../models/Insurance";
  import Guarantor from "@/models/Guarantor";

  import { calculateAge } from "../utils/helper";
import { updatePatientDetails } from "@/actions/api";

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
    setGuarantorData: Dispatch<SetStateAction<any>>;
    setSteppedBack: Dispatch<SetStateAction<any>>;
  }
  
  const FormContext = createContext<IFormContext>({
    patientData: new Patient(),
    insuranceData: new Insurance(),
    setInsuranceData: () => {},
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
    const [steppedBack, setSteppedBack] = useState(false);
    const [guarantorData, setGuarantorData] = useState(new Guarantor());
    
    // const updatePatientData = async (patient: any) => {
    //   const updatedPatientData = await updatePatientDetails(patient, step);
    //   setPatientData(updatedPatientData.data); // Update the patientData state with the new values
    // };
    function onHandleNext() {
      const age = calculateAge(patientData.dateOfBirth);
      if (age >= 18 && step == 2) {
        setStep((prev) => prev + 2);
      } else setStep((prev) => prev + 1);
      //if (!steppedBack) setSteppedBack(false);
    }


    function onHandleBack() {
      const age = calculateAge(patientData.dateOfBirth);
      if (age >= 18 && step == 4) {
        setStep((prev) => prev - 2);
      } else setStep((prev) => prev - 1);
  
      //setSteppedBack(true);
      // console.log(patientData);
    }
    useEffect(() => {
      setPatientData(patientData); // Call the updatePatientData function to update the patientData state
      console.log(patientData, "form context");

    }, [patientData]);
    return (
      <FormContext.Provider
        value={{
          patientData,
          setPatientData,
          insuranceData,
          setInsuranceData,
          onHandleBack,
          onHandleNext,
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
  