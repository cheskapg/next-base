"use client";

import Navbar from "@/app/components/Navbar";

export default async function UnauthorizedContainer({
  region,
}: {
  region: any;
}) {
  return (
    <>
      <div className="border border-neutral-200">
        <Navbar region={region} />
      </div>

      <div className="h-full items-center w-full py-52 px-10">
        <div className="text-black text-center text-[21px] font-bold w-full">
          You are not authorized to view this registration.
        </div>
        <div className="text-black pt-3 text-center text-base font-normal">
          Don&apos;t worry well take care of you when you arrive.
        </div>
        <div className="w-full flex pt-6 items-center justify-center">
          <button
            onClick={
              // Attempt to recover by trying to re-render the invoices route
              () => {
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
