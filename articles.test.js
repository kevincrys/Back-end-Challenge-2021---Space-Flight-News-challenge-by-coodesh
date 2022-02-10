const axios= require ('axios')

//teste da rota com o servidor rodando
test('rota1', async () => {

    const dados =  await axios.get('http://localhost:3000/articles');
    expect(dados.data.articles[0].id).toBe(1);



});
test('rota2', async () => {

    const dados =  await axios.get('http://localhost:3000/articles/4');
    expect(dados.data.id).toBe(4);



});
