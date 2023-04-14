import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image';
import Loading from '../components/Loading';
import { ViewGridIcon } from '@heroicons/react/solid';
import { SearchIcon } from '@heroicons/react/outline';
import dynamic from 'next/dynamic'
const WordCloud = dynamic(() => import('../components/WordCloud'), {
  ssr: false,
});
import Typed from 'typed.js';

export default function Home() {

  const searchInputRef = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const typer = useRef(null);
  const words = ['smokebuddies', 'com.br regras', 'veja.abril cânhamo', 'sechat maconha', 'gov.br', 'com.au cbd', 'ong.br', '.com and hemp', 'org.uk pain', 'vape cbd'];

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    const typed = new Typed(typer.current, {
      strings: words,
      typeSpeed: 100,
      backSpeed: 20,
      startDelay: 1000,
      backDelay: 1000,
      shuffle: true,
      loop: true,
      showCursor: false
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  const handleKey = (event) => {
    event.preventDefault();
    // console.log('handleKey', event.key);
    if (event.key === 'Enter') {
      search(event);
    }
  }
  const search = (event) => {
    event.preventDefault();
    const term = searchInputRef.current.value;

    if (!term) {
      return;
    }

    setLoading(true);

    router.push(`/search?term=${term}`);

  }

  return (
    <div className="home flex flex-col items-center justify-center h-screen">
      
      <Head>
        <title>Weedpedia URL search BETA</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      
      {/* Body */}
        <form className="flex flex-col items-center w-4/5 z-10">
          <div
            className="logo-container"
          >
            <Image 
              src="/logo-weedpedia-color.svg" 
              className="logo"
              layout="fill"
            />
          </div>
          <div 
            className="typer-container mt-6 text-center tracking-wide font-serif text-lg sm:text-xl text-secondary-400"
          >
            Try: 
            <span 
              ref={typer}
              className="typer text-secondary-500 ml-2"
            />
          </div>
          <div 
            className="flex bg-white w-full mt-8 max-sm:mt-8 transition-[box-shadow] duration-500 ease-in-out hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-secondary-300 pl-6 py-3 items-center sm:max-w-xl lg:max-w-2xl"
          >
            <SearchIcon 
              className="h-5 -ml-2 inline-block mr-3 text-secondary-500"
            />
            <input 
              autoFocus
              ref={searchInputRef} 
              type="text"
              placeholder="Search cannabis news, legislation, products and more"
              className="flex-grow bg-transparent focus:outline-none" 
              onKeyUp={handleKey} 
            />
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col w-1/2 space-y-2 justify-center mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
            <button 
              className="btn search"
              disabled={loading}
              onClick={(event)=>search(event)} 
            > 
              {
                loading ? 
                  <Loading />
                :
                <span
                  className="btn-label"
                >
                  Search
                </span> 
              }
              
            </button>
          </div>
        </form>

        {/* <WordCloud /> */}
    </div>
  )
}
