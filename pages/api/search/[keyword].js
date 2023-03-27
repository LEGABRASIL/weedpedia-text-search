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

const getByURL = (request, response, keyword) => {
  const start = performance.now()
  console.time("getByURL");
  pool.query(`SELECT domain, url, tld, country, metatype, metatitle, metapublished_time FROM url_cannamatches WHERE raw_url LIKE '%${keyword}%'`, (error, results) => {
    if (error) {
      throw error
    }
    const end = performance.now()
    let json = {}
    json.searchInformation = {}
    json.searchInformation.formattedTotalResults = results.rows.length
    json.searchInformation.formattedSearchTime = millisToMinutesAndSeconds(end - start)
    json.items = results.rows
    response.status(200).json(json)
  })
}

export default (req, res) => {
  const { keyword } = req.query
  return getByURL(req, res, keyword)
  // res.status(200).json({ name: 'John Doe' })
}
