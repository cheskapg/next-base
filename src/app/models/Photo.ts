import IPhoto from "../interface/IPhoto";

export default class Photo implements IPhoto {
   
    registration_id=0;
    file_name='';
    type='';
    mimetype='';
    encoding='';
    side='';
    size=0;
    person_id=0;
    document_id=0;
    width=0;
    height=0;
    sequence=0;
    insurance_id =0;
    encodedImage='';

    constructor(data: any) {
        this.registration_id = data.registration_id;
        this.file_name = data.file_name;
        this.type = data.type;
        this.mimetype = data.mimetype;
        this.encoding = data.encoding;
        this.side = data.side;
        this.size = data.size;
        this.person_id = data.person_id;
        this.document_id = data.document_id;
        this.width = data.width;
        this.height = data.height;
        this.sequence = data.sequence;
        this.insurance_id = data.insurance_id;
        this.encodedImage = data.encodedImage;
      }
}