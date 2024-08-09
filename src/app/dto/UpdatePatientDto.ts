import IPatient from "../interface/IPatient";
import Patient from "../models/Patient";
import { removeNonNumericChars } from "../utils/helper";


export class UpdatePatientDto {
    patientId: number;
    registrationId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex:string;
    phoneNumber: string | null;
    email: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    sexAtBirth: string | null;
    preferredPronouns: string | null;
    genderIdentity: string | null;
    suffix: string | null;
    maritalStatus: string | null;
    raceId: number | null;
    ethnicityId: number | null;
    languageId: number | null;
    personId: number| null;
  
    constructor(patientData?: IPatient | Patient) {
      this.sex = patientData?.sex || '';
      this.patientId = patientData?.patientId || 0;
      this.personId = patientData?.personId || 0;
      this.registrationId = patientData?.registrationId || 0;
      this.firstName = patientData?.firstName || '';
      this.lastName = patientData?.lastName || '';
      this.dateOfBirth = patientData?.dateOfBirth || '';
      
      //strip "-" from phone numbers for clean db data
      this.phoneNumber = removeNonNumericChars(patientData?.phoneNumber) || null;
  
      this.email = patientData?.email || null;
      this.addressLine1 = patientData?.addressLine1 || null;
      this.addressLine2 = patientData?.addressLine2 || null;
      this.city = patientData?.city || null;
      this.state = patientData?.state || null;
  
      //convert to string since "number" input type has interger value
      this.zipCode = patientData?.zipCode?.toString() || null;
      this.sexAtBirth = patientData?.sexAtBirth || null;
      this.preferredPronouns = patientData?.preferredPronouns || null;
      this.genderIdentity = patientData?.genderIdentity || null;
      this.suffix = patientData?.suffix || null;
      this.maritalStatus = patientData?.maritalStatus || null;
  
  
      //convert to integers for API since select components treat values as strings
      this.raceId = parseInt(patientData?.race?.toString() ?? '') || null;
      //convert to integers for API since select components treat values as strings
      this.ethnicityId =
        parseInt(patientData?.ethnicity?.toString() ?? '') || null;
      //convert to integers for API since select components treat values as strings
      this.languageId =
        parseInt(patientData?.language?.toString() ?? '') || null;
    }
  }