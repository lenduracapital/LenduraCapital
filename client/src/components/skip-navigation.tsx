
export default function SkipNavigation() {
  return (
    <div className="sr-only">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-[#85abe4] focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:no-underline"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      <a 
        href="#main-navigation" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-32 focus:z-50 focus:bg-[#85abe4] focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:no-underline"
        aria-label="Skip to navigation"
      >
        Skip to navigation
      </a>
    </div>
  );
}
