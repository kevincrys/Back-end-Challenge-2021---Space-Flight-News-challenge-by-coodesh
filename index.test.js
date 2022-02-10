const axios= require ('axios')

//teste da rota com o servidor rodando
test('testando index', async () => {

    const dados =  await axios.get('http://localhost:3000/');
    expect(dados.data).not.toBe("");



});
