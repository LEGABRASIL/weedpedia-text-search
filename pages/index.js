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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      
      {/* Body */}
        <form className="flex flex-col items-center w-4/5">
          <div
            className="logo-container"
          >
            <Image 
              src="/logo-weedpedia-color.svg" 
              className="logo mb-12"
              layout='fill'
            />
          </div>
          <div 
            className="flex bg-white w-full mt-12 transition-[box-shadow] duration-500 ease-in-out hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-secondary-300 px-5 py-3 items-center sm:max-w-xl lg:max-w-2xl"
          >
            <SearchIcon 
              className="h-5 mr-3 text-secondary-500"
            />
            <input 
              ref={searchInputRef} 
              type="text" 
              placeholder="Find cannabis news, legislation, products and more"
              className="flex-grow focus:outline-none" 
            />
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col w-1/2 space-y-2 justify-center mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
            <button 
              onClick={(event)=>search(event)} 
              className="btn"
            > 
              URL beta finder
            </button>
          </div>
        </form>
    </div>
  )
}
