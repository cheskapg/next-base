import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
  } from "react";
  
  interface IFormContext {
    patientId: any;
    patientData: any;
    setPatientData: Dispatch<SetStateAction<any>>;
    onHandleBack: () => void;
    onHandleNext: () => void;
    step: number;
    steppedBack: boolean;
  }
  
  const FormContext = createContext<IFormContext>({
    patientId: "staticPatientId",
    patientData: { /* static patient data */ },
    onHandleBack: () => {},
    onHandleNext: () => {},
    setPatientData: () => {},
    step: 0,
    steppedBack: false,
  });
  
  interface IProps {
    children: ReactNode;
  }
  
  export function FormProvider({ children }: IProps) {
    const [patientData, setPatientData] = useState({
      // Static patient data
      hasPhysician: 1,
      physicianName: "Dr. Smith",
    });
    const [patientId, setPatientId] = useState("staticPatientId");
    const [step, setStep] = useState(1);
    const [steppedBack, setSteppedBack] = useState(false);
  
    function onHandleNext() {
      setStep((prev) => prev + 1);
    }
  
    function onHandleBack() {
      setStep((prev) => prev - 1);
      console.log(patientData);
    }
  
    return (
      <FormContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          patientId,
          patientData,
          setPatientData,
          onHandleBack,
          onHandleNext,
          step,
          steppedBack,
        }}
      >
        {children}
      </FormContext.Provider>
    );
  }
  
  export function useFormState() {
    return useContext(FormContext);
  }
  