export const SidebarHeader = () => {
  return (
    <header className="p-4 flex justify-between items-center gap-x-2">
      <a
        className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80"
        href="https://github.com/juanj72"
        target="_blank"
        aria-label="Brand"
      >
        GitHub:juanj72
      </a>
      <div className="lg:hidden -me-2">
        <button
          type="button"
          className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
          data-hs-overlay="#hs-sidebar-collapsible-group"
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </header>
  );
};
