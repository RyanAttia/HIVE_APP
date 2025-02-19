import React from 'react'

const Login = () => {
  return( 
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className="h-full w-full bg-blue-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100">
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Login
                <span className='text-blue-500'> HiveApp</span>
            </h1>

            <form>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type='text' placeholder='Enter Username' className='w-full input input-bordered h-10' />
                </div>

                <div>
                <label>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input
                    type='password'
                    placeholder='Enter Password'
                    className='w-full input input-bordered h-10'
                />
                </div>
                <a href='#' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                    {Create} an account today!
                </a>

                <div> 
                    <button className='btn btn-block btn-sm mt-2'>Login</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Login