const { Pool, Client} = require('pg');

const connectionString = 'postgressql://raymond:12345@localhost:5432/lighthouse'
const client = new Client({
    connectionString: connectionString
})



function insert(a) {
    client.connect()
    client.query("$a", [a], (err, row) => {
        console.log(row.rows)
        client.end()
    })
}

