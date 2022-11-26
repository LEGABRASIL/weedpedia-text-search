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
        <link rel="icon" href="https://media4.giphy.com/media/h1QX6JsKb6VGsJZGuS/giphy.gif?cid=790b7611abd1d13a284e7133b44819853e7d2c9f6506755b&rid=giphy.gif&ct=s"/>
      </Head>

      
      {/* Body */}
        <form className="flex flex-col items-center mt-44 flex-grow w-4/5">
          <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-gray-200 px-5 py-3 items-center sm:max-w-xl lg:max-w-2xl">
            <SearchIcon className="h-5 mr-3 text-gray-500"/>
            <input ref={searchInputRef} type="text" className="flex-grow focus:outline-none bg-gray-900 text-amber-500  "/>
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
