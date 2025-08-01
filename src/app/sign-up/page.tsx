'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage(){

const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const router = useRouter();

const onSubmit = async(event:React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    setIsSubmitting(true);

    try{

        await axios.post('/api/sign-up',{
            email,
            password
        });

        alert('Registrationi successful! You can now log in');

        router.push('/sign-in');


    }
    catch(error){
        console.error('Error during sign up:', error);
        alert('Some error occured while sign-up. Please try again');
    
    }

    finally{
        setIsSubmitting(false);
    }


}


return (

    <div className='flex flex-col items-center justify-center min-h-screen '>
        <div className='text-4xl font-bold text-center text-slate-400'><h1>Sign up to start using SwiftLink</h1></div>
        <div className ='w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700'>
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='email' className='font-bold text-gray-400'>Email:</label>
                <br/>
                <input className='focus:outline-none w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-gray-300 focus:ring-2 focus:ring-yellow-400' id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="password" className='font-bold text-gray-400'>Password</label>
                <br/>
                <input className='w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400' id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                
            </div>
            <button className='w-full py-3 font-semibold text-slate-900 bg-lime-400 rounded-md hover:bg-lime-600 transition-colors' type="submit" disabled={isSubmitting}>{isSubmitting?'Signing Up...please wait' : 'Sign-up'}</button>
            
        </form>
        </div>
        <div>
            <p className='text-gray-400'>Already have an account?{' '}
                <Link href="/sign-in" className="text-lime-400 hover:text-lime-600 underline">Sign-in</Link>
            </p>


        </div>





    </div>




);

}