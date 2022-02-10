const axios= require ('axios')
const dbsql = require('./dbsql');

//Extração dos dados da Api
 async function Extract() {
var ultimaAtt =0;

//se falhar tenta mais  2 vezes
  for(let i=0;i<3;i++)
  {
  try{
      var dados= await axios.get('https://api.spaceflightnewsapi.net/v3/articles/');

      ultimaAtt=dados.data[0].id;
      break;
      }
  catch (error) {

  }
}
for(let i=7033;i<ultimaAtt;i++){
for(let j=0;j<2;j++){
try{
    var dados= await axios.get('https://api.spaceflightnewsapi.net/v3/articles/'+i);
    var inserta = dbsql.insertarticle({id:dados.data.id , featured:dados.data.featured , title:dados.data.title ,url:dados.data.url ,imageUrl:dados.data.imageUrl ,newsSite:dados.data.newsSite ,summary:dados.data.summary ,publishedAt:dados.data.publishedAt ,launches_ID:dados.data.launches.id ,launches_provider:dados.data.launches.provider ,events_id:dados.data.events.id ,events_provider:dados.data.events.provider })
    console.log(dados.data.id);
    break;
    }
catch (error) {
console.log("Error");
}
}
}



return dados;
}


module.exports= Extract();
