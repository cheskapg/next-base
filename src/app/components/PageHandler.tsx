"use client";

import Navbar from "./Navbar";
import ProgressBar from "./ProgressBar";
import Facility from "./Facility";
import Insurance from "./Insurance";
import PatientDetail from "./PatientDetail";
import { useFormState } from "./FormContext";
import Identification from "./Indentification";
import Demographics from "./Demographics";
import Physician from "./Physicians";
import GlobalDropdowns from "../interface/GlobalDropdowns";
import IdleModal from "./IdleModal";
import Guarantor from "./Guarantor";
import Consent from "./Consent";
import ClinicalQuestions from "../models/ClinicalQuestions";
import WorkersCompQuestions from "./QuestionsForms/WorkersCompQuestions";
import Confirmation from "./Confirmation";
import BehavioralQuestions from "./QuestionsForms/BehavioralQuestions";
import ClinicalQuestionsPage from "./QuestionsForms/ClinicalQuestions";

export default function PageHandler({
  patientNumber,
  patient,
  region,
  globalDropdowns,
  center,
  totalFlow,
}: {
  patientNumber: number;
  patient: any;
  region: any;
  globalDropdowns: GlobalDropdowns;
  center: any;
  totalFlow: number;
}) {
  const { step } = useFormState();
  const steps = [
  //   <Consent
  //   key={"Consent"}
  //   region={region}
  //   globalDropdowns={globalDropdowns}
  // />,
  // <Confirmation key={"Confirmation"}/>,
    <PatientDetail
      key={"PatientDetail"}
      patient={patient}
      patientId={patientNumber}
    />,

    <Insurance key={"Insurance"} />,
    <Guarantor
      key={"Guarantor"}
      region={region}
      globalDropdowns={globalDropdowns}
    />,
    <BehavioralQuestions key={"BehavioralQuestions"} />,
    <ClinicalQuestionsPage key={"ClinicalQuestionsPage"} />,
    <WorkersCompQuestions key={"WorkersCompQuestions"} />,
  
    <Identification key={"Identification"} />,
    <Demographics
      key={"Demographics"}
      region={region}
      globalDropdowns={globalDropdowns}
    />,
    <Physician key={"Physician"} />,
    <Consent
      key={"Consent"}
      region={region}
      globalDropdowns={globalDropdowns}
    />,
    <Confirmation key={"Confirmation"}/>
  ];
  const isVirtual = patient.reasonForVisit
    ? patient.reasonForVisit.toString().includes("VV")
    : false;

  return (
    <>
      <Navbar region={region} />
      <ProgressBar total={totalFlow} value={step} />
      <Facility
        region={region}
        center={center}
        visitDate={patient.visitTime}
        isVirtual={isVirtual}
      />
      <IdleModal></IdleModal>
      {/* {console.log("Step: " + step)} */}

      {steps[step - 1]}
      <style global jsx>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          z-index: 20;
        }
      `}</style>
    </>
  );
}
