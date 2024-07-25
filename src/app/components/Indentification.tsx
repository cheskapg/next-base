/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "@/node_modules/next/link";
import { useFormState } from "./FormContext";
import { useFormik } from "formik";
import { loadUploadedImage } from "../utils/helper";
import ImageUpload from "./Fields/ImageUpload";
import { identificationSchema } from "../schemas/identification";

export default function Identification() {
  const { onHandleNext, onHandleBack, setPatientData, patientData } =
    useFormState();
  //console.log(patientData);

  const { values, errors, handleSubmit, handleChange, isValid } = useFormik({
    initialValues: {
      frontInsuranceCard: "",
      backInsuranceCard: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: identificationSchema,
    onSubmit: (values: any) => {
      onHandleFormSubmit(values);
    },
  });

  const [errorUpload, setErrorUpload] = useState(false);
  const [frontInsuranceCard, setFrontInsuranceCard] = useState("");
  const [backInsuranceCard, setBackInsuranceCard] = useState("");

  type TFormValues = {
    frontInsuranceCard: "";
    backInsuranceCard: "";
  };

  const onHandleFormSubmit = (data: TFormValues) => {
    //setPatientData((prev: any) => ({ ...prev, ...data }));
    //console.log("test" + JSON.stringify(data));
    console.log("test" + frontInsuranceCard);
    console.log("test" + backInsuranceCard);
    onHandleNext();
  };

  // console.log("Isvalid " + isValid);
  // console.log("Error " + errorUpload);
  // console.log("Error formik " + JSON.stringify(errors));
  // console.log(
  //   "result: " + !errorUpload &&
  //     frontInsuranceCard != null &&
  //     backInsuranceCard != null
  // );

  useEffect(() => {
    values.frontInsuranceCard = frontInsuranceCard;
    values.backInsuranceCard = backInsuranceCard;
    console.log("test" + frontInsuranceCard);
    console.log("test" + backInsuranceCard);
    console.log(
      "result: " + !errorUpload &&
        frontInsuranceCard != null &&
        backInsuranceCard != null
    );
  }, [frontInsuranceCard, backInsuranceCard]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="pt-6 px-6 ">
          <div className="text-xl">Identification</div>
        </div>

        <div className="p-6">
          <div className=" text-black text-base font-medium ">
            Upload the patient&apos;s photo ID
          </div>

          <div className="pt-2 text-black text-xs font-normal ">
            Place the card on a flat and well-lit surface. You can use your
            Driver&apos;s License, State-Issued ID, or Passport.
          </div>
          {/* Insurance Front Card */}

          <div className="mt-4 relative">
            <ImageUpload
              id="frontInsuranceCard"
              name="frontInsuranceCard"
              label="Upload Front of Identification Card"
              error={errorUpload}
              setError={setErrorUpload}
              value={frontInsuranceCard}
              setValue={setFrontInsuranceCard}
            ></ImageUpload>
          </div>
          {/* Insurance Back Card */}
          <div className="mt-4 relative">
            <ImageUpload
              id="backInsuranceCard"
              name="backInsuranceCard"
              label="Upload Back of Identification Card"
              error={errorUpload}
              setError={setErrorUpload}
              value={backInsuranceCard}
              setValue={setBackInsuranceCard}
            ></ImageUpload>
          </div>
        </div>

        {/* Action */}
        <div className=" p-6 h-full flex items-end gap-4">
          <div className="w-2/6 ">
            <button
              id="back"
              onClick={onHandleBack}
              className={` w-full rounded-3xl text-black text-center py-2 border-slate-600 border-2 h-[40px]`}
            >
              Back
            </button>
          </div>
          <div className="w-4/6">
            <button
              id="Next"
              className={` w-full ${errorUpload || frontInsuranceCard == "" || backInsuranceCard == "" ? "disabled pointer-events-none opacity-50" : ""} rounded-3xl text-white text-center py-2  bg-spruce-4 `}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
