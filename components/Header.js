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

  return (
    <header className="header sticky top-0 bg-white ">
      <div className="flex w-full p-6 items-center">
        <Image 
        loading="lazy"
        src="/logo-weedpedia-color.svg" 
        width={410} 
        height={60}
        onClick={()=>router.push("/")}
        className="logo cursor-pointer"
        />
        <form className="flex flex-grow px-6 py-3 ml-10 mr-5 border border-secondary-200 rounded-full shadow-lg max-w-3xl items-center">
          <input className="flex-grow w-full focus:outline-none" ref={searchInputRef} defaultValue={router.query.term} type="text" />
          <XIcon 
          className="h-7 sm:mr-3 text-secondary-500 cursor-pointer transition duration-100 transform hover:scale-125"
          onClick={() => searchInputRef.current.value=""}
          />
          <SearchIcon onClick={(event)=>{search(event)}} className="h-6 text-secondary-500 hidden sm:inline-flex cursor-pointer"/>
          <button hidden type="submit" onClick={(event)=>{search(event)}}/>
        </form>
      </div>

      {/* Options */}
      <HeaderOptions searchByDate={searchSortByDate} regularSearch={search}/>
    </header>
  )
}

export default Header
