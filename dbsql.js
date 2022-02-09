async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://bq12ypsqu80imq2k:be57fe3ry2j8v7my@vkh7buea61avxg07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/sutegx7qrlpqgpcs");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = {}
