import React from 'react';
import Link from 'next/link';

function NotFound() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-white">
      <h1 className="text-indigo-950 text-4xl md:text-6xl lg:text-8xl font-bold font-['Plus_Jakarta_Sans'] leading-[103.51px] text-center">
        Oops! Page Not Found
      </h1>
      <p className="w-auto text-center text-indigo-950 text-xl font-normal font-['Poppins'] leading-7">
        The URL you are trying to access may have been moved or is no longer available.
      </p>
      <Link
        href="/"
        className="px-6 py-4 bg-indigo-950 rounded-xl inline-flex justify-center items-center gap-2.5 hover:bg-indigo-900 transition"
      >
        <span className="text-white text-xl md:text-2xl lg:text-2xl font-semibold font-['Poppins']">Take me Back to Home Page</span>
      </Link>
    </main>
  );
}

export default NotFound;
