"use server";

// import IPatient from "../interface/IPatient";
// import Patient from "../models/Patient";
import { mapToUpdatePatientDto, mapToPatient, mapToPcp } from "../utils/mapper";
// import { removeNullAttributes } from "../utils/helper";
import RegionSpecificDetails from "../interface/RegionSpecificDetails";
// import ApiResponse from "../interface/ApiResponse";
import Pcp from "../models/Pcp";

export const updatePatientDetails = async (patient: any, step: number): Promise<any> => {
  try {
    console.log('Calling Map Patient Details');
    let payload =  mapToUpdatePatientDto(patient);
  
    // TODO: Move to server logging
    console.log('Calling Update Patient Details');
    console.log(JSON.stringify(payload));
    console.log(patient.patientId);

    // Static response
    const response = {
      ok: true,
      json: async () => ({
        message: 'Patient details updated successfully',
        data: payload,
      }),
    };

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const jsonData: any = await response.json();

    // TODO: Move to server logging
    console.log('Update Patient Success', jsonData);

    return jsonData;
  } catch (error) {
    console.log('Call logging api here:', error);
    throw error;
  }
};

export const fetchRegionSpecificDetails = async (region_id: number): Promise<RegionSpecificDetails> => {
  // Static response
  const jsonData: any = {
    data: {
      regionName: "North Region",
      supervisors: ["Supervisor A", "Supervisor B"],
      // other static region details
    },
  };

  return jsonData.data;
};

export const fetchPatientRegistrationById = async (id: number): Promise<Patient> => {
  // Static response
  const jsonData: any = {
    data: {
      patientId: id,
      name: "John Doe",
      age: 30,
      gender: "Male",
      // other static patient details
    },
  };
  return mapToPatient(jsonData.data);
};

export const fetchPatientPcp = async (region: number, searchText: string): Promise<Pcp[]> => {
  // Static response
  const jsonData: any = {
    data: [
      { name: "Dr. Alice", specialty: "Cardiology" },
      { name: "Dr. Bob", specialty: "Dermatology" },
      // other static PCPs
    ],
  };
  return mapToPcp(jsonData.data);
};

export const fetchSuffixList = async () => {
  // Static response
  const jsonData = {
    data: ["Jr.", "Sr.", "III"],
  };
  
  return jsonData.data;
};

export const fetchCenterInfo = async (centerId: number) => {
  // Static response
  const jsonData = {
    data: [
      { centerName: "Health Center A", address: "123 Main St" },
      { centerName: "Health Center B", address: "456 Oak Ave" },
      // other static center info
    ],
  };
  
  return jsonData.data;
};

export const fetchMaritalStatusList = async () => {
  // Static response
  const jsonData = {
    data: ["Single", "Married", "Divorced", "Widowed"],
  };
  
  return jsonData.data;
};
