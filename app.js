var express = require('express');
var app = express();
console.log("Carregando paginas")
const dados2 =  require('./Transform');
const Extract= require ('./Extract')

app.get('/', (req, res) => {
      res.status(200);
      res.send("RESPOSTA TEXTO");
  });



app.listen(3000, function(){});
