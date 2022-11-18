function Footer() {
  return (
    <footer className="grid w-full divide-y-[1px] divide-gray-300 bg-gray-100 text-sm text-gray-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 grid-flow-row-dense px-8 py-3">
        <div className="flex justify-center items-center md:col-span-2 lg:col-span-1 lg:col-start-2">
        </div>
        <div className="flex justify-center space-x-8 whitespace-nowrap md:justify-self-start">
          <p><a href="https://buscafatos.com.br">Who are we?</a></p>
          <p><a href="https://github.com/buscafatos/deno-api#sites-searched">How Search works?</a></p>
        </div>
        <div className="flex justify-center space-x-8 md:ml-auto">
          <p><a href="https://github.com/buscafatos">Show me the code!</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
