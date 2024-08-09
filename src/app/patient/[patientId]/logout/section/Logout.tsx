"use client";

import Navbar from "@/app/components/Navbar";
import { logout } from "@/app/utils/lib";
import { useEffect } from "react";

export default function Logout({ region }: { region: any }) {
  let pending = false;

  const endSession = async () => {
    await logout();
  };

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

  useEffect(() => {
    endSession();
  }, []);
  return (
    <>
      <div className="border border-neutral-200">
        <Navbar region={region} />
      </div>

      <div className="h-full items-center w-full py-52 px-10">
        <div className="text-black text-center text-[21px] font-bold w-full">
          For your security, you&apos;ve been logged out due to inactivity.
        </div>
        <div className="text-black pt-3 text-center text-base font-normal">
          Don&apos;t worry, we&apos;ll take care of you when you arrive.
        </div>
        <div className="w-full flex pt-6 items-center justify-center">
          <button
            onClick={
              // Attempt to recover by trying to re-render the invoices route
              () => {
                pending = true;
                window.location.href = "/";
              }
            }
            className="text-white text-base w-full font-semibold px-4 py-[17px] bg-spruce-4 rounded-[100px] justify-center items-center gap-2.5 inline-flex"
          >
            Return to main site
          </button>
        </div>
      </div>
    </>
  );
}
