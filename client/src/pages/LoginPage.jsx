import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        loginData
      );
      const { success, message } = response.data;
      if (success) {
        console.log("LOGINSUCCESSFUL");
        // alert("LOGINSUCCESSFUL");
        setIsLoggedIn(true);
        navigate("/textsum");
      } else {
        console.log(message);
        alert("LOGINSUCCESSFUL");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };
  if (isLoggedIn) {
    return <Link to='/' />;
  }

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
              className='text-md font-mono hover:text-green-600  font-semibold text-gray-100 border-y-2'>
              Home
            </Link>
          </div>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center font-mono text-white'>
            Login
          </h2>
          <form onSubmit={handleLoginSubmit} className='space-y-4 flex-col '>
            <div>
              <label
                htmlFor='username'
                className='block mb-2 font-mono text-sm font-medium text-gray-300'>
                UserName
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={loginData.username}
                onChange={handleLoginChange}
                className='shadow-sm bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5'
                placeholder='Username'
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
                name='password'
                value={loginData.password}
                onChange={handleLoginChange}
                className='shadow-sm bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5'
                placeholder='Enter your password'
                required
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='py-3 px-5 font-mono text-sm  font-bold text-center text-white rounded-lg bg-green-900 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300'>
                Login
              </button>
            </div>
            <div className='text-center mt-4'>
              <span className='text-gray-300'>Don't have an account? </span>
              <Link to='/register' className='text-green-400 hover:underline'>
                Register now!
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

export default LoginPage;
