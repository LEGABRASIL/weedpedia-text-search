// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const config = {
    host: 'weedpedia-prod-postgres-do-user-13240977-0.b.db.ondigitalocean.com',
    port: '25061',
    database: 'weedpedia-prod-db-pool',
    user: 'cannacrawler',
    password: 'AVNS_Vj8UGDThkcARXvghO7J',
    connectionTimeoutMillis: 5000
};

const fs = require('fs')
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./certs/weedpedia-prod-postgres.crt').toString()
  },
  port: config.port,
})

const formatSeconds = (number) => {
    return Number.parseFloat(Math.ceil(number)).toFixed(2)
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const count = async (query) => {
  return new Promise(resolve => {
    pool.query(query, (error, results) => {
      if (error) {
        //
        console.log(error)
      }
      // console.log(results)
      resolve(results)
    })
  });
}

const getWords = (str) => {
    return str.split(/\s+/).slice(0, 10).join(" ");
}

const getFirstOperator = (array) => {
  if(!array) {
    return null
  }
  if(typeof array === 'string') {
    if(array === 'or' || array === 'and') {
      return array
    } else {
      return null
    }
  }
  const operators = array.filter(element => element == 'or' || element == 'and');
  if(!operators || operators.length === 0) {
    return null
  }
  return operators[0]
}

const removeKnownOperators = (array) => {
  if(!array){
    return null
  }
  if(typeof array === 'string') {
    return array
  }
  if(typeof array === 'object') {
    return Object.values(array).filter(element => element != 'or' && element != 'and')
  }
  return array.filter(element => element != 'or' && element != 'and')
}


/**
==== algorithm

split per ' '


if one
  than query one keyword

if more
  if only two
    if NO operator
      'keywordOne' or 'keywordTwo'
    if OPERATOR
      'keywordOnly'
  if more than two
    if no operaator
      'keywordOne' or 'keywordTwo'
    if operator
      get first operator
        'keywordOne' OPERATOR 'keywordTwo'
 * 
 * */
const queryBuilder = (searchQuery, st) => {
  if(!searchQuery) {
    return null
  }
  let words;
  if(searchQuery.indexOf(' ') > 0) {
    words = getWords(searchQuery).split(' ')
  } else {
    words = [0]
    words[0] = searchQuery
  }
  if(!words || words.length === 0) {
    return null
  }
  let cleanedKeywords = removeKnownOperators(words)
  if(cleanedKeywords.indexOf(' ') > 0) {
    cleanedKeywords = cleanedKeywords.split(' ')
  }
  if(!cleanedKeywords || cleanedKeywords.length === 0) {
    return null
  }
  const operator = getFirstOperator(words)
  const count = cleanedKeywords.length

  console.log(`words=[${words}]--cleanedKeywords=[${cleanedKeywords}]--operator=[${operator}]--count=[${count}]`)

  let sql;
  let countQuery;
  if (count === 1) {

      sql = `SELECT domain, url, tld, country, metatype, metatitle, metapublished_time 
  FROM url_cannamatches WHERE raw_url LIKE '%${cleanedKeywords[0]}%' ORDER BY lastcrawledon DESC
  OFFSET ${st} LIMIT 25
  `
      countQuery = `SELECT count(*) FROM url_cannamatches WHERE raw_url LIKE '%${cleanedKeywords[0]}%'`
  } else if(count === 2 && !operator || count > 2 && !operator) {

      sql = `SELECT domain, url, tld, country, metatype, metatitle, metapublished_time 
  FROM url_cannamatches WHERE raw_url LIKE '%${cleanedKeywords[0]}%' OR raw_url LIKE '%${cleanedKeywords[1]}%' ORDER BY lastcrawledon DESC
  OFFSET ${st} LIMIT 25
  `
      countQuery = `SELECT count(*) FROM url_cannamatches WHERE raw_url LIKE '%${cleanedKeywords[0]}%' OR raw_url LIKE '%${cleanedKeywords[1]}%'`

  } else if(count === 2 && operator || count > 2 && operator) {

      sql = `SELECT domain, url, tld, country, metatype, metatitle, metapublished_time 
  FROM url_cannamatches WHERE raw_url LIKE '%${cleanedKeywords[0]}%' ${operator} raw_url LIKE '%${cleanedKeywords[1]}%' ORDER BY lastcrawledon DESC
  OFFSET ${st} LIMIT 25
  `
      countQuery = `SELECT count(*) FROM url_cannamatches WHERE raw_url LIKE '%${cleanedKeywords[0]}%' ${operator} raw_url LIKE '%${cleanedKeywords[1]}%'`

  }
  return [sql, countQuery]
}

const getByURL = async (request, response, searchQuery, st) => {
  const start = performance.now()

  let queries = queryBuilder(searchQuery, st)
  let totalCountObj = await count(queries[1]);
  let totalCount = totalCountObj.rows[0].count
  // console.log(totalCount)
  // console.log(`totalCount=[${totalCount}]`)
  let sql = queries[0]
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    console.log(`totalCount=[${totalCount}]---resultsNumber=[${results.rows.length}]`)
    const end = performance.now()
    let json = {}
    json.searchInformation = {}
    json.searchInformation.formattedTotalResults = totalCount
    json.searchInformation.formattedSearchTime = millisToMinutesAndSeconds(end - start)
    json.items = results.rows
    response.status(200).json(json)
  })
}

const getByURLOld = async (request, response, searchQuery, st) => {
  const start = performance.now()

  let totalCountObj = await count(searchQuery);
  let totalCount = totalCountObj.rows[0].count
  // console.log(totalCount)
  // console.log(`totalCount=[${totalCount}]`)
  let sql = `SELECT domain, url, tld, country, metatype, metatitle, metapublished_time 
  FROM url_cannamatches WHERE raw_url LIKE '%${searchQuery}%' ORDER BY lastcrawledon DESC
  OFFSET ${st} LIMIT 25
  `
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    console.log(`totalCount=[${totalCount}]---resultsNumber=[${results.rows.length}]`)
    const end = performance.now()
    let json = {}
    json.searchInformation = {}
    json.searchInformation.formattedTotalResults = totalCount
    json.searchInformation.formattedSearchTime = millisToMinutesAndSeconds(end - start)
    json.items = results.rows
    response.status(200).json(json)
  })
}

export default (req, res) => {
  let { keyword } = req.query
  const start = req.query.st
  if(!keyword) {
      return res.status(400).json(`badrequest`)
  }
  keyword = keyword.toLowerCase()
  console.log(`keyword=[${keyword}]-start=[${start}]`)
  return getByURL(req, res, keyword, start)
}
