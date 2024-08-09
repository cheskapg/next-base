"use server";

import FormContainer from "../../components/FormContainer";
import {
  fetchCenterInfo,
  fetchMaritalStatusList,
  fetchPatientRegistrationById,
  fetchRegionSpecificDetails,
  fetchSuffixList,
} from "../../actions/api"
import GlobalDropdowns from "../../interface/GlobalDropdown";
import { getSession } from "../../utils/lib";

export default async function Home({
  params,
  searchParams,
}: {
  params: { patientId: number };
  searchParams: { hash: string };
}) {
  //console.log("PatientId:" + params.patientId);
  // console.log("Hash:" + searchParams.hash);

  //TODO: move to context / provider
  // const session = await getSession(params.patientId);
  // const patientData = await fetchPatientRegistrationById(session?.id || 0);

  const patientData = await fetchPatientRegistrationById(
    params?.patientId || 0
  );
  //console.log("PatientData:" + JSON.stringify(patientData));
  const region = await fetchRegionSpecificDetails(patientData.regionId);
  const center = await fetchCenterInfo(patientData.hospitalId);
  const total: number = parseInt(process.env.TOTAL_FLOWS as string, 10) || 6;

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
    <main className="flex flex-col h-screen">
      <FormContainer
        patientNumber={params.patientId}
        patient={patientData}
        region={region}
        center={center}
        globalDropdowns={globalDropdowns}
        totalFlow={total}
      />
    </main>
  );
}
