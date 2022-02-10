var express = require('express');
var router = express.Router();
const dbsql = require("../bd/dbsql");
var bodyParser = require('body-parser')

router.get('/', (req, res) => {
  var sqlp = dbsql.selectArticles();
  sqlp.then(sql => {
      res.send(sql)

  })
  });





router.get('/:id', (req, res) => {

  var sqlp = dbsql.selectArticlesById(req.params.id);
  sqlp.then(sql => {
      res.send(sql)

  })
  });

  router.post('/', (req, res) => {
    var inserta = dbsql.insertArticle({id:req.body.id , featured:req.body.featured , title:req.body.title ,url:req.body.url ,imageUrl:req.body.imageUrl ,newsSite:req.body.newsSite ,summary:req.body.summary ,publishedAt:req.body.publishedAt ,launches_ID:req.body.launches_id ,launches_provider:req.body.launches_provider ,events_id:req.body.events_id ,events_provider:req.body.events_provider });
        res.status(200);

        res.send("artigo inserido com sucesso");
    });
  router.put('/:id', (req, res) => {
      var update = dbsql.updateArticlesById(req.body.id,{ featured:req.body.featured , title:req.body.title ,url:req.body.url ,imageUrl:req.body.imageUrl ,newsSite:req.body.newsSite ,summary:req.body.summary ,publishedAt:req.body.publishedAt ,launches_ID:req.body.launches_id ,launches_provider:req.body.launches_provider ,events_id:req.body.events_id ,events_provider:req.body.events_provider });
          res.status(200);
          res.send("Put com id");
      });
  router.delete('/:id', (req, res) => {
      var del=dbsql.deleteArticlesById(req.params.id);
              res.status(200);
              res.send("artigo de numero " +req.params.id+ " deletado com sucesso");
          });


module.exports = router;
