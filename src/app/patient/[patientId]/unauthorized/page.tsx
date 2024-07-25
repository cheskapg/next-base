"use server";

import {
  fetchCenterInfo,
  fetchMaritalStatusList,
  fetchPatientRegistrationById,
  fetchRegionSpecificDetails,
  fetchSuffixList,
} from "@/app/actions/api";
import GlobalDropdowns from "@/app/interface/GlobalDropdowns";
import UnauthorizedContainer from "./section/UnauthorizedContainer";

export default async function Home({
  params,
  searchParams,
}: {
  params: { patientId: number };
  searchParams: { hash: string };
}) {
  //console.log("PatientId:" + params.patientId);
  // console.log("Hash:" + searchParams.hash);

  const patientData = await fetchPatientRegistrationById(params.patientId);
  //console.log("PatientData:" + JSON.stringify(patientData));
  const region = await fetchRegionSpecificDetails(patientData.regionId);
  const center = await fetchCenterInfo(patientData.hospitalId);

  let sufixes = [] as string[];
  let maritalStatuses = [] as string[];
  let globalDropdowns: GlobalDropdowns = {
    maritalStatuses,
    sufixes,
  };
  globalDropdowns.maritalStatuses = await fetchMaritalStatusList();
  globalDropdowns.sufixes = await fetchSuffixList();

  //console.log("PatientData:" + JSON.stringify(patientData));
  //console.log("RegionData:" + JSON.stringify(region));
  return (
    <main className="h-screen">
      <UnauthorizedContainer region={region}></UnauthorizedContainer>
    </main>
  );
}
