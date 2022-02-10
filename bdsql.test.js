const axios= require ('axios')
const dbsql = require("./bd/dbsql");
//teste da rota com o servidor rodando
test('selectArticles', async () => {
jest.setTimeout(20000)
  var sqlp = dbsql.selectArticles();
//consulta sql
  sqlp.then(sql => {
expect(sql[0].id).toBe(1);





});
})
;
test('selectArticlesById', async () => {

  var sqlp = dbsql.selectArticlesById(3)
//consulta sql
  sqlp.then(sql => {
expect(sql[0].id).toBe(3);;

});
})
