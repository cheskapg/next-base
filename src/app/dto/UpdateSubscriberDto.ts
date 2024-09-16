import Insurance from "../models/Insurance";
import IInsurance from "../interface/IInsurance";

export class UpdateSubcriberDto {

    firstName: string;
    lastName: string;
    suffix: string;
    dateOfBirth: string;
    sex: string;
    preferredPronouns: string;
    genderIdentity: string;
    phoneNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    internationalAddress: boolean;

    constructor(data: Insurance | IInsurance) {
        // Handle insurance data if available
        this.firstName = data.insuranceFirstName1 || data.insuranceFirstName2 || '';
        this.lastName = data.insuranceLastName1 || data.insuranceLastName2 || '';
        this.dateOfBirth = data.insuranceDob1 || data.insuranceDob2 || '';
        this.phoneNumber = data.insurancePhone1 || data.insurancePhone2 || '';
        this.addressLine1 = data.insuranceAddress1 || data.insuranceAddress2 || '';
        this.addressLine2 = data.insuranceAddress2_1 || data.insuranceAddress2_2 || '';
        this.city = data.insuranceCity1 || data.insuranceCity2 || '';
        this.state = data.insuranceState1 || data.insuranceState2 || '';
        this.zipCode = data.insuranceZip1 || data.insuranceZip2 || '';
        
        // Default values for fields not present in IInsurance interface
        this.suffix = ''; 
        this.sex = ''; 
        this.preferredPronouns = ''; 
        this.genderIdentity = ''; 
        this.email = ''; 
        this.internationalAddress = false; 
    }
}

