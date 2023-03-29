import Link from 'next/link';
import { useRouter } from "next/router"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

function PaginationButtons() {
  const router = useRouter();
  // console.log(router.query)
  let sort = 'default';
  if('date' == router.query.sort){
    sort = 'date'
  }
  const startIndex = Number(router.query.start) || 0;
  return (
    <div className="flex justify-between px-6 my-12">
      {startIndex >=25 && (
        <Link 
          className="btn"
          href={`/search?term=${router.query.term}&start=${startIndex - 25}&sort=${sort}`}
        >
          <div 
            className="btn primary cursor-pointer hover:underline" 
          >
            <ChevronLeftIcon className="h-4 icon left"/>
            <p className=''>Previous</p>
          </div>
        </Link>
      )}
      <Link 
        href={`/search?term=${router.query.term}&start=${startIndex + 25}&sort=${sort}`}
      >
        <div 
          className="btn primary flex items-center cursor-pointer" 
        >
          <p className=''>Next</p>
          <ChevronRightIcon className="h-4 icon right"/>
        </div>
      </Link>
    </div>
  )
}

export default PaginationButtons
