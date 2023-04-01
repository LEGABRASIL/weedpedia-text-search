import PaginationButtons from './PaginationButtons';

function SearchResults({ results }) {
  return (
    <div className="mx-auto mt-10 max-md:w-full max-w-3xl max-md:px-3">
      <p className="text-secondary-400 text-center text-caption mb-6"> About {results.searchInformation?.formattedTotalResults} results ({results.searchInformation?.formattedSearchTime} seconds) </p>
      {results.items?.map((item) => (
        <div key={item.url} className="mb-1">
          <div className="result">
            <a href={item.url} className="text-sm text-secondary-500 mb-1" target="_blank" rel="noreferrer">{item.domain}</a>
            <a href={item.url} target="_blank" rel="noreferrer">
              <h2 className="line-clamp-2 text-md font-medium group-hover:underline cursor-pointer">
                {item.url}
              </h2>  
            </a>
            <p className="line-clamp-2 text-secondary-700">{item.metatitle}</p>
          </div>
        </div>
      ))}

      <PaginationButtons />
    </div>
  );
}

export default SearchResults
