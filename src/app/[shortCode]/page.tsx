'use client';


import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function ShortCodePage(){

    const params = useParams<{shortCode:string}>();             //params is the type of object containing shortCode as params:{shortCode:q2eds1} useParams extracts it from the URL and stores it in params
    const [message,setMessage] = useState('Salvaging your original link...');
    const router = useRouter();
    const [isError,setIsError] = useState(false);
    useEffect(()=>{

        const fetchAndRedirect = async()=>{

            const shortCode = params.shortCode;
            
            if(shortCode && typeof shortCode==='string'){
                try{
                    const response = await axios.get(`/api/redirect/${shortCode}`);

                    const originalUrl = response.data.originalUrl;

                    window.location.href = originalUrl;


                }
                catch(error){
                    console.error('Error fetching the redirect link:',error);
                    setMessage('Link not found or has expired');
                    setIsError(true);
                }
            }


        }
        if(params?.shortCode){
        fetchAndRedirect();
        }



    },[params.shortCode]);    //component in the return statement loads up while nextjs figures out the shortCode from params '
    //so params is empty initially as the params changes the useEffect hook comes into action and calls the inner function which makes the api call

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
            <div className="text-center">
            <div className="w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        
             <p className="text-xl text-gray-300">{message}</p>

             {isError && (
          <button
            onClick={() => router.push('/')}
            className="mt-6 bg-lime-400 text-slate-900 font-semibold px-4 py-2 rounded-md hover:bg-lime-500 transition-colors"
          >
            Go to Homepage
          </button>
        )}
            
            </div>

        </div>
    );


}