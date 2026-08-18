/**
 * Minimal footer. No fake company links or social media pretense.
 * Just the brand name, copyright, and relevant links.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
              className="text-brand-500"
            >
              <rect width="28" height="28" rx="7" fill="currentColor" />
              <path
                d="M6 14h4l2-6 3 12 2-8 2 4h3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="text-sm font-semibold text-gray-900">Pulse</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#product" className="hover:text-gray-900 transition-colors">Product</a>
            <a href="#docs" className="hover:text-gray-900 transition-colors">Docs</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © {currentYear} Pulse · Product concept for demonstration
          </p>
        </div>
      </div>
    </footer>
  );
}
