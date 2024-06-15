import React from "react";
import img1 from "./img1.svg";
import { Link, NavLink } from "react-router-dom";
import TextSummarizer from "./TextSummarizer";

function LandingPage() {
  return (
    <div className='min-h-screen min-w-full bg-gradient-to-tr from-gray-900 via-green-400 to-gray-900 flex flex-col justify-center p-10'>
      <div className='relative w-full max-w-full lg:max-w-6xl xl:max-w-screen-2xl mx-auto'>
        <div className='absolute inset-0 -mr-3.5 bg-gradient-to-r from-slate-900 to-slate-900  transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl shadow-neon'></div>
        <div className='relative bg-gradient-to-br from-gray-900 via-green-400 to-gray-900  sm:rounded-3xl shadow-neon'>
          <div className='flex items-center justify-start pt-6 pl-6'>
            <span className='w-3 h-3 bg-red-400 rounded-full mr-2'></span>
            <span className='w-3 h-3 bg-yellow-400 rounded-full mr-2'></span>
            <span className='w-3 h-3 bg-green-400 rounded-full mr-2'></span>
          </div>
          <div className='px-12 py-8'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-center'>
                <div className='flex items-center justify-center text-3xl font-bold font-mono text-white'>
                  <svg
                    className='w-10 h-10 mr-1 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'></path>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'></path>
                  </svg>
                  TextSummarizer
                </div>
                <div className='hidden lg:flex items-center justify-center antialiased lg:ml-20 pt-1'>
                  <a
                    href='#'
                    className='flex items-center justify-center mr-10 text-base text-white font-mono text-opacity-90 font-medium tracking-tight hover:text-cool-gray-600 transition duration-150 ease-in-out'>
                    Product
                    <svg
                      className='w-3.5 h-4 ml-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='3'
                        d='M19 9l-7 7-7-7'></path>
                    </svg>
                  </a>
                  <Link
                    to={"/ContactUs"}
                    className='flex items-center justify-center mr-10 text-base font-mono text-white text-opacity-90 font-medium tracking-tight hover:text-cool-gray-600 transition duration-150 ease-in-out'>
                    Contact Us
                    <svg
                      className='w-3.5 h-4 ml-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='3'
                        d='M19 9l-7 7-7-7'></path>
                    </svg>
                  </Link>
                  <a
                    href='#'
                    className='flex items-center justify-center mr-10 text-base font-mono text-white text-opacity-90 font-medium tracking-tight hover:text-cool-gray-600 transition duration-150 ease-in-out'>
                    About
                  </a>
                </div>
              </div>
              <div className='hidden md:flex items-center justify-center'>
                <a
                  href='#'
                  className='mr-5 text-lg font-medium text-white font-mono hover:text-cool-gray-700 transition duration-150 ease-in-out'>
                  Login
                </a>
                <button className='px-6 py-3 rounded-3xl font-medium font-mono bg-gradient-to-b from-gray-900 to-black text-white outline-none focus:outline-none hover:shadow-md hover:from-true-gray-900 transition duration-200 ease-in-out'>
                  Sign Up
                </button>
              </div>
            </div>

            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mt-20 lg:mt-10 lg:ml-16'>
              <div className='text-left lg:w-1/2'>
                <div className='text-6xl font-semibold font-mono text-white leading-none'>
                  Effortless Text Summarization
                </div>
                <div className='mt-6 text-xl font-bold font-mono text-white antialiased'>
                  Instantly condense lengthy documents into concise summaries.
                </div>
                <button className='mt-6 px-8 py-4 rounded-full font-mono font-semibold tracking-wide bg-gradient-to-b from-green-200 to-green-500 text-white outline-none focus:outline-none hover:shadow-lg hover:from-green-700 transition duration-200 ease-in-out'>
                  Get Started
                </button>
              </div>
              <div className='lg:w-1/2 mt-12 lg:mt-0 lg:ml-16'>
                <img
                  src={img1}
                  alt='Your SVG'
                  style={{ width: "500px", height: "500px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
