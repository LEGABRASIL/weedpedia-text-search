function HeaderOption({ Icon, title, selected, method }) {
  return (
    <div className={`flex items-center space-x-1 border-b-4 border-transparent hover:text-blue-500 hover:border-blue-500 pb-3 cursor-pointer ${selected && 'text-blue-500 border-blue-500'}`}>
      <Icon className="h-4" />
      <a className="hidden sm:inline-flex" onClick={(event)=>{method.searchByDate(event)}} >{title}</a>
    </div>
  )
}

export default HeaderOption
