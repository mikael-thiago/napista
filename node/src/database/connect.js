const util = require("util");
const mysql = require('mysql');
const config = require('./databaseConfig');

/*
module.exports = new Promise((resolve, reject) => {
    var con = mysql.createConnection(config);

    con.connect(err => {
        if (err) reject(err)

        console.log("Conectou!");
        resolve(con);
    })
});*/

const createConnection = () => {
    var connection = mysql.createConnection(config);

    return {
        query(query, args) {
            return util.promisify(connection.query).call(connection, query, args)
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    }
}

module.exports = createConnection;