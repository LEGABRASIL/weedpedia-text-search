import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';

function Search({ results }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title> {router.query.term} - Busca Fatos </title>
        <link rel="icon" href="https://media4.giphy.com/media/h1QX6JsKb6VGsJZGuS/giphy.gif?cid=790b7611abd1d13a284e7133b44819853e7d2c9f6506755b&rid=giphy.gif&ct=s"/>
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
  let url;

  if('date' == context.query.sort) {
    url = `https://busca-fatos.deno.dev/v1/search/${encodedPath}?raw=1&st=${startIndex}&sort=date`;
  } else {
    url = `https://busca-fatos.deno.dev/v1/search/${encodedPath}?raw=1&st=${startIndex}`;
  }

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