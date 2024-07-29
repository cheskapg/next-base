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

export default function PageHandler({
  patientNumber,
  patient,
  region,
  globalDropdowns,
  center,
}: {
  patientNumber: number;
  patient: any;
  region: any;
  globalDropdowns: GlobalDropdowns;
  center: any;
}) {
  const { step } = useFormState();
  const steps = [
    // <PatientDetail patient={patient} patientId={patientNumber} />,
    <Insurance />,
    <Identification />,
    <Demographics region={region} globalDropdowns={globalDropdowns} />,
    <Physician />,
  ];

  return (
    <>
      <Navbar region={region} />
      <ProgressBar value={step} />
      {/* <Facility
        region={region}
        center={center}
        visitDate={patient.visitTime}
        isVirtual={
          !!patient.reasonForVisit.toString().includes("VV")
        }
      /> */}
      <IdleModal></IdleModal>
      {/* {console.log("Step: " + step)} */}
      {steps[step - 1]}

      <style global jsx>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
        }
      `}</style>
    </>
  );
}
