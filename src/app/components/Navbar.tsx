import { useEffect } from "react";
import RegionSpecificDetails from "../interface/RegionSpecificDetails";
import { useFormState } from "./FormContext";

/* eslint-disable @next/next/no-img-element */
export default function Navbar({ region }: { region: any }) {
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
    <div className="flex p-6 w-full">
      <div className="flex items-center justify-center w-full">
        <img
          src={region?.region?.site_logo_color || "/assets/images/gh-logo.png"}
          className="h-11 flex items-center"
          alt="site logo"
        />
      </div>
    </div>
  );
}
