const Pool = require('pg').Pool
const fs = require('fs')


const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});

const seedQuery = fs.readFileSync('./schema.sql', { encoding: 'utf8' })
    pool.query(seedQuery, (err, res) => {
        console.log(err, res)
        console.log('Seeding Completed!')
        pool.end()
    })

    
    


   
    
