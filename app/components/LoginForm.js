"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ loading, setLoading ] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      console.log(errors)
      setLoading(true);
      await login(data);
      setLoading(false);
    } catch (error) {
      console.error("Error logging in: ", error)
    }

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-5'>
        <label
          htmlFor='email'
          className='mb-3 text-base justify-start flex font-medium text-white'
        >
          Email Address
        </label>
        <input
          type='email'
          placeholder='example@domain.com'
          className='w-full rounded-md border border-orange-600 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-slate-600 focus:shadow-md'
          {...register('email', { required: true })}
        />
        {errors.email && <p className="text-red-500">Please enter your email address</p>}
      </div>
      <div className='mb-5'>
        <label
          htmlFor='password'
          className='mb-3 text-base justify-start flex font-medium text-white'
        >
          Password
        </label>
        <input
          type='password'
          placeholder='password'
          className='w-full rounded-md border border-orange-600 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-slate-600 focus:shadow-md'
          {...register('password', { required: true })}
        />
        {errors.attendees && <p className="text-red-500">Please enter your password</p>}
      </div>
      <div className="flex pb-4">
        <button className='py-2 px-3 hover:shadow-form bg-orange-600 rounded text-gray-900 hover:bg-orange-400 hover:text-white transition duration-300'>
          { loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  )
}

export default LoginForm