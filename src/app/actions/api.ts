/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-throw-literal */
// "use server";

// import IPatient from "../interface/IPatient";
import { mapToUpdatePatientDto, mapToPatient, mapToPcp, mapToUserSession, mapToGuarantor, mapToUpdateGuarantorDto } from "../utils/mapper";
import { removeNullAttributes } from "../utils/helper";// import { removeNullAttributes } from "../utils/helper";
import Patient from "../models/Patient";
import Pcp from "@/models/Pcp";
import RegionSpecificDetails from "@/interface/RegionSpecificDetails";// import ApiResponse from "../interface/ApiResponse";
import IGuarantor from "@/interface/IGuarantor";
import Guarantor from "@/models/Guarantor";
import Insurance from "@/models/Insurance";
import ClinicalQuestions from "@/models/ClinicalQuestions";
const clinicalQuestions = [
  {
    id: 1,
    region_id: 1000,
    section: "GoHealth Quality",
    question: "Please check the respective boxes if you have been diagnosed with any of the following:",
    subtext: null,
    options: "High Blood Pressure,High Cholesterol,Diabetes,Cancer,Kidney Disease,Asthma/COPD,Congestive Heart Failure,Heart Attack,Anxiety,Depression,Other",
    input_type: "checkbox",
    visit_reason: null,
    conditional_id: null,
    conditional_value: null,
    minimum_age: null,
    is_required: false,
    form_display: true,
    high_risk_answer: null,
    high_risk_answer_status: null,
  },
  {
    id: 2,
    region_id: 1000,
    section: "GoHealth Quality",
    question: "Please list any other medical problems you have been diagnosed with:",
    subtext: null,
    options: null,
    input_type: "text",
    visit_reason: null,
    conditional_id: 1,
    conditional_value: "OTHER",
    minimum_age: null,
    is_required: false,
    form_display: true,
    high_risk_answer: null,
    high_risk_answer_status: null,
  },
  {
    id: 3,
    region_id: 1000,
    section: "GoHealth Quality",
    question: "Please check the respective boxes if any of your first-degree relatives (ex: siblings, parents, children) have been diagnosed with these illnesses:",
    subtext: null,
    options: "Diabetes,Heart Disease,Cancer,HTN,Stroke,Mental Illness,Other",
    input_type: "checkbox",
    visit_reason: null,
    conditional_id: null,
    conditional_value: null,
    minimum_age: null,
    is_required: false,
    form_display: true,
    high_risk_answer: null,
    high_risk_answer_status: null,
  },
  {
    id: 4,
    region_id: 1000,
    section: "GoHealth Quality",
    question: "Please list any other medical problems your first-degree relatives have been diagnosed with:",
    subtext: null,
    options: null,
    input_type: "text",
    visit_reason: null,
    conditional_id: 3,
    conditional_value: "OTHER",
    minimum_age: null,
    is_required: false,
    form_display: true,
    high_risk_answer: null,
    high_risk_answer_status: null,
  },
  {
    id: 5,
    region_id: 1000,
    section: "GoHealth Quality",
    question: "Have you received a flu shot since September 2020?",
    subtext: null,
    options: "Yes,No",
    input_type: "radio",
    visit_reason: null,
    conditional_id: null,
    conditional_value: null,
    minimum_age: null,
    is_required: false,
    form_display: true,
    high_risk_answer: null,
    high_risk_answer_status: null,
  },
  {
    id: 6,
    region_id: 1000,
    section: "GoHealth Quality",
    question: "The CDC recommends the flu shot as one of the best ways to keep you and your family safe from this dangerous virus. Would you like a flu shot during your visit?",
    subtext: null,
    options: "Yes,No",
    input_type: "radio",
    visit_reason: null,
    conditional_id: 5,
    conditional_value: "No",
    minimum_age: null,
    is_required: false,
    form_display: true,
    high_risk_answer: null,
    high_risk_answer_status: null,
  },
  {
    id: 7,
    region_id: 1000,
    section: "Tobacco",
    question: "Do you smoke cigarettes?",
    subtext: null,
    options: "Yes,No, but I was a former smoker,I was never a smoker",
    input_type: "dropdown",
    visit_reason: null,
    conditional_id: null,
    conditional_value: null,
    minimum_age: null,
    is_required: false,
    form_display: true,
    high_risk_answer: null,
    high_risk_answer_status: null,
  },
  {
    id: 8,
    region_id: 1000,
    section: "GoHealth Quality",
    question: "Have you returned from Guinea or Democratic Republic of Congo within the past month?",
    subtext: null,
    options: "Yes,No",
    input_type: "radio",
    visit_reason: null,
    conditional_id: null,
    conditional_value: null,
    minimum_age: null,
    is_required: false,
    form_display: true,
    high_risk_answer: null,
    high_risk_answer_status: null,
  },
  {
    id: 9,
    region_id: 1000,
    section: "GoHealth Quality",
    question: "Do you currently have fever and/or severe headache, fatigue, muscle pain, vomiting, diarrhea, abdominal pain, rash or unexplained bleeding?",
    subtext: null,
    options: "Yes,No",
    input_type: "radio",
    visit_reason: null,
    conditional_id: 8,
    conditional_value: "Yes",
    minimum_age: null,
    is_required: false,
    form_display: true,
    high_risk_answer: "Yes",
    high_risk_answer_status: null,
  },
  {
    id: 10,
    region_id: 1000,
    section: "COVID Related",
    question: "Is your visit COVID-19 related?",
    subtext: null,
    options: "Yes,No",
    input_type: "radio",
    visit_reason: null,
    conditional_id: null,
    conditional_value: null,
    minimum_age: null,
    is_required: false,
    form_display: true,
    high_risk_answer: null,
    high_risk_answer_status: null,
  },
  // Add more questions here if needed...
];

