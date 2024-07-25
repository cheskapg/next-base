"use client";
import Facility from "@/app/components/Facility";
import IdleModal from "@/app/components/IdleModal";
import Navbar from "@/app/components/Navbar";
import ProgressBar from "@/app/components/ProgressBar";
import { useFormik } from "formik";

export default async function ValidatePatient({
  region,
  center,
  patientData,
}: {
  region: any;
  center: any;
  patientData: any;
}) {
  const { values, errors, handleSubmit, handleChange, isValid, setSubmitting } =
    useFormik({
      initialValues: {
        dob: "",
      },
      onSubmit: (values: any) => {},
    });

  return (
    <>
      <Navbar region={region} />
      <ProgressBar value={1} />
      <Facility
        region={region}
        center={center}
        visitDate={patientData.visitTime}
        isVirtual={
          patientData.reasonForVisit.toString().includes("VV") ? true : false
        }
      />
      <div className="p-6 h-full">
        <div className="text-xl">
          Verify your identity with your date of birth.
        </div>
        <form className="h-full">
          <div className="flex mt-4">
            <div className="w-full ">
              <div className="w-full relative flex">
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className={`border ${errors.dateOfBirth ? "border-zest-6" : "border-poise-2"}   w-full  py-2 pt-6 rounded-lg appearance-none`}
                  placeholder="mm/dd/yyyy"
                ></input>

                <label
                  htmlFor="dateOfBirthLbl"
                  className={`absolute top-0 left-0 text-black-4 text-xs mt-2 ml-3 ${errors.dateOfBirth ? "text-zest-6" : ""}`}
                >
                  Patient&apos;s Date of Birth{" "}
                  <span className={`text-zest-6 text-xs font-normal `}>*</span>
                </label>
                <img
                  src="/assets/images/Calendar.svg"
                  className="absolute right-0 top-0 mt-[29px] mr-[15px] items-end justify-end w-4"
                ></img>
              </div>
              <div className={`text-black-4 text-xs font-normal `}>
                3 remaining attemps.
              </div>
              <div className={`text-zest-6 text-xs font-normal pl-4`}>
                {errors.dateOfBirth as string}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="py-4 flex items-end w-full h-full">
            {/* <Link href="/insurance"> */}
            <button
              id="nextbtn"
              type="submit"
              className={`w-full rounded-3xl text-white text-center py-2  bg-spruce-4  ${isValid ? "" : "pointer-events-none opacity-50"}`}
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
          display: none;
        }
      `}</style>
    </>
  );
}
