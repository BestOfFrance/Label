const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});

const getAllShops = (request, response) => {
  pool.query('SELECT * FROM shops', (err, results) => {
    console.log(err, results.rows)
    if (err) {
      throw err;
    }
    response.status(200).json(results.rows)
   
})
}

module.exports = {getAllShops}