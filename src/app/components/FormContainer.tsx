/* eslint-disable react/jsx-key */
"use client";
import { FormProvider } from "./FormContext";
import PageHandler from "./PageHandler";
import Patient from "../models/Patient";
import { useFormState } from "./FormContext";
import { mapFromPatient } from "../utils/mapper";
import RegionSpecificDetails from "../interface/RegionSpecificDetails";
import GlobalDropdowns from "../interface/GlobalDropdowns";

export default function FormContainer({
  patientNumber,
  patient,
  region,
  globalDropdowns,
  center,
}: {
  patientNumber: number;
  patient: Patient;
  region: RegionSpecificDetails;
  globalDropdowns: GlobalDropdowns;
  center: any;
}) {
  //console.log("Form final:" + JSON.stringify(patientData));
  return (
    <FormProvider>
      <PageHandler
        patientNumber={patientNumber}
        patient={patient}
        region={region}
        globalDropdowns={globalDropdowns}
        center={center}
      ></PageHandler>
    </FormProvider>
  );
}