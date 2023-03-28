function HeaderOption({ Icon, title, selected, method }) {
  return (
    <div className={`flex items-center space-x-1 border-b-4 border-transparent hover:text-secondary-500 hover:border-secondary-500 pb-3 cursor-pointer ${selected} && 'text-secondary-500 border-secondary-500'}`}>
      <Icon className="h-4" />
      <a onClick={(event)=>{method(event)}} >{title}</a>
    </div>
  )
}

export default HeaderOption
