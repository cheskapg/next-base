"use server"
import { UpdateIdentification, verifyUserSession } from '@/app/actions/api';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
 
export const config = {
  api: {
    // bodyParser: {
    //   sizeLimit: '50mb', // Adjust the size limit as needed
    // },
    bodyParser: false,
  },
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('here')
   
    const form = new IncomingForm({
      maxFileSize: 50 * 1024 * 1024, // Set the size limit to 50 MB
    });

    form.parse(req, async (err:any, fields:any, files:any) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to parse form data' });
      }
      const{regId, dob, type, sequence} = fields;
       const {frontIdentificationImage, backIdentificationImage} =files;
      
      const backFormData = new FormData();
      const frontFormData = new FormData();

      if(frontIdentificationImage!=null || frontIdentificationImage!=undefined)
      {
        // Convert Buffer to Blob
        const frontBlob = new Blob([fs.readFileSync(frontIdentificationImage[0].filepath)],{ type: frontIdentificationImage[0].mimetype });
      
        frontFormData.append("image", frontBlob, frontIdentificationImage[0].originalFilename);
        frontFormData.append(
            "image",
            JSON.stringify({
              type: `${type}`,
              side: "front",
              sequence: `${sequence}`,
              size: {
                height: 100,
                width: 100,
              },
            })
          );
          }


      if(backIdentificationImage!=null)
      {
          // Convert Buffer to Blob
        const backBlob = new Blob([fs.readFileSync(backIdentificationImage[0].filepath)], { type: backIdentificationImage[0].mimetype });
       backFormData.append("image", backBlob, backIdentificationImage[0].originalFilename);
        backFormData.append(
            "image",
            JSON.stringify({
              type: `${type}`,
              side: "back",
              sequence: `${sequence}`,
              size: {
                height: 100,
                width: 100,
              },
            })
          );
  
      }

      const response = await UpdateIdentification(regId,dob, files.frontIdentificationImage!=null? frontFormData :null ,files.backIdentificationImage!=null? backFormData: null );
      console.log(response);
      if(response.status ==200)
      {
        res.status(200).json({ message: 'Form data received', fields, files });
      }
      else
      {
        res.status(400).json({ message: 'Upload Error', fields, files });
      }
      
    });
    } else {
      // Handle any other HTTP method
    } 
  } 





  
