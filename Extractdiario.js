const axios= require ('axios')
const dbsql = require("./bd/dbsql");

//Extração dos dados da Api mais recentes
 async function Extract() {



//se falhar tenta mais  2 vezes
for(let i=0;i<2;i++){
try{
    var dados= await axios.get('https://api.spaceflightnewsapi.net/v3/articles/');
    for(let j=0;j<dados.data.length;j++){
//armazena esses artigos no banco de dados 
    var inserta = dbsql.insertArticle({id:dados.data[j].id , featured:dados.data[j].featured , title:dados.data[j].title ,url:dados.data[j].url ,imageUrl:dados.data[j].imageUrl ,newsSite:dados.data[j].newsSite ,summary:dados.data[j].summary ,publishedAt:dados.data[j].publishedAt ,launches_ID:dados.data[j].launches.id ,launches_provider:dados.data[j].launches.provider ,events_id:dados.data[j].events.id ,events_provider:dados.data[j].events.provider })

    break;
    }
    }
catch (error) {
console.log("Error");
}
}




return dados;
}


module.exports= Extract();
