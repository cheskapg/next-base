import { useEffect } from "react";
import RegionSpecificDetails from "../interface/RegionSpecificDetails";
import { useFormState } from "./FormContext";

/* eslint-disable @next/next/no-img-element */
export default function Navbar({ region }: { region: RegionSpecificDetails }) {
  const { onHandleBack } = useFormState();
  const { step } = useFormState();

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

  const onClosePage = () => {
    pending = true;
    window.location.href = "https://www.gohealthuc.com/";
  };

  const onBackPage = () => {
    if (step === 1) {
      onClosePage();
    } else {
      onHandleBack();
    }
  };

  return (
    <div className="flex items-center justify-between p-6">
      <div>
        <button className="hidden" onClick={onBackPage}>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.24219 15.5977L0.808594 8.88281C0.632812 8.67188 0.5625 8.46094 0.5625 8.25C0.5625 8.07422 0.632812 7.86328 0.773438 7.6875L7.20703 0.972656C7.52344 0.621094 8.08594 0.621094 8.40234 0.9375C8.75391 1.25391 8.75391 1.78125 8.4375 2.13281L2.56641 8.25L8.47266 14.4375C8.78906 14.7539 8.78906 15.3164 8.4375 15.6328C8.12109 15.9492 7.55859 15.9492 7.24219 15.5977Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div>
        {/* <img src={region.region.site_logo_color} className="h-11" alt="" /> */}
      </div>
      <div>
        <button className="hidden" onClick={onClosePage}>
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9688 10.4336C12.2852 10.7852 12.2852 11.3125 11.9688 11.6289C11.6172 11.9805 11.0898 11.9805 10.7734 11.6289L6.625 7.44531L2.44141 11.6289C2.08984 11.9805 1.5625 11.9805 1.24609 11.6289C0.894531 11.3125 0.894531 10.7852 1.24609 10.4336L5.42969 6.25L1.24609 2.06641C0.894531 1.71484 0.894531 1.1875 1.24609 0.871094C1.5625 0.519531 2.08984 0.519531 2.40625 0.871094L6.625 5.08984L10.8086 0.90625C11.125 0.554688 11.6523 0.554688 11.9688 0.90625C12.3203 1.22266 12.3203 1.75 11.9688 2.10156L7.78516 6.25L11.9688 10.4336Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
