/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

export default function ImageUpload({
  id,
  name,
  label,
  error,
  value,
  setValue,
  setError, 
}: {
  id: string;
  name: string;
  label: string;
  error: boolean;
  value: string;
  setValue: any;
  setError: any;
}) {
  const [imageUpload, setImageUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const loadUploadedImage = (event: any) => {
    try {
      var input = event.target;
      var file = input.files[0];

      var output = document.getElementById(event.target.id + "Image");

      if (file != null) {
        var type = file.type;
        // console.log("Type " + type);
        // console.log("Type isMatch: " + type.match("(jpg|jpeg|png|gif)$"));
        if (output != null && type.match("(jpg|jpeg|png|gif)$")) {
          output.setAttribute(
            "src",
            URL.createObjectURL(event.target.files[0])
          );
          setValue(URL.createObjectURL(event.target.files[0]));
          setErrorUpload(false);
          setError(false);
          setImageUpload(true);
          console.log("Error Upload: " + error);
        } else {
          setErrorUpload(true);
          setError(true);
          setValue("");
          setImageUpload(true);
          console.log("Error Upload 2: " + error);
          label = "Error when uploading ...";
        }

        //console.log(output);
      }
    } catch (exception) {
      console.log(exception);
      setErrorUpload(true);
      setError(true);
      setValue("");
      console.log("Error Upload 2: " + error);
      label = "Error when uploading ...";
    }
  };
  error = errorUpload;

  return (
    <>
      <style jsx>
        {`
          .custom-border {
            position: relative;
            background: linear-gradient(
                0deg,
                rgba(232, 242, 245, 0.5) 0%,
                rgba(232, 242, 245, 0.5) 100%
              ),
              #fff;
          }

          /* Corner borders */
          .custom-border::before,
          .custom-border::after,
          .custom-border span::before,
          .custom-border span::after {
            content: "";
            position: absolute;
            width: 50px; /* Size of the corner border */
            height: 40px; /* Size of the corner border */
            background: transparent;
          }

          .custom-border::before {
            top: 0;
            left: 0;
            border-top: 2px solid #0067a1;
            border-left: 2px solid #0067a1;
            border-top-left-radius: 0.5rem;
          }

          .custom-border::after {
            top: 0;
            right: 0;
            border-top: 2px solid #0067a1;
            border-right: 2px solid #0067a1;
            border-top-right-radius: 0.5rem;
          }

          .custom-border span::before {
            bottom: 0;
            left: 0;
            border-bottom: 2px solid #0067a1;
            border-left: 2px solid #0067a1;
            border-bottom-left-radius: 0.5rem;
          }

          .custom-border span::after {
            bottom: 0;
            right: 0;
            border-bottom: 2px solid #0067a1;
            border-right: 2px solid #0067a1;
            border-bottom-right-radius: 0.5rem;
          }

          /* Top and bottom side borders */
          .side-border-top,
          .side-border-bottom {
            content: "";
            position: absolute;
            height: 1px; /* Thickness of the border */
            background-color: sky-750; /* Color of the border */
            width: calc(100% - 280px); /* Adjust width to avoid corners */
            left: 50%;
            transform: translateX(-50%);
          }

          .side-border-top {
            top: 0;

            border-color: #0067a1;
            border-width: 1px; /* Adjust border width as needed */
          }

          .side-border-bottom {
            bottom: 0;
            border-color: #0067a1;
            border-width: 1px; /* Adjust border width as needed */
          }

          /* Left and right side borders */
          .side-border-left,
          .side-border-right {
            content: "";
            position: absolute;
            width: 2px; /* Thickness of the border */
            background-color: sky-750; /* Color of the border */
            height: calc(100% - 80px); /* Adjust height to avoid corners */
            top: 50%;
            transform: translateY(-50%);
          }

          .side-border-left {
            left: 0;
          }

          .side-border-right {
            right: 0;
          }

          .corner-borders {
            position: relative;
          }
          .corner-borders::before,
          .corner-borders::after {
            content: "";
            position: absolute;
            width: 30px; /* Adjust size as needed */
            height: 30px; /* Adjust size as needed */
            border-width: 1px; /* Adjust border width as needed */
            border-color: black; /* Adjust border color as needed */
            border-style: solid;
          }
          .corner-borders::before {
            top: 0;
            left: 0;
            border-right: 0;
            border-bottom: 0;
          }
          .corner-borders::after {
            top: 0;
            right: 0;
            border-left: 0;
            border-bottom: 0;
          }
          .corner-borders::before.corner-bottom-left,
          .corner-borders::after.corner-bottom-right {
            content: "";
            position: absolute;
            width: 30px; /* Adjust size as needed */
            height: 30px; /* Adjust size as needed */
            border-width: 1px; /* Adjust border width as needed */
            border-color: 325A68; /* Adjust border color as needed */
            border-style: solid;
          }
          .corner-borders::before.corner-bottom-left {
            bottom: 0;
            left: 0;
            border-right: 0;
            border-top: 0;
          }
          .corner-borders::after.corner-bottom-right {
            bottom: 0;
            right: 0;
            border-left: 0;
            border-top: 0;
          }
        `}
      </style>
      <div
        className={`${errorUpload ? "border-red-600 border-2 bg-gradient-to-r from-red-300 to-red-100  rounded-lg" : "custom-border"} `}
      >
        <div className={``}>
          <div
            id={`${id}FormContainer`}
            className={`p-6 ${!imageUpload && !(error || errorUpload) ? "" : "hidden"}`}
          >
            <div className="p-4 w-full flex justify-center">
              <img src="../assets/images/card-new.svg" alt="" />
            </div>
            <div className=" text-center w-full ">
              <p className="text-zinc-800 text-sm font-normal">{label}</p>
            </div>
          </div>

          <div
            id={`${id}ImageContainer`}
            className={`${imageUpload || error || errorUpload ? "" : "hidden"} ${errorUpload ? "pt-12 bg-gradient-to-r from-red-300 to-red-100 " : ""} p-6 w-full flex justify-center`}
          >
            <img
              id={`${id}Image`}
              src="../assets/images/card-new.svg"
              className={`${imageUpload && !(error || errorUpload) ? "" : "hidden"}`}
              onError={(e) => {
                //   console.log(e);
                setErrorUpload(true);
                setError(true);
                label = "Error when uploading ...";
              }}
              alt=""
            />

            <div
              className={` ${errorUpload ? "text-red-600  " : "hidden"} text-center w-full `}
            >
              <p
                className={`${errorUpload ? "text-red-600 text-base font-bold " : "text-zinc-800 text-sm font-normal"} `}
              >
                {errorUpload ? "Error when uploading ..." : label}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`pb-14 ${errorUpload ? " bg-gradient-to-r from-red-300 to-red-100 " : ""}  text-center justify-center items-center gap-2.5`}
        >
          <label
            className={` text-center ${errorUpload ? "text-white bg-red-600 border-red-600" : "text-sky-700 border-sky-700"} rounded-[100px] p-2 px-4  border-2  text-base font-semibold`}
            htmlFor={`${id}`}
          >
            {imageUpload
              ? "Re-take photo or re-upload"
              : "Take a photo or upload"}
          </label>
        </div>
        <span></span>
        <div className={`${errorUpload ? "" : "side-border-top"}`}></div>
        <div className={`${errorUpload ? "" : "side-border-bottom"}`}></div>
        <div className="side-border-left"></div>
        <div className="side-border-right"></div>
      </div>
      <input
        type="file"
        className=" hidden"
        accept="image/*"
        name={`${name}`}
        id={`${id}`}
        onChange={(event) => {
          // console.log(event);
          loadUploadedImage(event);
        }}
      />
    </>
  );
}
