'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function HomePage(){

  const router = useRouter();
  const [originalUrl,setOriginalUrl] = useState('');
  const [shortCode,setShortCode] = useState('');
  const [isSubmitting,setIsSubmitting]=useState(false);


  const handleLinkShortening = async (event:React.FormEvent<HTMLFormElement>)=>{

    event.preventDefault();
    setIsSubmitting(true);
    setShortCode('');

    try{
      const response = await axios.post('/api/shorten',{
        originalUrl
      });

      setShortCode(response.data.shortCode);   //axios puts the json object inside data compartment

    }

    catch(error){
      console.error('Error shortening the URL:',error);
    }

    finally{
      setIsSubmitting(false);
    }

  

  }

  const fullShortUrl = shortCode? `${window.location.origin}/${shortCode}` : '';

  return(

    <div className='flex flex-col items-center justify-center min-h-screen text-white p-4'>
      <nav className='w-full max-w-5xl mx-auto flex justify-between items-center py-4'> 
        
        <h1 className='text-lime-400 text-4xl font-bold'>SwiftLink</h1>
        <div>
          {/* <Link href='/sign-in' className='text-slate-400 hover:text-lime-400 mr-4 transition-colors'>Sign In</Link> */}
          <Link href='/sign-up' className='text-slate-400 hover:text-lime-400 mr-4 transition-colors'>Sign Up</Link>
        </div>
      </nav>

      <hr/>

      <main className='flex flex-col items-center justify-center text-center flex-grow'>
        <h2 className='text-5xl font-extrabold mb-4'>The only <span className='text-lime-400'>URL shortener</span> you'll ever need</h2>
        <p className='text-lg text-slate-400 mb-8'>
          Create short,memorable links in seconds. Sign up to manage your links,
          track clicks and see your analytics
        </p>

        <form onSubmit={handleLinkShortening} className='w-full max-w-xl bg-slate-800 border border-slate-700 rounded-lg flex items-center space-x-2 bg-transparent'>
        <input className='flex-grow p-3 bg-transparent border-none rounded-md text-gray-200 placeholder-gray-400 px-5' type='url' placeholder='https://your-long-url.com' value={originalUrl} onChange={(e)=>setOriginalUrl(e.target.value) } required />
        <button className='bg-lime-400 text-slate-900 font-bold px-6 py-3 rounded-md hover:bg-lime-600 disabled-bg-gray-800' type='submit' disabled={isSubmitting}>{isSubmitting?'Breathe in...Breathe out':'Shorten'}</button>

        </form>

        {fullShortUrl &&(

          <div className='mt-4 bg-slate-800 p-4 rounded-lg w-full '>
            <p className='text-gray-300'>Your shortened link is ready:</p>
            <Link className='text-lime-400 text-lg font-semibold hover:underline' href={fullShortUrl}>{fullShortUrl}</Link>
          </div>


        ) }


      </main>




    </div>




  )

  



}
