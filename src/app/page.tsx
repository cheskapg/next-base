export default function Home() {
  return (
    <main className="h-screen">
      <div className="flex h-screen items-center justify-center">
        <div className="w-[500px] rounded-lg bg-white p-16 shadow">
          <h1 className="text-2xl font-semibold text-gray-600">
            Welcome to GoReg 2.0
          </h1>
          <i>(Patient Flow)</i>
          <p className="mt-2 text-sm font-semibold text-gray-600">
            This is a test environment for GoReg 2.0 patient registration flow.
          </p>
          <a
            href="/patient/2780618?hash=873aea3850aaea236c02dea4e5b52949f78812ac"
            aria-label="navigate to patients page"
            className="group mt-8 inline-flex rounded-full bg-gradient-to-r from-orange-300 to-orange-500 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-300"
          >
            Go to registration
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-2 size-6 transition-all group-hover:ml-8"
            >
              <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
