export default class Subscriber{
    id=0;
    first_name='';
    last_name='';
    phone_number='';
    address_id=0;
  
    dob='';
    sex='';
    sex_at_birth='';
    preferred_pronouns='';
    gender_identity='';
    email='';
    race_id=0;
    language_id=0;
    ethnicity_id=0;
    patient_type='';
    suffix='';
    marital_status='';
    virtual_address = {}

    constructor(data: any) {
        this.id=data.id;
        this.first_name=data.first_name;
        this.last_name=data.last_name;
        this.phone_number=data.phone_number;
        this.address_id=data.address_id;
  
        this.dob=data.dob;
        this.sex=data.sex;
        this.sex_at_birth=data.sex_at_birth;
        this.preferred_pronouns=data.preferred_pronouns;
        this.gender_identity=data.gender_identity;
        this.email=data.email;
        this.race_id=data.race_id;
        this.language_id=data.language_id;
        this.ethnicity_id=data.ethnicity_id;
        this.patient_type=data.patient_type;
        this.suffix=data.suffix;
        this.marital_status=data.marital_status;
        this.virtual_address = new Address(data.virtual_address)
      }
}



export class Address{

    id=0;
    address_1='';
    address_2='';
    city='';
    zipcode='';
    state='';
    international_address='';

    constructor(data: any) {
        this.id=data.id;
        this.address_1=data.address_1;
        this.address_2=data.address_2;
        this.city=data.city;
        this.zipcode=data.zipcode;
        this.state=data.state;
        this.international_address=data.international_address;
    }
}