import { useEffect, useRef, useState } from 'react';
import GlobalDropdowns from '../interface/GlobalDropdowns';
import RegionSpecificDetails from '../interface/RegionSpecificDetails';
import SignaturePadComponent from './SignaturePadComponent';
import { useFormState } from './FormContext';
import { calculateAge } from '../utils/helper'
import Image from 'next/image'; // Import the Next.js Image component

import googleplay from '../public/assets/googleplay.svg'
import appstore from '../public/assets/appstore.svg'
export default function Confirmation() {

    return (
        <div className="flex flex-1 flex-col ">
            <div className='px-6 pt-6'>


                <div className=" ">
                    <h1 className="mb-4 text-lg font-normal text-[#073046]">
                        Thank you! We will see you at
                        <span className='font-bold'> Edmond </span> at approximately
                        <span className='font-bold'>  12:45 pm EDT on today, 5/16/2024.  </span>
                    </h1>
                </div>
                <div className="  text-sm p-4 border border-[#DBDDDE] rounded-md">
                    <div className='mb-2 font-bold text-[#073046]'>
                        When you arrive, you will also need to:
                    </div>
                    <div>
                        <ul className="ml-6 list-disc list-outside">
                            <li>Sign documents</li>
                            <li>Scan your ID and insurance cards</li>
                            <li>Verify emergency contacts</li>
                            <li>Provide a credit/debit/HSA/FSA card as
                                payment for any remainder after insurance is billed.*</li>
                        </ul>

                    </div>
                </div>
                <div className="  mb-4 text-sm ">
                    <div className='mt-2'>
                        Thank you for completing your registration.
                        <br /><br />
                        Find test results, store your info, and register faster next time by downloading our mobile app.
                    </div>
                </div>
                <div className="flex  space-x-4 justify-center ">
                    <Image src={googleplay} alt="Google Play" width={200} height={200} />
                    <Image src={appstore} alt="App Store" width={200} height={200} />
                </div>
            </div>





        </div>

    );
}
