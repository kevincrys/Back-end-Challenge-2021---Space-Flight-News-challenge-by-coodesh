const axios= require ('axios')

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
for(let i=0;i<ultimaAtt;i++){
for(let j=0;j<3;j++){
try{
    var dados= await axios.get('https://api.spaceflightnewsapi.net/v3/articles/'+i);

    console.log(dados.data);
    break;
    }
catch (error) {

}
}
}



return dados;
}


module.exports= Extract();
