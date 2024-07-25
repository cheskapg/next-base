"use client";

import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

export default function IdleModal() {
  const timeout = 900_000;
  //   const promptBeforeIdle = 60_000;
  //const timeout = 300_000;
  const promptBeforeIdle = 120_000;

  const [state, setState] = useState<string>("Active");
  const [remaining, setRemaining] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  let pending = false;

  const onIdle = () => {
    setState("Idle");
    setOpen(false);
    pending = true;
    window.location.href = window.location.pathname + "/logout";
  };

  const onActive = () => {
    setState("Active");
    setOpen(false);
  };

  const onPrompt = () => {
    setState("Prompted");
    setOpen(true);
    console.log("here");
  };

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    timeout,
    promptBeforeIdle,
    throttle: 500,
  });

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
    const interval = setInterval(() => {
      setRemaining(formatTime(Math.ceil(getRemainingTime() / 1000)));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });
  const onClosePage = () => {
    pending = true;

    window.location.href = window.location.pathname + "/logout";
  };

  const handleStillHere = () => {
    activate();
    setOpen(false);
  };

  const timeTillPrompt = Math.max(
    parseInt(remaining) - promptBeforeIdle / 1000,
    0
  );
  const seconds = timeTillPrompt > 1 ? "seconds" : "second";

  //console.log(seconds);
  const formatTime = (milliseconds: number) => {
    milliseconds *= 1000;
    //console.log("milliseconds " + milliseconds);
    const totalSeconds = Math.floor(milliseconds / 1000);
    //console.log("total " + totalSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    //console.log("minutes " + minutes);
    const seconds = totalSeconds % 60;
    //console.log("seconds " + seconds);
    // console.log(
    //   `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    // );
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      <div id="modal" className={`${open ? "" : "hidden"} fixed z-10 inset-0`}>
        <div className="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="flex flex-col rounded-xl  justify-normal bg-white p-6  w-5/6">
            <label
              className="text-black
              text-[21px]
              font-bold"
              id="modal-title"
            >
              Are you still there?
            </label>
            <p className="mt-6 text-zinc-800  text-sm font-bold">
              You haven&apos;t been active in a while.
              <br />
              <br />
              For security, you will be logged out in:
            </p>
            <label
              id="timer"
              className="text-zinc-800 text-4xl font-bold mt-6 mb-6 text-center"
            >
              {remaining}
            </label>
            <div className={`flex items-end gap-4 pt-4 `}>
              <div className="w-3/6 ">
                <button
                  id="back"
                  onClick={onClosePage}
                  className={` w-full rounded-3xl text-sky-700
                  text-base
                  font-semibold text-center py-2 border-slate-600 border-2 `}
                >
                  Logout
                </button>
              </div>
              <div className="w-3/6">
                <button
                  id="Next"
                  onClick={handleStillHere}
                  className={` w-full rounded-3xl text-white text-base font-semibold py-2 border-2 border-elixir-5  bg-elixir-5 `}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
