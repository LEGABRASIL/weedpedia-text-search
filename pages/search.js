import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';

function Search({ results }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title> {router.query.term} - Weedpedia BETA </title>
        <link rel="icon" href="/public/logo-weedpedia.png"/>
      </Head>

      {/*  Header */}

      <Header />

      {/* Search Results */}
      <SearchResults results={results} />

    </div>
  )
}

export default Search

export async function getServerSideProps(context) {
  const startIndex = context.query.start || '0';
  const encodedPath = encodeURIComponent(context.query.term);
  let url = `https://textsearch.weedpedia.io/api/search/${encodedPath}`;
  const data = await fetch(url).then(res => res.json()).catch(error => {
    console.error(error)
  });
  // console.log(data)
    
  return {
    props: {
      results: data ? data : null
    }
  }
}