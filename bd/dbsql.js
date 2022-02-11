async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://bq12ypsqu80imq2k:be57fe3ry2j8v7my@vkh7buea61avxg07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/sutegx7qrlpqgpcs");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function selectArticles(id){

    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM articles');
    return rows;

}

async function selectArticlesById(id){

  var sql = 'SELECT * FROM articles WHERE articles.id=?';

    const conn = await connect();
    const [rows] = await conn.query(sql, [id], function(err, rows, fields) {});
    return rows;
}
async function insertArticle(customer){
    const conn = await connect();
    const sql = 'INSERT INTO articles(id,featured,title,url,imageUrl,newsSite,summary,publishedAt,launches_ID,launches_provider,events_id,events_provider) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [customer.id, customer.featured, customer.title, customer.url, customer.imageUrl, customer.newsSite, customer.summary,customer.publishedAt,customer.launches_ID,customer.launches_provider,customer.events_id,customer.events_provider];
    return await conn.query(sql, values);
}

async function updateArticlesById(id, customer){
    const conn = await connect();
    const sql = 'UPDATE articles SET featured=?,title=?,url=?,imageUrl=?,newsSite=?,summary=?,publishedAt=?,launches_ID=?,launches_provider=?,events_id=?,events_provider=? WHERE articles.id=?';
    const values = [ customer.featured, customer.title, customer.url, customer.imageUrl, customer.newsSite, customer.summary,customer.publishedAt,customer.launches_ID,customer.launches_provider,customer.events_id,customer.events_provider,id];
    return await conn.query(sql, values);
}

async function deleteArticlesById(id){

  var sql = 'delete FROM articles WHERE articles.id=?';

    const conn = await connect();
    const [rows] = await conn.query(sql, [id], function(err, rows, fields) {});
    return rows;
}









module.exports = {insertArticle,selectArticlesById,deleteArticlesById,updateArticlesById,selectArticles}
