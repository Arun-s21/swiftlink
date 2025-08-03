'use client';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type LinkType ={
    id:string;
    originalUrl:string;
    shortCode:string;
    clicks:number;
    createdAt:string;
};



export default function Dashboard(){
  const router = useRouter();
    const [links,setLinks] = useState<LinkType[]>([]);
    const[isLoading,setIsLoading] = useState(true);


    const signOut=async()=>{      //we dont use event parameter here because we dont need it to save page from refreshing simple click of the button signs user out here
      try{
        await axios.get('/api/sign-out');
        router.replace('/');
        alert('Sign out successful \nRedirecting you to the Homepage...');
      }
      catch(error){
        console.error('Error occurred while signing out:',error);
        alert('Unexpected error occurred while signing out. Please try again.');
      }

    };




    useEffect(()=>{

        const fetchLinks=async()=>{     //we didnot write async(event:React.FormEvent(HTMLFormEvent)) here because it is not a event handler i.e it isnt called by clicking a button from the react component button
            //it happens automatically because we dont want user having to click a button to show links we want user to see them as soon as the user lands on the dashboard
            //useEffect is used for things that happen automatically behind the scenes

            try{
                const response = await axios.get('/api/get-links');

                setLinks(response.data.links);
                
            }
            catch(error){
                console.error('Error fetching links:',error);
                alert('Error fetching links');
            }
            finally{
                setIsLoading(false);
            }


        };

        fetchLinks();

    },[]);


    if(isLoading){
        return(
            <div className="flex justify-center items-center min-h-screen text-gray-600">
                
         <div className="w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
                Loading your shortened URLs...</div>
        )
    }

   return (
    <div className="container mx-auto p-4 md:p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-lime-400">Your Links</h1>
        <div className="flex  items-center space-x-4">
        <Link href="/" className="bg-blue-950 text-white-900 font-semibold px-4 py-2 rounded-md hover:bg-lime-400 transition-colors">
          Shorten New Link
        </Link>
        <button
            onClick={signOut}
            className="bg-blue-950 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
          </div>

      </div>

      {links.length > 0 ? (
        <div className="space-y-4">
          {links.map((link) => {
            const shortUrl = `${window.location.origin}/${link.shortCode}`;
            return (
              <div key={link.id} className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center backdrop-blur-sm">
                <div className="flex-grow">
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-lime-400 hover:underline break-all">
                    {shortUrl}
                  </a>
                  <p className="text-sm text-gray-400 truncate max-w-md mt-1">
                    {link.originalUrl}
                  </p>
                </div>
                <div className="text-center mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                  <p className="text-3xl font-bold text-yellow-400">{link.clicks}</p>
                  <p className="text-sm text-gray-500">Clicks</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-800/50 border border-slate-700 rounded-lg backdrop-blur-sm">
          <p className="text-lg text-gray-400">You have not created any links yet.</p>
          <Link href="/" className="text-lime-400 hover:underline mt-4 inline-block font-semibold">
            Create your first one!
          </Link>
        </div>
      )}
    </div>
  );
}