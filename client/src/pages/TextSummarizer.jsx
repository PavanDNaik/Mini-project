import React, { useState } from "react";

function CompilerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("home");

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    setInput("");
    setOutput("");

    setSidebarOpen(false);
  };

  const handleCompile = () => {
    setOutput(input.toUpperCase());
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='flex min-h-screen bg-black text-white font-mono'>
      <aside
        className={`bg-black text-white p-4 w-64 flex flex-col justify-between ${
          sidebarOpen ? "block" : "hidden sm:block"
        }`}>
        <div>
          {/* Sidebar Header */}
          <div className='flex items-center mb-8'>
            <div className='flex space-x-2 text-red-500'>
              <div className='w-3 h-3 rounded-full bg-red-500'></div>
              <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
              <div className='w-3 h-3 rounded-full bg-green-500'></div>
            </div>
            <p className='text-sm ml-2'>Text-Summarizer</p>
          </div>

          <div className='space-y-2'>
            <div
              className={`cursor-pointer font-mono px-2 py-4 text-center rounded-lg hover:bg-gray-800 ${
                selectedOption === "home" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleOptionClick("/home")}>
              Home
            </div>

            <div
              className={`cursor-pointer px-2 py-4 text-center rounded-lg  hover:bg-gray-800 ${
                selectedOption === "contact" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleOptionClick("contact")}>
              ContactUs
            </div>
            <div
              className={`cursor-pointer px-2 py-4 text-center rounded-lg hover:bg-gray-800 ${
                selectedOption === "history" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleOptionClick("history")}>
              History
            </div>
          </div>
        </div>
      </aside>

      <main className='flex-1 p-4 flex flex-col justify-center items-center w-full'>
        <button
          className='sm:hidden absolute right-4 top-4 z-10 p-2 rounded-lg ml-6 bg-gray-900 hover:bg-gray-600 focus:outline-none'
          onClick={toggleSidebar}>
          {sidebarOpen ? "X" : "--"}
        </button>

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

        <div className='border-t border-white w-full my-4'></div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-6xl  '>
          <div className='bg-gray-800 p-4 rounded-lg shadow-lg shadow-green-300 mr-6'>
            <div className='flex justify-between items-center mb-4'>
              <div className='flex space-x-2 text-green-400'>
                <div className='w-3 h-3 rounded-full bg-red-500'></div>
                <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                <div className='w-3 h-3 rounded-full bg-green-500'></div>
              </div>
              <p className='text-sm font-mono text-gray-400'>Input</p>
            </div>
            <textarea
              className='w-full h-64 p-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-green-400 focus:border-green-400'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type your code here...'></textarea>
            <button
              onClick={handleCompile}
              className='mt-4 py-2 px-4 bg-green-500 text-black rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300'>
              Summarize
            </button>
          </div>

          <div className='bg-gray-800 p-4 rounded-lg shadow-lg shadow-green-300 ml-6'>
            <div className='flex justify-between items-center mb-4'>
              <div className='flex space-x-2 text-green-400'>
                <div className='w-3 h-3 rounded-full bg-red-500'></div>
                <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                <div className='w-3 h-3 rounded-full bg-green-500'></div>
              </div>
              <p className='text-sm text-gray-400'>Output</p>
            </div>
            <div className='w-full h-64 p-2 bg-gray-900 border border-gray-700 text-white rounded-lg overflow-auto'>
              {output}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CompilerPage;
