import { useFormik } from "formik";
import { useFormState } from "./FormContext";
import RegionSpecificDetails from "../interface/RegionSpecificDetails";
import GlobalDropdowns from "../interface/GlobalDropdown";
import { demographic } from "../schemas/demographic";
import { UpdatePatientDto } from "../dto/UpdatePatientDto";
import { mapFromPatient, mapToUpdatePatientDto } from "../utils/mapper";
import IPatient from "../interface/IPatient";
import {
  fetchPatientRegistrationById,
  updatePatientDetails,
} from "../actions/api";
import { useEffect } from "react";

export default function Demographics({
  region,
  globalDropdowns,
}: {
  region: RegionSpecificDetails;
  globalDropdowns: GlobalDropdowns;
}) {
  const { onHandleNext, onHandleBack, setPatientData, patientData, step } =
    useFormState();

  //console.log(patientData);
  const { values, errors, handleSubmit, handleChange, isValid, touched } =
    useFormik({
      initialValues: {
        patientRace: patientData.raceId == undefined ? "" : patientData.raceId,
        patientEthnicity:
          patientData.ethnicityId == undefined ? "" : patientData.ethnicityId,
        patientMaritalStatus:
          patientData.maritalStatus == undefined
            ? ""
            : patientData.maritalStatus,
        patientLanguage:
          patientData.languageId == undefined ? "" : patientData.languageId,
        patientGender: patientData.sex,
        patientPreferredPronouns:
          patientData.preferredPronouns == undefined
            ? ""
            : patientData.preferredPronouns,
        setGenderIdentity: patientData.genderIdentity ? true : false,
        patientGenderAssigned:
          patientData.sexAtBirth == undefined ? "" : patientData.sexAtBirth,
        patientGenderIdentity:
          patientData.genderIdentity == undefined
            ? ""
            : patientData.genderIdentity,
      },
      enableReinitialize: true,
      validationSchema: demographic,
      //validateOnMount: true,
      onSubmit: (values: any) => {
        onHandleFormSubmit(values);
      },
    });

  console.log(patientData.genderIdentity);
  type TFormValues = {
    patientRace: "";
    patientEthnicity: "";
    patientMaritalStatus: "";
    patientLanguage: "";
    patientGender: "";
    patientPronouns: "";
    patientPreferredPronouns: "";
    patientGenderAssigned: "";
    setGenderIdentity: "";
    patientGenderIdentity: "";
  };

  const fetchPatient = async (registrationId: number) => {
    const data = await fetchPatientRegistrationById(registrationId);
    if (data !== null) {
      mapFromPatient(patientData, data);
    }
  };

  const isFormValid = () => {
    let valid =
      values.patientGender != "" ||
      values.patientRace != "" ||
      values.patientEthnicity != "" ||
      values.patientMaritalStatus != "";
    values.patientLanguage != "" ? true : false;

    //console.log("Isvalid: " + isValid + " IsformValid: " + valid);
    //console.log(errors);
    return valid;
  };

  const onHandleFormSubmit = async (data: IPatient) => {
    try {
      data.patientId = patientData.registrationId;
      mapFromPatient(patientData, data);

      const response = await updatePatientDetails(patientData, step);
      //console.log("IsDirty: " + dirty);
      setPatientData((prev: any) => ({ ...prev, ...patientData }));
      console.log("test" + JSON.stringify(response));
      onHandleNext();
    } catch (error) {
      console.log(error);
      alert("Oops! Something went wrong. Please try again");
    }
  };

  const onHandleBackBtn = (data: TFormValues) => {
    setPatientData((prev: any) => ({ ...prev, ...data }));
    onHandleBack();
  };

  useEffect(() => {
    const callFetch = async () => {
      const patient = await fetchPatientRegistrationById(
        patientData.registrationId
      );
      //console.log(patient);
      setPatientData((prev: any) => ({
        ...prev,
        ...patient,
      }));
    };
    callFetch();
  }, []);

  console.log(errors);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1">
      <div className="pt-6 px-6 flex flex-col">
        <div className="text-xl">Demographics</div>
      </div>

      <div className="p-4 flex flex-1 flex-col">
        {/* Patients Gender  */}
        <div className=" mt-4 relative items-center">
          <select
            id="patientGender"
            name="patientGender"
            onChange={handleChange}
            defaultValue={values.patientGender}
            className={`border ${errors.patientGender && touched.patientGender ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          >
            <option value="">-- Select an Option --</option>
            {region.genders
              .filter((x) => x.label != "Unknown")
              .map((gender) => (
                <option
                  value={gender.label}
                  // selected={gender.label === values.patientGender ? true : false}
                  key={gender.id}
                >
                  {gender.label}
                </option>
              ))}
          </select>
          <label
            htmlFor="patientGender"
            className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
          >
            Patient&apos;s Sex{" "}
            <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.patientGender && (errors.patientGender as string)}
          </div>
        </div>

        {/* Set Gender identity */}
        <div className="mt-4 relative items-center">
          <input
            type="checkbox"
            name="setGenderIdentity"
            id="setGenderIdentity"
            onChange={handleChange}
            checked={values.setGenderIdentity}
            placeholder="Same address as patient"
            className=" border-poise-2 px-2 pt-2 py-2 rounded-md"
          ></input>
          <label
            htmlFor="sameAsPatientChkBox"
            className="absolute top-0 left-0 text-black-4 text-sm mt-1 ml-8"
          >
            Set gender identity?
          </label>
        </div>

        <div
          id="sojiSection"
          className={`${values.setGenderIdentity ? "" : "hidden"}`}
        >
          {/* Patients Gender  */}
          <div className=" mt-4 relative items-center">
            <select
              id="patientGenderAssigned"
              name="patientGenderAssigned"
              onChange={handleChange}
              value={values.patientGenderAssigned}
              className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
            >
              <option value="">-- Select an Option --</option>
              {region.sogis
                .filter((x) => x.type == "BIRTH_SEX")
                .filter((x) => x.display != "Unknown")
                .map((gender) => (
                  <option value={gender.display} key={gender.id}>
                    {gender.display}
                  </option>
                ))}
            </select>
            <label
              htmlFor="patientGenderAssigned"
              className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
            >
              Patient&apos;s Sex Assigned at Birth
            </label>
          </div>

          {/* Patients Gender Identity  */}
          <div className=" mt-4 relative items-center">
            <select
              id="patientGenderIdentity"
              name="patientGenderIdentity"
              onChange={handleChange}
              value={values.patientGenderIdentity}
              className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
            >
              <option value="">-- Select an Option --</option>
              {region.sogis
                .filter((x) => x.type == "GENDER_IDENTITY")
                .map((soji) => (
                  <option value={soji.display} key={soji.id}>
                    {soji.display}
                  </option>
                ))}
            </select>
            <label
              htmlFor="patientGenderIdentity"
              className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
            >
              Patient&apos;s Gender Identity
            </label>
          </div>

          {/* Patients Preferred Pronoun  */}
          <div className=" mt-4 relative items-center">
            <input
              id="patientPreferredPronouns"
              name="patientPreferredPronouns"
              onChange={handleChange}
              value={values.patientPreferredPronouns}
              className="border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg"
            />

            <label
              htmlFor="patientPreferredPronouns"
              className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
            >
              Patient&apos;s Preferred Pronouns
            </label>
          </div>
        </div>

        {/* Patients Race */}
        <div className=" mt-4 relative items-center">
          <select
            id="patientRace"
            name="patientRace"
            onChange={handleChange}
            defaultValue={values.patientRace}
            className={`border ${errors.patientRace && touched.patientRace ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          >
            <option value="">-- Select an Option --</option>
            {region.races.map((race) => (
              <option
                className={`${race.form_display ? "" : "hidden"}`}
                value={race.id}
                key={race.id}
              >
                {race.display}
              </option>
            ))}
          </select>
          <label
            htmlFor="patientRace"
            className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
          >
            Patient&apos;s Race{" "}
            <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.patientRace && (errors.patientRace as string)}
          </div>
        </div>

        {/* Patients Ethnicity */}
        <div className=" mt-4 relative items-center">
          <select
            id="patientEthnicity"
            name="patientEthnicity"
            onChange={handleChange}
            defaultValue={values.patientEthnicity}
            className={`border ${errors.patientEthnicity && touched.patientEthnicity ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          >
            <option value="">-- Select an Option --</option>
            {region.ethnicities.map((ethnicity) => (
              <option
                className={`${ethnicity.form_display ? "" : "hidden"}`}
                value={ethnicity.id}
                key={ethnicity.id}
              >
                {ethnicity.display}
              </option>
            ))}
          </select>
          <label
            htmlFor="patientEthnicity"
            className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
          >
            Patient&apos;s Ethnicity{" "}
            <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.patientEthnicity && (errors.patientEthnicity as string)}
          </div>
        </div>

        {/* Patients Marital Status  */}
        <div className=" mt-4 relative items-center">
          <select
            id="patientMaritalStatus"
            name="patientMaritalStatus"
            defaultValue={values.patientMaritalStatus}
            onChange={handleChange}
            className={`border ${errors.patientMaritalStatus && touched.patientMaritalStatus ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          >
            <option value="">-- Select an Option --</option>
            {globalDropdowns.maritalStatuses.map((maritalStatus) => (
              <option
                className={`${maritalStatus ? "" : "hidden"}`}
                value={maritalStatus}
                key={maritalStatus}
              >
                {maritalStatus}
              </option>
            ))}
          </select>
          <label
            htmlFor="patientMaritalStatus"
            className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
          >
            Patient&apos;s Marital Status{" "}
            <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.patientMaritalStatus &&
              (errors.patientMaritalStatus as string)}
          </div>
        </div>

        {/* Patients Written Language  */}
        <div className=" mt-4 relative items-center">
          <select
            id="patientLanguage"
            name="patientLanguage"
            defaultValue={values.patientLanguage}
            onChange={handleChange}
            className={`border ${errors.patientLanguage && touched.patientLanguage ? "border-zest-6" : "border-poise-2"} w-full px-4 py-2 pt-6 rounded-lg`}
          >
            <option value="">-- Select an Option --</option>
            {region.languages.map((language) => (
              <option
                className={`${language.form_display ? "" : "hidden"}`}
                value={language.id}
                key={language.id}
              >
                {language.display}
              </option>
            ))}
          </select>
          <label
            htmlFor="patientLanguage"
            className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
          >
            Patient&apos;s Written/Preferred Language{" "}
            <span className={`text-zest-6 text-xs font-normal `}>*</span>
          </label>
          <div className={`text-zest-6 text-xs font-normal `}>
            {touched.patientLanguage && (errors.patientLanguage as string)}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className=" p-6 flex items-end gap-4">
        <div className="w-2/6 ">
          <button
            id="back"
            onClick={() => {
              onHandleBackBtn(values);
            }}
            className={` w-full rounded-3xl text-black text-center h-10 py-2 border-slate-600 border-2 `}
          >
            Back
          </button>
        </div>
        <div className="w-4/6">
          <button
            type="submit"
            id="Next"
            className={`w-full rounded-3xl text-white text-center py-2  bg-spruce-4  ${isFormValid() && isValid ? "" : "pointer-events-none opacity-50"}`}
            disabled={isValid && isFormValid() ? false : true}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}
