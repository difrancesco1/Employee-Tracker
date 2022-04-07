const mysql = require('mysql2');


let connection = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'Idontgive3ducks!',
        database: 'tracker'
    },
    console.log('Connected to the tracker database')
);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runSearch();
});

module.exports = connection;