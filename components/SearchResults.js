import PaginationButtons from './PaginationButtons';

function SearchResults({ results }) {
  return (
    <div className="mx-auto w-full px-3 sm:pl-[5%] md:pl=[14%] lg:pl-52">
      <p className="text-orange-600 text-md mb-5 mt-3"> About {results.searchInformation?.formattedTotalResults} results ({results.searchInformation?.formattedSearchTime} seconds) </p>
      {results.items?.map((item) => (
        <div key={item.url} className="max-w-xl mb-8">
          <div className="group">
            <a href={item.url} className="text-sm" target="_blank" rel="noreferrer">{item.domain}</a>
            <a href={item.url} target="_blank" rel="noreferrer">
              <h2 className="truncate text-xl text-yellow-500  font-medium group-hover:underline cursor-pointer">
                {item.url}
              </h2>  
            </a>
          </div>
          <p className="line-clamp-2">{item.metatitle}</p>
        </div>
      ))}

      <PaginationButtons />
    </div>
  );
}

export default SearchResults
