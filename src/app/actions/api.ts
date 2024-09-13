"use server";


import Patient from "../models/Patient";
import { mapToUpdatePatientDto, mapToPatient, mapToPcp, mapToUserSession, mapToGuarantor, mapToUpdateGuarantorDto, mapToInsurance, mapToInsuranceDto } from "../utils/mapper";
import RegionSpecificDetails from "../interface/RegionSpecificDetails";
import ApiResponse from "../interface/ApiResponse";
import Pcp from "../models/Pcp";
import Guarantor from "../models/Guarantor";
import Insurance from "../models/Insurance";
import ClinicalQuestions from "../models/ClinicalQuestions";
import Carrier from "../models/Carrier";
import Photo from "../models/Photo";
import { json } from "stream/consumers";
import { UpdateSubcriberDto } from "../dto/UpdateSubcriberDto";


export const updatePatientDetails = async (patient: any, step: number): Promise<any> => {
  try {

    let payload = mapToUpdatePatientDto(patient);
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
  console.log(id,' fetch id')

  const response = await fetch(
    `${process.env.API_BASE_URL}/reg/${id}/patient`,
    { cache: 'no-store' },
  );

  const jsonData: any = await response.json();
  console.log(jsonData, "fetchPatientRegistrationById")
  return mapToPatient(jsonData.data);
};

export const validateInsurance = async (
  id: number, carrierId: number, subscriberNumber: string
): Promise<Guarantor> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/rte/verify`,
    { cache: 'no-store' },
  );
  const jsonData: any = await response.json();
  if (jsonData.statusCode != 404)
    return mapToGuarantor(jsonData.data);
  else
    return mapToGuarantor(new Guarantor());
};


export const fetchGuarantorRegistrationById = async (
  id: number,
): Promise<Guarantor> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/reg/${id}/guarantor`,
    { cache: 'no-store' },
  );
  const jsonData: any = await response.json();
  if (jsonData.statusCode != 404)
    return mapToGuarantor(jsonData.data);
  else
    return mapToGuarantor(new Guarantor());
};

export const updateGuarantor = async (id: number, guarantor: Guarantor): Promise<Guarantor> => {
  // console.log("Guarantor: "+ id);
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
    console.log(response);
    throw new Error('Failed to update guarantor');
  }

  const updatedData = await response.json();
  //console.log(updatedData);
  return updatedData as Guarantor;
};

