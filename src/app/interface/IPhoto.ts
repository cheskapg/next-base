export default interface IPhoto{

        registration_id: number;
        file_name: string;
        type: string;
        mimetype: string;
        encoding: string;
        side: string;
        size: number;
        person_id: number;
        document_id: number;
        width: number;
        height: number;
        sequence: number;
        insurance_id: number | null;
        encodedImage: string;
}