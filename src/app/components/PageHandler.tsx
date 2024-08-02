/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */

"use client";

import Navbar from "./Navbar";
import ProgressBar from "./ProgressBar";
// import Facility from "./Facility";
import Insurance from "./Insurance";
import PatientDetail from "./PatientDetail";
import { useFormState } from "./FormContext";
import Identification from "./Indentification";
import Demographics from "./Demographics";
import Physician from "./Physicians";
import GlobalDropdowns from "../interface/GlobalDropdown";
import IdleModal from "./IdleModal";
import Guarantor from "./Guarantor";
import Consent from "./Consent";
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
  ];

  return (
    <>
      <Navbar region={region} />
      <ProgressBar total={totalFlow} value={step} />
      {/* <Facility
        region={region}
        center={center}
        visitDate={patient.visitTime}
        isVirtual={
          patient.reasonForVisit.toString().includes("VV") ? true : false
        }
      /> */}
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