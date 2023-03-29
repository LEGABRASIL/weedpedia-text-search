import { useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image';
import Footer from '../components/Footer';
import { ViewGridIcon } from '@heroicons/react/solid';
import { SearchIcon } from '@heroicons/react/outline';

export default function Home() {

  const searchInputRef = useRef(null);
  const router = useRouter();

  const search = (event) => {
    event.preventDefault();
    const term = searchInputRef.current.value;

    if (!term) {
      return;
    }

    router.push(`/search?term=${term}`);

  }

  return (
    <div className="home flex flex-col items-center justify-center h-screen">
      
      <Head>
        <title>Weedpedia Text search BETA</title>
        <link rel="icon" href="/weedpedia-icon.png"/>
      </Head>

      
      {/* Body */}
        <form className="flex flex-col items-center w-4/5">
        <Image 
          src="/logo-weedpedia-color.svg" 
          className="logo mb-12"
          height={80}
          width={585}
          />
          <div className="flex bg-white w-full mt-5 hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-secondary-300 px-5 py-3 items-center sm:max-w-xl lg:max-w-2xl">
            <SearchIcon className="h-5 mr-3 text-secondary-500"/>
            <input ref={searchInputRef} type="text" className="flex-grow" />
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col w-1/2 space-y-2 justify-center mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
            <button onClick={(event)=>search(event)} className="btn"> URL beta finder</button>
          </div>
        </form>
    </div>
  )
}
