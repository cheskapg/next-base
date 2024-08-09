/* eslint-disable @next/next/no-img-element */
"use client";
import { generateVerifyToken } from "@/app/actions/api";
import Facility from "@/app/components/Facility";
import IdleModal from "@/app/components/IdleModal";
import Navbar from "@/app/components/Navbar";
import ProgressBar from "@/app/components/ProgressBar";
import { validate } from "@/app/utils/lib";
import { redirect } from "@/node_modules/react-router-dom/dist/index";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

export default function ValidatePatient({
  region,
  center,
  patientData,
}: {
  region: any;
  center: any;
  patientData: any;
}) {
  const { values, errors, handleSubmit, handleChange, isValid } = useFormik({
    initialValues: {
      dateOfBirth: "",
    },
    onSubmit: (values: any) => {
      console.log(values.dateOfBirth);
      validateSession(values.dateOfBirth, patientData.registrationId);
    },
  });

  const total: number = parseInt(process.env.TOTAL_FLOWS as string, 10) || 6;
  let pending = false;

  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      if (!pending) return;
      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [pending]);

  const logout = () => {
    pending = true;
    window.location.href = "unauthorized";
  };

  const validated = () => {
    pending = true;
    window.location.href = "/patient/" + patientData.registrationId;
  };

  const [attemps, setAttemps] = useState(3);

  const validateSession = async (dob: string, patientId: number) => {
    if (attemps == 3) {
      await generateVerifyToken(patientId);
    }

    const response = await validate(dob, patientId);

    if (response) {
      validated();
    } else {
      setAttemps(attemps - 1);
      if (attemps <= 1) {
        logout();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Navbar region={region} />
        <ProgressBar total={total} value={1} />
        <Facility
          region={region}
          center={center}
          visitDate={patientData.visitTime}
          isVirtual={
            patientData.reasonForVisit.toString().includes("VV") ? true : false
          }
        />
      </div>
      <div className={`p-6 flex flex-col flex-1`}>
        <div className="text-xl">
          Verify your identity with your date of birth.
        </div>
        <form onSubmit={handleSubmit} className={`flex flex-col flex-1`}>
          <div className="flex mt-4 flex-1">
            <div className="w-full ">
              <div className="w-full relative flex">
                <input
                  type="date"
                  id="dateOfBirth"
                  onChange={handleChange}
                  value={values.dateOfBirth}
                  name="dateOfBirth"
                  className={`border ${errors.dateOfBirth || attemps < 3 ? "border-zest-6" : "border-poise-2"}   w-full  py-2 pt-6 rounded-lg appearance-none`}
                  placeholder="mm/dd/yyyy"
                ></input>

                <label
                  htmlFor="dateOfBirthLbl"
                  className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-3 ${errors.dateOfBirth || attemps < 3 ? "text-zest-6" : ""}`}
                >
                  Patient&apos;s Date of Birth{" "}
                  <span className={`text-zest-6 text-xs font-normal `}>*</span>
                </label>
                <img
                  alt="calendar"
                  src="/assets/images/Calendar.svg"
                  className="absolute right-0 top-0 mt-[29px] mr-[15px] z-10 items-end justify-end w-4"
                ></img>
              </div>
              <div
                className={`${errors.dateOfBirth || attemps < 3 ? "text-zest-6" : "text-black-4 "} text-xs font-normal `}
              >
                {attemps} remaining attemps.
              </div>
              <div className={`text-zest-6 text-xs font-normal pl-4`}>
                {errors.dateOfBirth as string}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className={`py-4 flex items-end w-full `}>
            {/* <Link href="/insurance"> */}
            <button
              id="nextbtn"
              type="submit"
              className={`w-full rounded-3xl text-white text-center py-2  bg-spruce-4  ${true ? "" : "pointer-events-none opacity-50"}`}
              disabled={isValid ? false : true}
            >
              Next
            </button>
            {/* </Link> */}
          </div>
        </form>
        <IdleModal />
      </div>
      <style global jsx>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          z-index: 20;
        }
      `}</style>
    </>
  );
}
