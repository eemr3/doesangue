//Configurando o servidor
const express = require('express');
const server = express();

//Configurar o servidor para aprensetar arquivos estáticos
server.use(express.static('public'));

//Habilitar body do formulário
server.use(express.urlencoded({extended: true}));

//Configurando a template engine
const nunjuks = require('nunjucks');
nunjuks.configure('./', {
    express: server,
    noCache: true
})

//Lista de doadores (Vetor ou Array)
const donors=[
    {
        name: 'Emerson Moreira',
        blood: 'AB+'
    },
    {
        name: 'Rosane Moreira',
        blood: 'B-'
    },
    {
        name: 'Tiago Moreira',
        blood: 'A+'
    },
    {
        name: 'Daniel Moreira',
        blood: 'O+'
    }

]

//Configurar a apresentação da página
server.get('/', (req, res) =>{
   return res.render('index.html', {donors});
});

server.post('/', (req, res) =>{
    //Pegar os dados dos input no formulário
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    //Coloco valores dentro do Array
    donors.push({
        name: name,
        blood: blood
    })

    res.redirect('/');
});

//Aqui esta iniciando o servidor e permitindo o acesso na porta 3000
server.listen(3000, ()=>{
    console.log('Iniciei o servidor!')
});
