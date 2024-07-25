"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center pt-[100px]">
      <h2 className="text-center items-center font-semibold text-status-red-text">
        Something went wrong!
        <br /> Please contact Administrator and try again.
      </h2>
      <button
        className="mt-4 rounded-md bg-status-red-text px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => {
            window.location.href = "/";
          }
        }
      >
        Try again
      </button>
    </main>
  );
}
