// src/components/organisms/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#141D38] text-white overflow-hidden">
      {/* Background watermark text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.08]">
        <h2 className="text-[10vw] font-extrabold tracking-wider whitespace-nowrap">
          CYD PORTFOLIO
        </h2>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 px-6 sm:px-10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          {/* Left side — Contact info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-white">
              Contact
            </h3>
            <a
              href="mailto:dchristianyuri@gmail.com"
              className="text-[#FCDB32] font-medium hover:opacity-80 transition-opacity"
            >
              dchristianyuri@gmail.com
            </a>
          </div>

          {/* Right side — Copyright & Social */}
          <div className="flex flex-col sm:items-end gap-6">
            <p className="text-sm text-gray-400">
              © {currentYear} CYD Portfolio
            </p>

            {/* Social icons */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#141D38] transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#141D38] transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.047-8.824 0-9.736h3.554v1.378c.43-.664 1.195-1.61 2.91-1.61 2.124 0 3.719 1.387 3.719 4.368v5.6zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.952-1.71 1.18 0 1.914.754 1.939 1.71 0 .951-.759 1.71-1.976 1.71zm1.46 11.597H3.876V9.671h2.921v10.781zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#141D38] transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
