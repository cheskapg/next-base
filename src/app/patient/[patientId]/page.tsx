"use server";

import FormContainer from "../../components/FormContainer";
import {
  fetchCenterInfo,
  fetchMaritalStatusList,
  fetchPatientRegistrationById,
  fetchRegionSpecificDetails,
  fetchSuffixList,
} from "../../actions/api";
import GlobalDropdowns from "../../interface/GlobalDropdown";
import ICenter from "../../interface/ICenter";
// import { string } from "../../../../node_modules/yup/index";


export default async function Home({
  params,
  searchParams,
}: {
  params: { patientId: number };
  searchParams: { hash: string };
}) {
  // console.log("PatientId:" + params.patientId);
  // console.log("Hash:" + searchParams.hash);

  const patientData = await fetchPatientRegistrationById(params.patientId);
  // console.log("PatientData:" + JSON.stringify(patientData));
  const region = await fetchRegionSpecificDetails(patientData.regionId);
  const center = await fetchCenterInfo(patientData.hospitalId);

  const sufixes = [] as string[];
  const maritalStatuses = [] as string[];
  const globalDropdowns: GlobalDropdowns = {
    maritalStatuses,
    sufixes,
  };
  globalDropdowns.maritalStatuses = await fetchMaritalStatusList();
  globalDropdowns.sufixes = await fetchSuffixList();

  // console.log("PatientData:" + JSON.stringify(patientData));
  // console.log("RegionData:" + JSON.stringify(region));
  return (
    <main className="h-screen">
      <FormContainer
        patientNumber={params.patientId}
        patient={patientData}
        region={region}
        center={center}
        globalDropdowns={globalDropdowns}
      />
    </main>
  );
}
