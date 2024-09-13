"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "./FormContext";
import { useFormik } from "formik";
import ImageUpload from "./Fields/ImageUpload";
import { identificationSchema } from "../schemas/identification";
import {
  LoadIdentification,
  UpdateIdentification,
  uploadPhoto,
} from "../actions/api";

export default function Identification() {
  const { onHandleNext, onHandleBack, setPatientData, patientData } =
    useFormState();
  //console.log(patientData);

  const { values, errors, handleSubmit, handleChange, isValid, setFieldValue } =
    useFormik({
      initialValues: {
        frontInsuranceCard: "",
        backInsuranceCard: "",
      },
      enableReinitialize: true,
      validateOnMount: true,
      validationSchema: identificationSchema,
      onSubmit: async (values: any) => {
        await onHandleFormSubmit(values);
      },
    });

  const [errorUpload, setErrorUpload] = useState(false);
  const [frontInsuranceCard, setFrontInsuranceCard] = useState(null);
  const [backInsuranceCard, setBackInsuranceCard] = useState(null);
  const [frontInsuranceImage, setFrontInsuranceImage] = useState(null);
  const [backInsuranceImage, setBackInsuranceImage] = useState(null);
  type TFormValues = {
    frontInsuranceCard: null;
    backInsuranceCard: null;
  };

  const onHandleFormSubmit = async (data: TFormValues) => {
    const frontImage =
      values.frontInsuranceCard != null ? frontInsuranceImage : null;
    const backImage =
      values.backInsuranceCard != null ? backInsuranceImage : null;

    const formData = new FormData();
    formData.append("regId", patientData.registrationId);
    formData.append("dob", patientData.dateOfBirth);
    formData.append("type", "ID");
    formData.append("sequence", JSON.stringify(1));
    if (frontImage != null)
      formData.append("frontIdentificationImage", frontImage);
    if (backImage != null)
      formData.append("backIdentificationImage", backImage);

    const response = await fetch(`/api/upload`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      onHandleNext();
    } else {
      setErrorUpload(true);
    }
  };

  const loadIds = async () => {
    const imageObj: any = JSON.parse(
      await LoadIdentification(
        patientData.registrationId,
        patientData.dateOfBirth
      )
    );
    setFrontInsuranceCard(imageObj?.FrontImage?.encodedImage || null);
    setBackInsuranceCard(imageObj?.BackImage?.encodedImage || null);
  };

  useEffect(() => {
    loadIds();
  }, []);

  return (
    <>
      <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
        <div className="pt-6 px-6 flex flex-col ">
          <div className="text-xl">Identification</div>
        </div>

        <div className="p-6 flex flex-1 flex-col">
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
              setError={(hasError) =>
                setErrorUpload((prev: any) => ({ ...prev,  hasError }))
              }              value={frontInsuranceCard}
              setValue={(val) => {
                console.log(val);
                setFieldValue(`frontInsuranceCard`, val);
              }}
              setInsuranceImage={setFrontInsuranceImage}
            ></ImageUpload>
          </div>
          {/* Insurance Back Card */}
          <div className="mt-4 relative">
            <ImageUpload
              id="backInsuranceCard"
              name="backInsuranceCard"
              label="Upload Back of Identification Card"
              error={errorUpload}
              setError={(hasError) =>
                setErrorUpload((prev: any) => ({ ...prev, hasError }))
              }              
              value={backInsuranceCard}
              setValue={(val) => {
                console.log(val);
                setFieldValue(`backInsuranceCard`, val);
              }}
              setInsuranceImage={setBackInsuranceImage}
            ></ImageUpload>
          </div>
        </div>

        {/* Action */}
        <div className=" p-6 flex items-end gap-4">
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
              type="submit"
              id="Next"
              className={` w-full ${errorUpload || values.frontInsuranceCard == "" || values.backInsuranceCard == "" ? "disabled pointer-events-none opacity-50" : ""} rounded-3xl text-white text-center py-2  bg-spruce-4 `}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
