import IGuarantor from "../interface/IGuarantor";
import Guarantor from "../models/Guarantor";


export class UpdateGuarantorDto {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: string;
    phoneNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    lastUpdated: string;
    guarantorRelationship: string;
  
    constructor(guarantor?:IGuarantor|Guarantor)
    {
        this.firstName = guarantor?.firstName||'';
        this.lastName= guarantor?.lastName||'';
        this.dateOfBirth= guarantor?.dateOfBirth||'';
        this.sex= guarantor?.sex||'';
        this.phoneNumber= guarantor?.phoneNumber||'';
        this.email= guarantor?.email||'';
        this.addressLine1= guarantor?.addressLine1||'';
        this.addressLine2= guarantor?.addressLine2||'';
        this.city= guarantor?.city||'';
        this.state= guarantor?.state||'';
        this.zipCode= guarantor?.zipCode||'';
        this.lastUpdated= new Date().toDateString();
        this.guarantorRelationship= guarantor?.guarantorRelationship||'';
    }

}