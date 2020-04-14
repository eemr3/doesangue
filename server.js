//Configurando o servidor
const express = require('express');
const server = express();

//Configurar o servidor para aprensetar arquivos estáticos
server.use(express.static('public'));

//Habilitar body do formulário
server.use(express.urlencoded({extended: true}));

//Configurar a conexão com o banco de dados
const Pool = require('pg').Pool;
const db = new Pool({
    user:'postgres',
    password: 'damep9219',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});

//Configurando a template engine
const nunjuks = require('nunjucks');
nunjuks.configure('./', {
    express: server,
    noCache: true
})

//Configurar a apresentação da página
server.get('/', (req, res) =>{
    db.query("SELECT * FROM donors", (err, result) =>{
        if(err) return res.send('Erro de banco de dados.');
        
        const donors = result.rows; 
        return res.render('index.html', {donors});
    })
});

server.post('/', (req, res) =>{
    //Pegar os dados dos input no formulário
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;
    
    if(name == "" || email == "" || blood == ""){
        return res.send('Todos os campos são obrigatório');        
    }

    //Coloco valores dentro do banco de dados
    const query = `
    INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`;
    const values = [name, email, blood];

    db.query(query, values, (err) =>{
        if(err){
            return res.send('erro no banco de dados');
        }
        
        return res.redirect('/');
    });

});

//Aqui esta iniciando o servidor e permitindo o acesso na porta 3000
server.listen(3000, ()=>{
    console.log('Iniciei o servidor!')
});
