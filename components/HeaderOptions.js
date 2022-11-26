import HeaderOption from './HeaderOption';
import { DotsVerticalIcon, MapIcon, NewspaperIcon, PhotographIcon, PlayIcon, SearchIcon } from '@heroicons/react/outline';

function HeaderOptions(props) {
  return (
    <div className="flex w-full text-gray-700 justify-evenly text-sm lg:text-base lg:justify-start lg:space-x-36 lg:pl-52 border-b">
      <div className="flex space-x-6">
        <HeaderOption Icon={SearchIcon} title="Busca normal" selected method={props.regularSearch}/>
        <HeaderOption Icon={PhotographIcon} title="Data decrescente" method={props.searchByDate}/>
      </div>
    </div>
  )
}

export default HeaderOptions
