export default function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#85abe4] text-white px-4 py-2 rounded-md font-medium transition-all duration-200"
      onFocus={(e) => e.target.scrollIntoView()}
    >
      Skip to main content
    </a>
  );
}