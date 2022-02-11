var express = require('express');
var router = express.Router();
const dbsql = require("../bd/dbsql");
var bodyParser = require('body-parser')

router.get('/', (req, res) => {
  //necessário receber o parametro limit via url para a paginação,
  //se não começa pelo limite de 10 itens por padrão
  var limit;

  if(req.query.limit==undefined||isNaN(parseInt(req.query.limit))){
  limit=10
  }
  else{
    limit=parseInt(req.query.limit)
  }

  //necessário receber o parametro pag via url para a paginação,
  //se não começa pela pagina 0 por padrão
  var quant;

  if(req.query.pag==undefined||isNaN(parseInt(req.query.pag))){
  quant=0
  }
  else{
    quant=req.query.pag*limit
  }
  //calcula quais itens vão aparecer

//verifica pagina anterior
  if(quant>0){
  var pagPrev=
  {
    pag:(quant/limit)-1,
    limit:limit
  }
}

  var sqlp = dbsql.selectArticles();
//consulta sql
  sqlp.then(sql => {
    var tam=sql.length;

//verifica pag posterior
  if(quant<sql.length-limit){
    var pagNext=
    {
      pag:(quant/limit)+1,
      limit:limit
    }
  }

  //verifica se passou do limite de paginas
    if(quant>sql.length){res.send("Página total excedida")}
    else{
    var articles=[];
    var count=0;
    //percorre o array de resultados parametrizando
    for (var i=quant;i<quant+limit;i++)
    {
    var featured;
    if(sql[i] != undefined){
    if(sql[i].featured==0){featured=false}
    else{featured=true}
    articles[count]=
    {
          id: sql[i].id,
          featured: featured,
          title: sql[i].title,
          url: sql[i].url,
          imageUrl: sql[i].imageUrl,
          newsSite: sql[i].newsSite,
          summary: sql[i].summary,
          publishedAt: sql[i].publishedAt,
          launches:[
            {
              id:sql[i].launches_id,
              provider:sql[i].launches_provider
            }
          ],
          events:[
            {
                  id:sql[i].events_id,
                  provider:sql[i].events_provider
              }
          ]
      }

      count++
    }
}
//envia resultado
  res.send({pagNext,pagPrev,articles})
  }
  })

});






router.get('/:id', (req, res) => {
  //puxa do banco de dados o artigo de id correspondente
  var sqlp = dbsql.selectArticlesById(req.params.id);
  sqlp.then(sql => {
    var featured;
    if(sql[0] != undefined){
    if(sql[0].featured==0){featured=false}
    else{featured=true}

      //envia o resultado  parametrizando
    res.send(
    {
          id: sql[0].id,
          featured: featured,
          title: sql[0].title,
          url: sql[0].url,
          imageUrl: sql[0].imageUrl,
          newsSite: sql[0].newsSite,
          summary: sql[0].summary,
          publishedAt: sql[0].publishedAt,
          launches:[
            {
              id:sql[0].launches_id,
              provider:sql[0].launches_provider
            }
          ],
          events:[
            {
                  id:sql[0].events_id,
                  provider:sql[0].events_provider
              }
          ]
      }
    )
}
else{res.send("artigo não encontrado")}
  })

  });

  router.post('/', (req, res) => {
      //cria um novo artigo na base de dados com os dados passados via form
    var inserta = dbsql.insertArticle({id:req.body.id , featured:req.body.featured , title:req.body.title ,url:req.body.url ,imageUrl:req.body.imageUrl ,newsSite:req.body.newsSite ,summary:req.body.summary ,publishedAt:req.body.publishedAt ,launches_ID:req.body.launches_id ,launches_provider:req.body.launches_provider ,events_id:req.body.events_id ,events_provider:req.body.events_provider });
        res.status(200);

        res.send("artigo inserido com sucesso");
    });
  router.put('/:id', (req, res) => {
        //atualiza um artigo na base de dados com os dados passados via form
      var update = dbsql.updateArticlesById(req.body.id,{ featured:req.body.featured , title:req.body.title ,url:req.body.url ,imageUrl:req.body.imageUrl ,newsSite:req.body.newsSite ,summary:req.body.summary ,publishedAt:req.body.publishedAt ,launches_ID:req.body.launches_id ,launches_provider:req.body.launches_provider ,events_id:req.body.events_id ,events_provider:req.body.events_provider });
          res.status(200);
          res.send("Put com id");
      });
  router.delete('/:id', (req, res) => {
          //deleta um artigo da base de dados de acordo com o id
      var del=dbsql.deleteArticlesById(req.params.id);
              res.status(200);
              res.send("artigo de numero " +req.params.id+ " deletado com sucesso");
          });


module.exports = router;
