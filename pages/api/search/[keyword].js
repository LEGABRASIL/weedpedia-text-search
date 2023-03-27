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

const count = async (keyword) => {
  return new Promise(resolve => {
    let sql = `SELECT count(*) FROM url_cannamatches WHERE raw_url LIKE '%${keyword}%'`
    pool.query(sql, (error, results) => {
      if (error) {
        //
        console.log(error)
      }
      // console.log(results)
      resolve(results)
    })
  });
}

const getByURL = async (request, response, keyword, st) => {
  const start = performance.now()

  let totalCountObj = await count(keyword);
  let totalCount = totalCountObj.rows[0].count
  // console.log(totalCount)
  // console.log(`totalCount=[${totalCount}]`)
  let sql = `SELECT domain, url, tld, country, metatype, metatitle, metapublished_time 
  FROM url_cannamatches WHERE raw_url LIKE '%${keyword}%' ORDER BY lastcrawledon DESC
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
  const { keyword } = req.query
  const start = req.query.st
  if(!keyword) {
      return response.status(400).json(`badrequest`)
  }
  console.log(`keyword=[${keyword}]-start=[${start}]`)
  return getByURL(req, res, keyword.toLowerCase(), start)
}
