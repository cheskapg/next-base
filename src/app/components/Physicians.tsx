import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { text } from "stream/consumers";
import { fetchCenterInfo, fetchPatientPcp } from "../actions/api";
import { useFormState } from "./FormContext";

export default function Physician() {
  const { onHandleNext, onHandleBack, setPatientData, patientData } =
    useFormState();

  //console.log("data" + JSON.stringify(patientData));
  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      havePhysician: patientData.havePhysician ?? "",
      physicianName: patientData.physicianName ?? "",
      wantPhysician: "",
      noPhysician: "",
    },

    onSubmit: (values: any) => {
      console.log("Form submitted!");
      onHandleNext();
    },
  });
  let result: any = null;
  const [pcps, setpcp] = useState([]);
  const [hasResult, sethasResult] = useState(false);
  const [selectedPcp, setSelectedPcp] = useState("");

  const dosearch = async (event: any) => {
    console.log(values.physicianName.length);
    if (event.target.value.length >= 3) {
      result = await fetchPatientPcp(patientData.regionId, event.target.value);

      setpcp(Object.values(result ?? {}) ?? {});
      sethasResult(true);
    } else {
      sethasResult(false);
    }
  };

  type TFormValues = {
    hasPhysician: "";
    physicianName: "";
  };

  const onHandleBackBtn = (data: TFormValues) => {
    setPatientData((prev: any) => ({ ...prev, ...data }));
    console.log("back" + JSON.stringify(patientData));
    onHandleBack();
  };

  // console.log(values.havePhysician, values.noPhysician, values.wantPhysician);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1">
      <div className="pt-6 px-6 flex flex-col">
        <div className="text-lg font-normal">
          Do you have a primary physician?
        </div>
      </div>

      {/* Do you have a primary physician */}
      <div className="p-6 flex flex-col flex-1">
        <div
          onMouseLeave={(e) => {
            sethasResult(false);
            handleChange(e);
          }}
          className="  mt-4 relative items-center"
        >
          <div className="flex gap-4">
            <div className="p-0.5 rounded-lg border border-sky-700 justify-center items-center inline-flex">
              <input
                id="havePhysician"
                type="checkbox"
                checked={values.havePhysician == "on"}
                onChange={(e) => {
                  //    console.log("havePhysician " + values.havePhysician);
                  if (values.havePhysician == "") {
                    values.noPhysician = "";
                    values.wantPhysician = "";
                  }
                  handleChange(e);
                }}
                className="rounded-md border-hidden p-0.5 peer-not"
              ></input>
            </div>
            <label htmlFor="havePhysician">Yes, I have one.</label>
          </div>

          <div
            className={`${values.havePhysician == "on" ? "block" : "hidden"} mt-4  w-full p-4 bg-slate-100 rounded-xl flex-col justify-start items-start gap-4 inline-flex`}
          >
            <div className=" relative w-full">
              <input
                type="text"
                id="physicianName"
                onChange={(e) => {
                  dosearch(e);
                  handleChange(e);
                }}
                value={values.physicianName}
                placeholder="Last Name, First Name"
                className="group border border-poise-2 w-full px-4 py-2 pt-6 rounded-lg "
              />
              <label
                htmlFor="physicianName"
                className="absolute top-0 left-0 text-black-4 text-xs mt-2 ml-4"
              >
                Physician&apos;s Name
              </label>
              <div
                className={`${hasResult ? "" : "hidden"} absolute top-0 left-0 w-full mt-16 z-50 bg-white rounded-b-xl border-x-2 border-b-2 overflow-y-auto h-56`}
              >
                {pcps?.map((data: any) => (
                  <div
                    key={data.name}
                    onClick={() => {
                      setSelectedPcp(data.name);
                      values.physicianName = data.name;
                      sethasResult(false);
                    }}
                    className="p-4 hover:bg-slate-200 focus:bg-slate-200 "
                  >
                    {data.name}
                  </div>
                ))}
                <div
                  className={`${pcps.length < 1 ? "" : "hidden"} text-opacity-50 font-light text-center flex items-center justify-center h-full`}
                >
                  No result found
                </div>

                {/* {result.forEach((pcp: any) => {
                  console.log(pcp);
                })} */}
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-4 relative items-center">
          <div className="flex gap-4">
            <div className="p-0.5 rounded-lg border border-sky-700 justify-center items-center inline-flex">
              <input
                id="wantPhysician"
                type="checkbox"
                checked={values.wantPhysician == "on"}
                onChange={(e) => {
                  //  console.log("wantPhysician " + values.wantPhysician);
                  if (values.wantPhysician == "") {
                    values.noPhysician = "";
                    values.havePhysician = "";
                  }
                  handleChange(e);
                }}
                className="rounded-md border-hidden p-0.5"
              ></input>
            </div>
            <label htmlFor="wantPhysician">I want one.</label>
          </div>
        </div>
        <div className=" mt-4 relative items-center">
          <div className="flex gap-4">
            <div className="p-0.5 rounded-lg border border-sky-700 justify-center items-center inline-flex">
              <input
                id="noPhysician"
                type="checkbox"
                checked={values.noPhysician == "on"}
                onChange={(e) => {
                  // console.log("noPhysician " + values.noPhysician);
                  if (values.noPhysician == "") {
                    values.wantPhysician = "";
                    values.havePhysician = "";
                  }
                  handleChange(e);
                }}
                className="rounded-md border-hidden p-0.5"
              ></input>
            </div>
            <label htmlFor="noPhysician">I don&apos;t want one.</label>
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
            className={`w-full rounded-3xl text-black text-center h-10 py-2 border-slate-600 border-2 `}
          >
            Back
          </button>
        </div>
        <div className="w-4/6">
          <button
            id="Next"
            className={` w-full ${values.physicianName != "" || values.wantPhysician == "on" || values.noPhysician == "on" ? "" : "disabled pointer-events-none opacity-50"} rounded-3xl text-white text-base font-semibold text-center py-2  bg-spruce-4 `}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}
