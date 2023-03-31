import { MicrophoneIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import HeaderOptions from './HeaderOptions';


function Header() {
  const router = useRouter();
  const searchInputRef = useRef(null);

  const search = (event) => {
    event.preventDefault();
    const term = searchInputRef.current.value;

    if (!term) {
      return;
    }
    // console.log(term)
    router.push(`/search?term=${term}`);

    searchInputRef.current.value = term;
  }

  const searchSortByDate = (event) => {
    event.preventDefault();

    const term = searchInputRef.current.value;

    if (!term) {
      return;
    }
    router.push(`/search?term=${term}&sort=date`);

    searchInputRef.current.value = term;
  }

  const submitContact = async (event) => {
    // console.log(event)
    if (event) {
      event.preventDefault();
      search(event)
    }
  };


  return (
    <header className="header sticky top-0 bg-white border-b border-secondary-200">
      <div className="p-3">
        <div
          className="logo-container mb-3"
        >
          <Image 
            loading="lazy"
            src="/logo-weedpedia-color.svg" 
            className="logo"
            layout="fill"
            onClick={()=>router.push("/")}
            className="logo cursor-pointer"
          />
        </div>
        <form onSubmit={submitContact} className="flex flex-grow px-6 py-3 -mb-10 mx-auto shadow-md bg-white border border-secondary-200 rounded-full max-w-3xl items-center">
          <input className="flex-grow bg-transparent w-full focus:outline-none" ref={searchInputRef} defaultValue={router.query.term} type="text" />
          <XIcon 
          className="h-6 mx-2 inline-block text-secondary-500 cursor-pointer transition duration-100 hover:text-primary-600"
          onClick={() => searchInputRef.current.value=""}
          />
          <SearchIcon onClick={(event)=>{search(event)}} className="h-6 text-secondary-500 -mr-1 inline-block cursor-pointer hover:text-primary-600"/>
        </form>
      </div>

      {/* Options */}
      {/* <HeaderOptions searchByDate={searchSortByDate} regularSearch={search}/> */}
    </header>
  )
}

export default Header
