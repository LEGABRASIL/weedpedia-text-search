function Footer() {
  return (
    <footer className="grid w-full divide-y-[1px] divide-secondary-300 bg-secondary-700  text-sm text-secondary-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 grid-flow-row-dense px-8 py-3">
        <div className="flex justify-center items-center md:col-span-2 lg:col-span-1 lg:col-start-2">
        <div className="flex justify-center items-center md:col-span-2 lg:col-span-1 lg:col-start-2">
          <p><a href="https://github.com/buscafatos/deno-api#sites-utilizados-na-busca">Como a busca funciona?</a></p>
        </div>
        </div>
        <div className="flex justify-center space-x-8 whitespace-nowrap md:justify-self-start">
          <p><a href="https://buscafatos.com.br">Quem somos?</a></p>
        </div>
        <div className="flex justify-center space-x-8 md:ml-auto">
          <p><a href="https://github.com/buscafatos">Código Fonte</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
