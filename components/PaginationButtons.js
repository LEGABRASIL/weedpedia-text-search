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
    <div className="flex max-w-lg justify-between text-yellow-500 mb-10">
      {startIndex >=25 && (
        <Link href={`/search?term=${router.query.term}&start=${startIndex - 25}&sort=${sort}`}>
          <div className='flex flex-grow flex-col items-center cursor-pointer hover:underline'>
            <ChevronLeftIcon className="h-5"/>
            <p className='text-orange-700'>Previous</p>
          </div>
        </Link>
      )}
      <Link href={`/search?term=${router.query.term}&start=${startIndex + 25}&sort=${sort}`}>
        <div className='flex flex-grow flex-col items-center cursor-pointer hover:underline' >
          <ChevronRightIcon className="h-5"/>
          <p className='text-orange-700'>Next</p>
        </div>
      </Link>
    </div>
  )
}

export default PaginationButtons
