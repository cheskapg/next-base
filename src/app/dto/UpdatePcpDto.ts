import Ipcp from "../interface/Ipcp";
import Pcp from "../models/Pcp";

export class UpdatePcpDto {

    primaryCareProvider: string;
    pcpNpi: string;


    constructor(pcp?: Pcp| Ipcp ) {
        this.primaryCareProvider = pcp?.name || '';
        this.pcpNpi = pcp?.npi || '';

    }
}