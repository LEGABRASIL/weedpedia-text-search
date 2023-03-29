import HeaderOption from './HeaderOption';
import { SearchIcon, FolderOpenIcon } from '@heroicons/react/outline';

function HeaderOptions(props) {
  return (
    <div className="flex w-full text-orange-700 justify-evenly text-sm lg:text-base lg:justify-start lg:space-x-36 lg:pl-52 border-b">
      <div className="flex space-x-6">
        <HeaderOption Icon={SearchIcon} title="Busca pela URL" selected method={props.regularSearch}/>
        {/*<HeaderOption Icon={FolderOpenIcon} title="Busca por Metadados" method={props.searchByDate}/>*/}
      </div>
    </div>
  )
}

export default HeaderOptions
