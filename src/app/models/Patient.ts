import IPatient from "@/interface/IPatient";


export default class Patient implements IPatient {
  personId = 0;

    patientId = 0;

    firstName = '';

    lastName = '';

    dateOfBirth = '';

    sex = '';

    sexAtBirth = '';

    preferredPronouns = '';

    genderIdentity = '';

    suffix = '';

    maritalStatus = '';

    race = '';

    raceId = 0;

    ethnicity = '';

    ethnicityId = 0;

    language = '';

    languageId = 0;

    phoneNumber = '';

    email = '';

    addressLine1 = '';

    addressLine2 = '';

    city = '';

    state = '';

    zipCode = '';

    reasonForVisit = '';

    visitTime = '';

    primaryCareProvider = '';

    registrationId = 0;

    regionId = 0;

    hospitalId = 0;

    status = '';

//insurance
    insuranceCarrier =  '' ;
    subscriberId =  '' ;
    hasInsurance =  '' ;
    insuranceFirstName =  '' ;
    insuranceLastName =  '' ;
    insuranceDob =  '' ;
    insurancePhone =  '' ;
    insuranceCountry =  '' ;
    insuranceAddress =  '' ;
    insuranceAddress2 =  '' ;
    insuranceCity =  '' ;
    insuranceState =  '' ;
    insuranceZip =  '' ;
    isValidInsurance =  '' ;
    insuranceSubscriber =  '' ;
    subscriberDob =  '' ;



    // additional carrier
    insuranceCarrier2 =  '' ;
      subscriberId2 =  '' ;
      hasInsurance2 =  '' ;
      insuranceFirstName2 =  '' ;
      insuranceLastName2 =  '' ;
      insuranceDob2 =  '' ;
      insurancePhone2 =  '' ;
      insuranceCountry2 =  '' ;
      insuranceAddress2_2 =  '' ;
      insuranceCity2 =  '' ;
      insuranceState2 =  '' ;
      insuranceZip2 =  '' ;
      subscriberDob2 =  '' ;
      isValidInsurance2 =  '' ;
      insuranceSubscriber2 =  '' ;
   
  }