export default clinicalQuestions;

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
    data: {      // other static patient details
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

// Static list of valid subscriber IDs
const validSubscriberIds = ['1111c', '2222d', '3333e'];


export const validateSubscriberId = async (subscriberId: string) => {
  // Static response simulating an API call
  const response = {
    ok: true,
    json: async () => ({
      message: 'Subscriber ID validated successfully',
      data: {
        isValid: validSubscriberIds.includes(subscriberId),
      },
    }),
  };

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  const jsonData = await response.json();
  return jsonData.data.isValid;
};

const coPayPrice = ['30', '20', '50'];

export const checkPrice = async (copay: string ) => {
  // Static response simulating an API call
  const response = {
    ok: true,
    json: async () => ({
      message: 'copay price available successfully',
      data: {
        isValid: coPayPrice.includes(copay),
      },
    }),
  };

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  const jsonData = await response.json();
  return jsonData.data.isValid;
};

//Guarantor


// export const fetchGuarantorRegistrationById = async (
//   id: number,
// ): Promise<Guarantor> => {
//   const response = await fetch(
//     `${process.env.API_BASE_URL}/reg/${id}/guarantor`,
//     { cache: 'no-store' },
//   );
//   const jsonData: any = await response.json();
//   console.log(jsonData.statusCode != 404);
//   if(jsonData.statusCode != 404)
//     return mapToGuarantor(jsonData.data);
//   else 
//     return  mapToGuarantor(new Guarantor());
// };

export const updateGuarantor = async (id:number,guarantor: Guarantor): Promise<Guarantor> => {
  let payload =  mapToUpdateGuarantorDto(guarantor);

  const response = await fetch(
    `${process.env.API_BASE_URL}/reg/${id}/guarantor`,
    {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapToUpdateGuarantorDto(guarantor)),
  });

  if (!response.ok) {
    throw new Error('Failed to update guarantor');
  }

  const updatedData = await response.json();
  console.log(updatedData);
  return updatedData as Guarantor;
};


export const generateVerifyToken = async (id:number) => {
  const response = await fetch(`${process.env.API_BASE_URL}/reg/${id}/token/dob`);
  const jsonData:any = (await response.json());
  return jsonData;
};

export const verifyUserSession = async (
  id: number,
  dob:string
): Promise<any> => {

  console.log(id);
  const response = await fetch(
    `${process.env.API_BASE_URL}/reg/${id}/token/dob/verify`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"challenge": `${dob}`}),
    },
  );
  const jsonData: any = await response.json();
  console.log(jsonData);
  return jsonData.token;
};


// Insurance 
export const fetchInsuranceDetails = async (id: number): Promise<Insurance> => {
  try {
    // Static response
    const response = {
      ok: true,
      json: async () => ({
        message: 'Insurance details fetched successfully',
        data: {
          id: 1,
          carrier: 'Cigna HMO/PPO',
          subscriberId: '1234567890',
          groupId: 'ABC123',
          effectiveDate: '2022-01-01',
          expirationDate: '2023-01-01',
          // Add more properties as needed
        },
      }),
    };

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const jsonData: any = await response.json();

    console.log('Fetch Insurance Success', jsonData);

    return jsonData.data;
  } catch (error) {
    console.log('Call logging api here:', error);
    throw error;
  }
};

export const updateInsuranceDetails = async (insurance: Insurance): Promise<Insurance> => {
  try {
    console.log('Calling Update Insurance Details');
    console.log(JSON.stringify(insurance));

    // Static response
    const response = {
      ok: true,
      json: async () => ({
        message: 'Insurance details updated successfully',
        data: insurance,
      }),
    };

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const jsonData: any = await response.json();

    console.log('Update Insurance Success', jsonData);

    return jsonData.data;
  } catch (error) {
    console.log('Call logging api here:', error);
    throw error;
  }
};


// API function to update clinical questions data
export const updateClinicalQuestions = async (
  registrationId: number, 
  clinicalQuestionsData: ClinicalQuestions[]
): Promise<ClinicalQuestions[]> => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/reg/${registrationId}/clinicalAnswers`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clinicalQuestionsData), // Sending the data as JSON array
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error('Failed to update clinical questions data');
    }

    const updatedData = await response.json();
    return updatedData as ClinicalQuestions[];
  } catch (error) {
    console.error('Error updating clinical questions:', error);
    throw error;
  }
};

export const fetchClinicalQuestions = async (  region: number,
) => {
  try {
    // const response = await fetch(`${process.env.API_BASE_URL}/locations/regions/${region}/clinicalQuestions` ); // Replace with your API endpoint
    // const jsonData: any = await response.json();
    return clinicalQuestions;

    // return jsonData.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};