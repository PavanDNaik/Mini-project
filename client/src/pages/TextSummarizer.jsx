import React from "react";

function TextSummarizer() {
  return (
    <div className='min-h-screen min-w-full bg-gradient-to-r from-slate-900 to-emerald-400 flex flex-col justify-center p-10'>
      <div className='w-full max-w-full lg:max-w-6xl xl:max-w-screen-2xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left Section - Text Output Area */}
          <div className='bg-gradient-to-r from-emerald-300 to-slate-900 shadow-lg sm:rounded-3xl p-6'>
            <h2 className='text-3xl font-bold text-white mb-4'>
              Summary Output
            </h2>
            <div className='bg-white rounded-lg p-4 h-full overflow-y-auto'>
              {/* Display summarized text here */}
              <p className='text-gray-800'>summary</p>
            </div>
          </div>

          {/* Right Section - Text Input Area */}
          <div className='bg-gradient-to-r from-emerald-700 to-slate-900 shadow-lg sm:rounded-3xl p-6'>
            <h2 className='text-3xl font-bold text-white mb-4'>Text Input</h2>
            <form onSubmit={handleFormSubmit}>
              <textarea
                className='w-full h-64 bg-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800'
                placeholder='Paste or type your text here...'
                value='inputText'></textarea>
              <button
                type='submit'
                className='mt-4 px-8 py-3 rounded-full font-medium bg-gradient-to-b from-green-200 to-green-500 text-white outline-none focus:outline-none hover:shadow-lg hover:from-green-700 transition duration-200 ease-in-out'>
                Summarize
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextSummarizer;
