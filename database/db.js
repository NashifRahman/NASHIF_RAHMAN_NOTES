const mysql = require('mysql2/promise')

async function setupDB(){
    try {
        const connection = await mysql.createConnection(
        'mysql://root@localhost:3306/dbnote'
        );
        console.log('database created successfully!')
        return connection
    } catch (err) {
    console.log(err);
    return null
    }
}

module.exports = {setupDB}