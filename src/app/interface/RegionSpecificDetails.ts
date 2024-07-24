type Region = {
    id: number;
    display: string;
    partnership_display: string;
    site_logo: string;
    site_logo_color: string;
    slug: string;
    timezone: string;
    virtual_visit_cost: string;
    mend_url: string;
    image_capture_on: boolean;
    image_capture_required: boolean;
    max_charge: number;
    consent_file: string;
    states: string;
    partner_legal_name: string;
    partner_medical_group: string;
    billing_phone: string;
  };
  
  type Language = {
    id: number;
    display: string;
    external_value: string;
    external_abbr: string;
    form_display: boolean;
    emr_id: number;
  };
  
  type Race = {
    id: number;
    display: string;
    external_value: string;
    external_abbr: string;
    form_display: boolean;
  };
  
  type Ethnicity = {
    id: number;
    display: string;
    external_value: string;
    external_abbr: string;
    form_display: boolean;
  };
  
  type Gender = {
    id: number;
    label: string;
    value: string;
  };

  type Sogis = {
      id: number;
      display: string;
      region_id: number;
      external_value: string;
      external_abbr: string;
      type: string;
    };

    type Relations = {
        value: string;
        display: string;
        region_id: number;
        subscriber_display: boolean;
        guarantor_display: boolean;
        allow_as_child: boolean;
        external_value: string;
        external_abbr: string;
      };
  
  export default interface RegionSpecificDetails {
    region: Region;
    languages: Language[];
    races: Race[];
    ethnicities: Ethnicity[];
    genders: Gender[];
    sogis: Sogis[];
    relations: Relations[];
  }