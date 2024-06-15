import React from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-black text-white font-mono'>
      <section className='bg-black text-white p-10 rounded-lg border-4 border-gray-100 max-w-lg w-full mt-7 shadow-neon mb-9'>
        <div className='px-4 mx-auto'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex space-x-2'>
              <div className='w-3 h-3 rounded-full bg-red-500'></div>
              <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
              <div className='w-3 h-3 rounded-full bg-green-500'></div>
            </div>
            <Link
              to='/'
              className='text-md hover:text-green-600  font-mono font-semibold text-gray-100 border-y-2'>
              Home
            </Link>
          </div>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center font-mono text-white'>
            Register
          </h2>
          <form className='space-y-4'>
            <div>
              <label
                htmlFor='username'
                className='block mb-2 font-mono text-sm font-medium text-gray-300'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='shadow-sm bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5'
                placeholder='Username'
                required
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 font-mono text-sm font-medium text-gray-300'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className='shadow-sm bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5'
                placeholder='name@example.com'
                required
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 font-mono text-sm font-medium text-gray-300'>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='shadow-sm bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5'
                placeholder='Enter your password'
                required
              />
            </div>

            <div className='flex justify-center'>
              <button
                type='submit'
                className='py-3 px-5 font-mono text-sm font-bold text-center text-white rounded-lg bg-green-900 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300'>
                Register
              </button>
            </div>
            <div className='text-center mt-4'>
              <span className='text-gray-300'>Already have an account? </span>
              <Link to='/login' className='text-green-400 hover:underline'>
                Login now!
              </Link>
            </div>
          </form>

          <div className='flex items-center my-4 space-x-4'>
            <div className='flex-1 h-0.5 bg-gray-500'></div>
            <p className='text-sm font-mono text-gray-500'>Or</p>
            <div className='flex-1 h-0.5 bg-gray-500'></div>
          </div>

          <div className='flex justify-center space-x-4'>
            <button className='group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-green-400 focus:bg-blue-50 active:bg-blue-100'>
              <div className='relative flex items-center space-x-4 justify-center'>
                <span className='block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-white sm:text-base'>
                  Google
                </span>
              </div>
            </button>

            <button className='group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-green-400 focus:bg-blue-50 active:bg-blue-100'>
              <span className='block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-white sm:text-base'>
                Facebook
              </span>
            </button>

            <button className='group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-green-400 focus:bg-blue-50 active:bg-blue-100'>
              <span className='block w-max font-semibold font-mono tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-white sm:text-base'>
                Github
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
