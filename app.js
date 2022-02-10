var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var articleRouter = require('./routes/articles');
var bodyParser = require('body-parser')


//rotina cron para coletar os dados recente e armazenar no banco de dados
var CronJob = require('cron').CronJob;
const job = new CronJob('0 0 9 * * *', () => {
var Extract= require ('./Extractdiario')
}, null, true, 'America/Sao_Paulo')
job.start();



console.log("Carregando paginas")

//coleta e armazenar todos os artigos no banco de dados
//const Extract= require ('./Extract')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//definição de rotas
app.use('/', indexRouter);
app.use('/articles', articleRouter);



app.listen(3000, function(){});
