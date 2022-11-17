import { useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
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
    <div className="flex flex-col items-center justify-center h-screen">
      
      <Head>
        <title> Busca Fatos BETA </title>
        <link rel="icon" href="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"/>
      </Head>
      
      {/* Header */}
      <header className="flex w-full p-5 justify-between text-sm text-gray-700">
        {/* Left */}
        <div className="flex space-x-4 items-center">
          <p className="link">About</p>
          <p className="link">Store</p>
        </div>
      
        {/* Right */}
        <div className="flex space-x-4 items-center">
          <p className="link">Gmail</p>
          <p className="link">Images</p>
      
        {/* Icon */}
        <ViewGridIcon className="h-10 w-10 p-2 cursor-pointer rounded-full hover:bg-gray-100"/>
          
        </div>
      
      </header>
      
      {/* Body */}
        <form className="flex flex-col items-center mt-44 flex-grow w-4/5">
          <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-gray-200 px-5 py-3 items-center sm:max-w-xl lg:max-w-2xl">
            <SearchIcon className="h-5 mr-3 text-gray-500"/>
            <input ref={searchInputRef} type="text" className="flex-grow  focus:outline-none"/>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col w-1/2 space-y-2 justify-center mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
            <button onClick={(event)=>search(event)} className="btn"> Busca Fatos </button>
          </div>
        </form>

      {/* Footer */}
      <Footer />
    </div>
  )
}
