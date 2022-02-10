var express = require('express');
var app = express();
console.log("Carregando paginas")
const dados2 =  require('./Transform');
const Extract= require ('./Extract')

app.get('/', (req, res) => {
      res.status(200);
      res.send("Back-end Challenge 2021 🏅 - Space Flight News");
  });



app.listen(3000, function(){});
