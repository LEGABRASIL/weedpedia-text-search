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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
  // let url = `http://localhost:3000/api/search/${encodedPath}?st=${startIndex}`;
  let url = `https://textsearch.weedpedia.io/api/search/${encodedPath}?st=${startIndex}`;
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