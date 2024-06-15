import React from "react";
import { Link } from "react-router-dom";

function ContactUs() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-black text-white font-mono'>
      <section className='bg-black text-white p-10 rounded-lg border-4 border-gray-100 max-w-lg w-full mt-7 shadow-neon mb-9'>
        <div className='px-4 mx-auto'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex space-x-2 text-red-500'>
              <div className='w-3 h-3 rounded-full bg-red-500'></div>
              <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
              <div className='w-3 h-3 rounded-full bg-green-500'></div>
            </div>
            <Link
              to='/'
              className='text-sm font-mono font-semibold text-gray-100 border-y-2 '>
              Home
            </Link>
          </div>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center font-mono text-white'>
            Contact Us
          </h2>
          <p className='mb-8 font-mono font-light text-center text-gray-400 sm:text-xl'>
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form action='#' className='space-y-8'>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 font-mono text-sm font-medium text-gray-300'>
                Your email
              </label>
              <input
                type='email'
                id='email'
                className='shadow-sm bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5'
                placeholder='name@flowbite.com'
                required
              />
            </div>
            <div>
              <label
                htmlFor='subject'
                className='block mb-2 font-mono text-sm font-medium text-gray-300'>
                Subject
              </label>
              <input
                type='text'
                id='subject'
                className='block p-3 w-full text-sm text-white bg-gray-800 rounded-lg border border-gray-600 shadow-sm focus:ring-green-400 focus:border-green-400'
                placeholder='Let us know how we can help you'
                required
              />
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='message'
                className='block mb-2 font-mono text-sm font-medium text-gray-300'>
                Your message
              </label>
              <textarea
                id='message'
                rows='6'
                className='block p-2.5 w-full text-sm text-white bg-gray-800 rounded-lg shadow-sm border border-gray-600 focus:ring-green-400 focus:border-green-400'
                placeholder='Leave a comment...'></textarea>
            </div>
            <button
              type='submit'
              className='py-3 px-5 font-mono text-sm font-bold text-center text-white rounded-lg bg-green-900 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300'>
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
