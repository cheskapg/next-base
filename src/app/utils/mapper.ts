/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import IPatient from "@/interface/IPatient";
import { UpdatePatientDto } from "../dto/UpdatePatientDto";
// import Patient from "../models/Patient";
import ICenter from "../interface/ICenter";
import IPhysician from "../interface/IPcp";
import IGuarantor from "@/interface/IGuarantor";
import Guarantor from "@/models/Guarantor";
import { UpdateGuarantorDto } from "@/dto/UpdateGuarantorDto";
import UserSession from "@/interface/UserSession";

export const mapToPatient = (data: any): IPatient => {
    const patient: any = {} as IPatient;
    // Dynamically copy properties from data to patient
    Object.keys(data).forEach((key) => {
      patient[key] = data[key];
    });
    // Handle fields that might not be present in the response
    patient.suffix = data.suffix || null;
    patient.maritalStatus = data.maritalStatus || null;
    patient.zip= data.zipCode|| null;
    return patient;
  };

  export const mapToCenter = (data: any): ICenter => {
    const center: any = {} as ICenter;
    // Dynamically copy properties from data to patient
    Object.keys(data).forEach((key) => {
      center[key] = data[key];
    });
    // Handle fields that might not be present in the response
    return center;
  };


  export const mapFromPatient = (patient:any, data: any) => {
   // const patient: any = {} as IPatient;
    // Dynamically copy properties from data to patient
    Object.keys(data).forEach((key) => {
     if(data[key]!= undefined)
      patient[key] = (data[key]!== null && data[key] !== undefined)? data[key] :'';
    });
    // Handle fields that might not be present in the response
    // patient.suffix = data.suffix || null;
    // patient.dob = data.dateOfBirth || null;
    patient.personId = data.personId || 0;
    return patient;
  };
  export const mapToPcp = (data: any): IPhysician[] => {
    const pcp: any = {} as IPhysician[];
    // Dynamically copy properties from data to patient
    Object.keys(data).forEach((key) => {
      pcp[key] = data[key];
    });
    // Handle fields that might not be present in the response
   
    return pcp;
  };

  export const mapToUpdatePatientDto = (data: any) => {
    const patient: {
      [key: string]: any;
    } = new UpdatePatientDto(data);
    patient.ethnicityId = parseInt(data?.patientEthnicity?.toString() ?? '', 10) || null; 
    patient.languageId = parseInt(data?.patientLanguage?.toString() ?? '', 10) || null;
    patient.raceId = parseInt(data?.patientRace?.toString() ?? '', 10) || null; 
    patient.maritalStatus = data.patientMaritalStatus || null;
    patient.genderIdentity = data.patientGenderIdentity || null;
    patient.preferredPronouns = data.patientPreferredPronouns || null;
    patient.sex = data.patientGender || '';
    patient.sexAtBirth = data.patientGenderAssigned || null;
    patient.personId = data.personId||0;
    return patient;
  };

  export const mapToUserSession = (data: any): UserSession => {
    return data;
  };

  export const mapToUpdateGuarantorDto = (data: Guarantor|IGuarantor) => 
    {
      let guarantor: {
        [key: string]: any;
      } = new UpdateGuarantorDto(data);
      return guarantor;
    }
  
  
  
  export const mapToGuarantor = (data: any): IGuarantor => {
    const guarantor: any = {} as IGuarantor;
    // Dynamically copy properties from data to patient
    Object.keys(data).forEach((key) => {
      guarantor[key] = data[key];
    });
    // Handle fields that might not be present in the response
    guarantor.suffix = data.suffix || null;
    guarantor.maritalStatus = data.maritalStatus || null;
    guarantor.zip= data.zipCode|| null;
    return guarantor;
  };
