import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
  } from "react";
  import Patient from "../models/Patient";
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
    patientData: new Patient(),
    onHandleBack: () => {},
    onHandleNext: () => {},
    setPatientData: () => {},
    step: 0,
    steppedBack: false,
  });
  
  interface IProps {
    children: ReactNode;
  }
  
  // export function FormProvider({ children }: IProps) {

  //   // const [patientData, setPatientData] = useState({
  //   //   // Static patient data
  //   //   hasPhysician: 1,
  //   //   physicianName: "Dr. Smith",


  //   //   insuranceCarrier: '',
  //   //   subscriberId: '',
  //   //   hasInsurance: '',
  //   //   insuranceFirstName: '',
  //   //   insuranceLastName: '',
  //   //   insuranceDob: '',
  //   //   insurancePhone: '',
  //   //   insuranceCountry: '',
  //   //   insuranceAddress: '',
  //   //   insuranceAddress2: '',
  //   //   insuranceCity: '',
  //   //   insuranceState: '',
  //   //   insuranceZip: '',
  //   //   isValidInsurance: '',
  //   //   insuranceSubscriber: '',
  //   //   subscriberDob: '',
      
  //   //   insuranceCarrier2: '',
  //   //   subscriberId2: '',
  //   //   hasInsurance2: '',
  //   //   insuranceFirstName2: '',
  //   //   insuranceLastName2: '',
  //   //   insuranceDob2: '',
  //   //   insurancePhone2: '',
  //   //   insuranceCountry2: '',
  //   //   insuranceAddress2_2: '',
  //   //   insuranceCity2: '',
  //   //   insuranceState2: '',
  //   //   insuranceZip2: '',
  //   //   subscriberDob2: '',
  //   //   isValidInsurance2: '',
  //   //   insuranceSubscriber2: '',
  //   // });
  //   const [patientId, setPatientId] = useState("staticPatientId");
  //   const [step, setStep] = useState(1);
  //   const [steppedBack, setSteppedBack] = useState(false);
  //   const [patientData, setPatientData] = useState(new Patient());

  //   function onHandleNext() {
  //     setStep((prev) => prev + 1);
  //   }
  
  //   function onHandleBack() {
  //     setStep((prev) => prev - 1);
  //     console.log(patientData);
  //   }
  
  //   return (
  //     <FormContext.Provider
  //       // eslint-disable-next-line react/jsx-no-constructed-context-values
  //       value={{
  //         patientId,
  //         patientData,
  //         setPatientData,
  //         onHandleBack,
  //         onHandleNext,
  //         step,
  //         steppedBack,
  //       }}
  //     >
  //       {children}
  //     </FormContext.Provider>
  //   );
  // }
  
  export  function FormProvider({ children }: IProps) {
    const [patientData, setPatientData] = useState(new Patient());
    var [patientId, setPatientId] = useState(0);
    const [step, setStep] = useState(1);
    const [steppedBack, setSteppedBack] = useState(false);
  
    function onHandleNext() {
      setStep((prev) => prev + 1);
      //if (!steppedBack) setSteppedBack(false);
    }
  
    function onHandleBack() {
      setStep((prev) => prev - 1);
      //setSteppedBack(true);
      console.log(patientData);
    }
  
    return (
      <FormContext.Provider
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
  