export const fetchClinicalQuestions = async (  region: number,
) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/locations/regions/${region}/clinicalQuestions` ); // Replace with your API endpoint
    const jsonData: any = await response.json();
    console.log(jsonData,"return")
    return jsonData.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};
export const updateClinicalAnswers = async (registrationId: number, data: any) => {
  try {
      const response = await fetch(`${process.env.API_BASE_URL}/reg/${registrationId}/clinicalAnswers`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              // Add other headers as needed
          },
          body: JSON.stringify(data),
      });


      const result = await response.json();
      console.log('Success:', result);
      return result; // Return the result so it can be used by the calling function
  } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error so it can be caught by the calling function
  }
};
export const updateServiceAnswers = async (registrationId: number, data: any) => {
  try {
      const response = await fetch(`${process.env.API_BASE_URL}/reg/${registrationId}/serviceIntakeAnswers`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              // Add other headers as needed
          },
          body: JSON.stringify(data),
      });


      const result = await response.json();
      console.log('Success:', result);
      return result; // Return the result so it can be used by the calling function
  } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error so it can be caught by the calling function
  }
};

export const fetchServiceIntakeAnswers = async (registrationId: number) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/reg/${registrationId}/serviceIntakeAnswers` ); // Replace with your API endpoint
    const jsonData: any = await response.json();
    console.log(jsonData,"return")
    return jsonData.data;
  } catch (error) {
    console.error('Error fetching service answers:', error);
  }

}
export const fetchClinicalAnswers = async (  registrationId: number,
) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/reg/${registrationId}/clinicalAnswers` ); // Replace with your API endpoint
    const jsonData: any = await response.json();
    console.log(jsonData,"return")
    return jsonData.data;
  } catch (error) {
    console.error('Error fetching clinical answers:', error);
  }
};
export const fetchServiceIntakeQuestions = async (  region: number,
) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/locations/regions/${region}/serviceIntakeQuestions` ); // Replace with your API endpoint
    const jsonData: any = await response.json();

    return jsonData.data;
  } catch (error) {
    console.error('Error fetching service questions:', error);
  }
};
export const generateVerifyToken = async (id: number) => {
  const response = await fetch(`${process.env.API_BASE_URL}/reg/${id}/token/dob`);
  const jsonData: any = (await response.json());
  return jsonData;
};



  export const uploadPhoto = async (id: number, image: any, token: string, imageLocation: string) => {
    try {
      // Make the API request
      const response = await fetch(`${process.env.API_BASE_URL}/files/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        }, body: image,
      });
  
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log(response);
      throw new Error('Failed to upload file '+ JSON.stringify(response));
    }
    } catch (error) {
      console.error('Error uploading photo:', error);
      
    }
  };

  export const UpdateIdentification = async (
    regId: number,
    dob: string,
    frontIdentificationImage?: any,
    backIdentificationImage?: any
  ): Promise<any> => {
    let isValid = false;
    try {
      const token = await verifyUserSession(regId, dob);
      
      if (frontIdentificationImage) {
        const frontResponse = await uploadPhoto(regId, frontIdentificationImage, token, "front");
        isValid = frontResponse.statusCode === 200 ? true : false;
        console.log(frontResponse);
      }
  
      if (backIdentificationImage) {
        const backResponse = await uploadPhoto(regId, backIdentificationImage, token, "back");
        isValid = backResponse.statusCode === 200 ? true : false;
        console.log(backResponse);
      }
  
      return new Response(
        JSON.stringify({
          message: "Image Uploaded successfully!",
          isValid,
        })
      );
  
    } catch (error) {
      console.log("Error uploading files:", error);
      throw error;
    }
  }

  

  export const LoadIdentification = async (regId: number, dob: string): Promise<any> => {
   try{

        const token = await verifyUserSession(regId, dob)
        const photos:Photo[] = await fetchFile(regId,token);
        const frontPhotoObj:Photo = photos.filter(x=>x.side=="front"&&x.type=="ID").reverse()[0];
        const encodedImage = frontPhotoObj? await LoadPhoto(regId,token, frontPhotoObj.file_name):"";
        
        if(frontPhotoObj!=undefined)
        frontPhotoObj.encodedImage= "data:image/jpeg;base64,"+encodedImage;
        const backPhotoObj:Photo = photos.filter(x=>x.side=="back"&&x.type=="ID").reverse()[0];
       
        const backEncodedImage = backPhotoObj?  await LoadPhoto(regId,token, backPhotoObj.file_name):"";
        if(backPhotoObj!=undefined)
        backPhotoObj.encodedImage= "data:image/jpeg;base64,"+backEncodedImage;
        
        const identificationImages = {
          FrontImage : frontPhotoObj,
          BackImage : backPhotoObj
        };
        
        return JSON.stringify(identificationImages);
        
      } catch (error) {
        console.log('Error fetching file with query:', error);
        throw error;
      }
      }

      export const LoadInsurance = async (regId: number, dob: string, sequence:number): Promise<any> => {
        try{
     
             const token = await verifyUserSession(regId, dob)
             const photos:Photo[] = await fetchFile(regId,token);
             const frontPhotoObj:Photo = photos.filter(x=>x.side=="front"&&x.type=="INSURANCE" && x.sequence==sequence).reverse()[0];
             const encodedImage = frontPhotoObj? await LoadPhoto(regId,token, frontPhotoObj.file_name):"";
             
             if(frontPhotoObj!=undefined)
             frontPhotoObj.encodedImage= "data:image/jpeg;base64,"+encodedImage;
             const backPhotoObj:Photo = photos.filter(x=>x.side=="back"&&x.type=="INSURANCE" && x.sequence==sequence).reverse()[0];
            
             const backEncodedImage = backPhotoObj?  await LoadPhoto(regId,token, backPhotoObj.file_name):"";
             if(backPhotoObj!=undefined)
             backPhotoObj.encodedImage= "data:image/jpeg;base64,"+backEncodedImage;
             
             const identificationImages = {
               FrontImage : frontPhotoObj,
               BackImage : backPhotoObj
             };
             
             return JSON.stringify(identificationImages);
             
           } catch (error) {
             console.log('Error fetching file with query:', error);
             throw error;
           }
           }



  export const fetchFile = async (regId: number,  token: string,): Promise<any> => {
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/files/${regId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw error;
      }
  
      const jsonData: any = await response.json();
      const photos: Photo[] = jsonData.data.map((item: any) => new Photo(item));
      return photos
    } catch (error) {
      console.log('Error fetching file:', error);
      throw error;
    }
  };
  
  export const LoadPhoto = async (regId: number, token: string, fileName: string): Promise<any> => {
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/files/${regId}?load=${fileName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw error;
      }
  
      const fileData:any = await response.json();
      return fileData.data;
    } catch (error) {
      console.log('Error fetching file with query:', error);
      throw error;
    }
  };

export const verifyUserSession = async (
  id: number,
  dob: string
): Promise<any> => {


  const response = await fetch(
    `${process.env.API_BASE_URL}/reg/${id}/token/dob/verify`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "challenge": `${dob}` }),
    },
  );
  const jsonData: any = await response.json();

  return jsonData.token;
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

export const fetchCenterInfo = async (centerId: number) => {
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

// export const validateSubscriberId = async (regId: number, subscriberId: string, carrier: string) => {
//   console.log("Registration ID:", regId);
//   console.log("Carrier:", carrier);
//   console.log("Subscriber ID:", subscriberId);
  
//   const requestBody = {
//     registrationId: regId,
//     carrierId: carrier,
//     subscriberNumber: subscriberId,
//   };

//   console.log("Request Body:", JSON.stringify(requestBody));

//   try {
//     const response = await fetch(`${process.env.API_BASE_URL}/rte/Verify`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody),
//     });

//     console.log("Response Status:", response.status);
//     console.log("Response OK:", response.ok);

//     if (!response.ok) {
//       const error = await response.json();
//       console.error("Error Response:", error);
//       throw new Error(error.message || "Validation failed");
//     }

//     const jsonData = await response.json();
//     console.log("Response Data:", JSON.stringify(jsonData.data));

//     const insuredPerson = mapToInsurance(jsonData.data);
//     console.log("Mapped Insurance Data:", JSON.stringify(insuredPerson));
 
//     return jsonData.status === 'success';
//   } catch (error) {
//     console.error("API call failed:", error);
//     throw error;  // Re-throw the error after logging it
//   }
// };
// Mock response
// Mock response data
const mockResponse = {
  id: 22763,
  valid: false, // Change this to true to test the success path
  is_active: true,
  carrier_id: 1001,
  subscriber_id: 69173,
  subscriber_relation: "other",
  subscriber_number: "W265892344",
  plan_name: "Open Access MC",
  group_number: "023249701000062",
  copay_amount_uc: 85,
  copay_amount_pcp: null,
  individual_deductible: 2000,
  family_deductible: 4000,
  created_at: "2024-08-15T02:39:04.567Z",
  updated_at: "2024-08-15T02:39:23.857Z",
  pokitdok_error: null,
  other_comment: null,
  primary_bre_address_id: null,
  bre_entity_identifier_code: null,
  bre_id_qualifier: null,
  bre_id: null,
  bre_organization_name: "AETNA INC",
  managed_care_organization: null,
  emr_query_key: null,
  managed_care_phone: null,
  managed_care_url: null,
  plan_number: null,
  sequence: null,
  payor_id: 1854,
  changehealth_error: null,
  insurance_type_code: null,
  insurance_type: "Point of Service (POS)",
  rte_error: null,
  virtual_subscriber: {
    id: 69173,
    first_name: "BRITTNEY",
    last_name: "HEGARTY",
    phone_number: null,
    address_id: null,
    created_at: "2024-08-15T02:39:04.560Z",
    updated_at: "2024-08-15T02:39:23.863Z",
    dob: null,
    sex: null,
    sex_at_birth: null,
    preferred_pronouns: null,
    gender_identity: null,
    email: null,
    race_id: null,
    language_id: null,
    ethnicity_id: null,
    patient_type: null,
    suffix: null,
    marital_status: null
  }
};
export const validateSubscriberId = async (regId: number, 
  subscriberId: string, carrier: string, section: string) => {

  const requestBody = {
    registrationId: regId,
    carrierId: carrier,
    subscriberNumber: subscriberId,
    sequence: section,
  };

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/rte/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });


    // if (!response.ok) {
    //   const error = await response.json();
    //   console.error("Error Response:", error);

    //   return { success: false, data: null };  // Return false with no data if the response is not OK
    // }

    const jsonData = await response.json();
    // // Check if the `valid` property is false
    // if (!jsonData.data.valid) {
    //   console.log(jsonData.data, "Invalid data received, returning false.");
    //   return { success: false, data: null };  // Return false with no data if `valid` is false
    // }

    // Map to insurance data only if `valid` is true
    const insuredPerson = mapToInsurance(jsonData.data);
      console.log(jsonData.data, "valid data received, returning true.");

    return { success: jsonData.status === 'success', data: insuredPerson };  // Return success and mapped data
  } catch (error) {
    console.error("API call failed:", error);
    return { success: false, data: null };  // Return false with no data if there is an exception
  }
};


export const fetchCarriers = async (regionId:number) => {

  const response = await fetch(
    `${process.env.API_BASE_URL}/locations/regions/${regionId}/carriers`,
  );
  const jsonData = (await response.json()) as ApiResponse<any[]>;
  const carriers = jsonData.data.map((item: any) => new Carrier(item));

  return JSON.stringify(carriers);
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

    return jsonData.data;
  } catch (error) {
    console.log('Call logging api here:', error);
    throw error;
  }
};

export const updateInsuranceDetails = async (regId:number,insuranceId:number,insurance: Insurance, sequence: number): Promise<Insurance> => {
  try {
    const updateSubcriber = new UpdateSubcriberDto(insurance);
    const response = await fetch(
      `${process.env.API_BASE_URL}/reg/${regId}/insurance/${insuranceId}/subscriber`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateSubcriber)
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const jsonData: any = await response.json();
    return jsonData.data;
  } catch (error) {
    console.log('Call logging api here:', error);
    throw error;
  }
};
