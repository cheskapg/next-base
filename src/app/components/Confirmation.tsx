import { useEffect, useRef, useState } from 'react';
import GlobalDropdowns from '../interface/GlobalDropdowns';
import RegionSpecificDetails from '../interface/RegionSpecificDetails';
import SignaturePadComponent from './SignaturePadComponent';
import { useFormState } from './FormContext';
import { calculateAge } from '../utils/helper';
import Image from 'next/image'; // Import the Next.js Image component

import googleplay from '../public/assets/googleplay.svg';
import appstore from '../public/assets/appstore.svg';
import thumbsUp from '../public/assets/images/thumbs-up.svg';
import thumbsDown from '../public/assets/images/thumbs-down.svg';
export default function Confirmation() {
  return (
    <div className="flex flex-1 flex-col ">
      <div className="px-6 pt-6">
        <div className=" ">
          <h1 className="mb-4 text-lg font-normal text-[#073046]">
            Thank you! We will see you at
            <span className="font-bold"> Edmond </span> at approximately
            <span className="font-bold">
              {' '}
              12:45 pm EDT on today, 5/16/2024.{' '}
            </span>
          </h1>
        </div>
        <div className="  rounded-md border border-[#DBDDDE] p-4 text-sm">
          <div className="mb-2 font-bold text-[#073046]">
            When you arrive, you will also need to:
          </div>
          <div>
            <ul className="ml-6 list-outside list-disc">
              <li>Sign documents</li>
              <li>Scan your ID and insurance cards</li>
              <li>Verify emergency contacts</li>
              <li>
                Provide a credit/debit/HSA/FSA card as payment for any remainder
                after insurance is billed.*
              </li>
            </ul>
          </div>
        </div>
        <div className="  mb-4 text-sm ">
          <div className="mt-2">
            Thank you for completing your registration. Please be sure to bring
            your photo ID or passport, health insurance card, and a
            debit/credit/HSA/FSA card to your visit. We request that all
            patients sign up for our convenient pay system to make your payments
            fast and easy. We will bill your insurance first, and any remainder
            due will then be billed to your convenient pay account after you are
            notified.
            <br />
            <br />
            Find test results, store your info, and register faster next time by
            downloading our mobile app.
          </div>
        </div>
        <div className="flex  justify-center space-x-4 ">
          <Image src={googleplay} alt="Google Play" width={200} height={200} />
          <Image src={appstore} alt="App Store" width={200} height={200} />
        </div>

        <div className="">
          <button
            id="submit"
            type="button"
            // onClick={nextStep}
            className={`mt-4 w-full rounded-3xl border-2 border-spruce-4 py-2  text-center font-semibold text-[#3d6f80]`}
          >
            Get Directions
          </button>
        </div>
        <div className="mt-2  text-center text-sm font-bold text-[#073046]">
          3422 N Hwy 67, The Woodlands, TX 78555
        </div>
        <div className="">
          <button
            id="submit"
            type="button"
            // onClick={nextStep}
            className={`my-4 w-full rounded-3xl border-2 border-spruce-4 py-2  text-center font-semibold  text-[#3d6f80]`}
          >
            Request to pick up from Uber
          </button>
        </div>
        <div className="">
          <button
            id="submit"
            type="button"
            // onClick={nextStep}
            className={`mb-4 w-full rounded-3xl border-2 border-spruce-4 py-2  text-center font-semibold  text-[#3d6f80]`}
          >
            Call Us at (314) 720-4380
          </button>
        </div>
        <div className="rounded-md border border-[#DBDDDE] pt-3">
          <div className="mb-4 text-center text-sm font-bold text-[#073046]">
            How would you rate your registration experience?
          </div>
          <div className="mb-3 flex justify-center space-x-9">
            <Image src={thumbsUp} alt="Google Play" width={24} height={24} />
            <Image src={thumbsDown} alt="App Store" width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
