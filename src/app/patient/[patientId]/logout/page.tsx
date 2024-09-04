"use server";

import {
  fetchCenterInfo,
  fetchMaritalStatusList,
  fetchPatientRegistrationById,
  fetchRegionSpecificDetails,
  fetchSuffixList,
} from "../../actions/api";
// import GlobalDropdowns from "../"
// import { logout } from "@/app/utils/lib";
import Logout from "./section/Logout";
import UnauthorizedContainer from "./section/Logout";
import GlobalDropdowns from "@/interface/GlobalDropdown";

export default async function Home({
  params,
  searchParams,
}: {
  params: { patientId: number };
  searchParams: { hash: string };
}) {
  const patientData = await fetchPatientRegistrationById(params.patientId);
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
      <Logout region={region}></Logout>
    </main>
  );
}
