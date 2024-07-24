"use server";

import IPatient from "../interface/IPatient";
import Patient from "../models/Patient";
import { mapToUpdatePatientDto, mapToPatient, mapToPcp } from "../utils/mapper";
import { removeNullAttributes } from "../utils/helper";
import RegionSpecificDetails from "../interface/RegionSpecificDetails";
import ApiResponse from "../interface/ApiResponse";
import Pcp from "../models/Pcp";


export const updatePatientDetails = async (patient: any, step: number): Promise<any> => {
  try {
    console.log('Calling Map Patient Details');
    let payload =  mapToUpdatePatientDto(patient);
  
    //TODO: Move to server logging
    console.log('Calling Update Patient Details');
    console.log(JSON.stringify(payload));
    console.log(patient.patientId);
    const response = await fetch(
      `${process.env.API_BASE_URL}/reg/${patient.patientId}/patient`,
      {
        method: 'PUT',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const jsonData: any = await response.json();

    //TODO: Move to server logging
    console.log('Update Patient Success', jsonData);

    return jsonData;
  } catch (error) {
    console.log('Call logging api here:', error);
    throw error;
  }
};

export const fetchRegionSpecificDetails = async (
  region_id: number,
): Promise<RegionSpecificDetails> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/locations/regions/${region_id}/super`,
  );

  const jsonData: any =
    (await response.json()) as ApiResponse<RegionSpecificDetails>;

  return jsonData.data;
};

  export const fetchPatientRegistrationById = async (
    id: number,
  ): Promise<Patient> => {
    const response = await fetch(
      `${process.env.API_BASE_URL}/reg/${id}/patient`,
      { cache: 'no-store' },
    );
    const jsonData: any = await response.json();
    return mapToPatient(jsonData.data);
  };

  export const fetchPatientPcp = async (
    region: number,
    searchText: string,
  ): Promise<Pcp[]> => {
    const response = await fetch(
      `${process.env.API_BASE_URL}/locations/regions/${region}/pcps?name=${searchText}`,
      
    );
    const jsonData: any = await response.json();
    return mapToPcp(jsonData.data);
  };

  export const fetchSuffixList = async () => {
    const response = await fetch(`${process.env.API_BASE_URL}/fields/suffix`);
    const jsonData = (await response.json()) as ApiResponse<any[]>;
    
    return jsonData.data;
  };

  export const fetchCenterInfo = async (centerId:number) => {
    const response = await fetch(`${process.env.API_BASE_URL}/locations/centers/${centerId}`);
    const jsonData = (await response.json()) as ApiResponse<any[]>;
  
    return jsonData.data;
  };
  
  export const fetchMaritalStatusList = async () => {
    const response = await fetch(
      `${process.env.API_BASE_URL}/fields/maritalStatus`,
    );
    const jsonData = (await response.json()) as ApiResponse<any[]>;
  
    return jsonData.data;
  };