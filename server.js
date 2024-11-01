const express = require('express');
const path = require('path');
const { parentPort } = require('worker_threads');
const app = express();
const PORT = 3001;
const http = require('http');
const server = new http.createServer(app);
const fs = require('fs');
app.use(express.json());

app.get('/cadastro-login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/app', (req,res)=>{
    res.sendFile(path.join(__dirname, 'src', 'app.html'));
});
app.get('/diretor', (req, res)=>{
    res.sendFile(path.join(__dirname, 'src', 'diretor.html'))
});
// ----------------------HTML---------------------------------
app.get('/index-css', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.css'));
});
app.get('/app-css', (req, res)=>{
    res.sendFile(path.join(__dirname, 'src', 'app.css'));
});
// ---------------------JAVASCRIPT E JSON-----------------------
app.get('/index-js', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.js'));
});
app.get('/app-js', (req, res)=>{
    res.sendFile(path.join(__dirname, 'src', 'js', 'app.js'));
});
app.get('/database-dados', (req, res)=>{
    res.sendFile(path.join(__dirname, 'json', 'dados.json'));
});
// -----------------------IMAGENS-----------------------------
app.get('/logo', (req, res)=>{
    res.sendFile(path.join(__dirname,'src', 'img', 'f1df3925ac598980d0110515e4639fd7-removebg-preview.png'));
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://192.168.56.1:${PORT}/cadastro-login`);
});
// ------------------------------DATABASE-JSON---------------------
app.post('/adicionar', (req, res) => {
    const { uniao_clube, associacao_clube, regiao_clube, clube, senha_diretor} = req.body;

    fs.readFile('json/dados.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao ler o arquivo');
        }

        const dados = JSON.parse(data);

        const clubeExistente = dados.find(item => 
            item.clube.uniao_clube === uniao_clube &&
            item.clube.associacao_clube === associacao_clube &&
            item.clube.regiao_clube === regiao_clube &&
            item.clube.nome_clube === clube
        );

        if (clubeExistente) {
            return res.status(400).send('Este clube já está cadastrado com as mesmas credenciais.');
        }

        const novoItem = {
            "clube": {
                "id_clube": "",
                "uniao_clube": uniao_clube,
                "associacao_clube": associacao_clube,
                "regiao_clube": regiao_clube,
                "nome_clube": clube,
                "senha_diretor": senha_diretor
            }
        };

        dados.push(novoItem);

        fs.writeFile('json/dados.json', JSON.stringify(dados, null, 4), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao escrever no arquivo');
            }
            res.send('Clube cadastrado com sucesso!');
        });
    });
});

app.post('/verificar-senha', (req, res) => {
    const { senha_digitada } = req.body;

    fs.readFile('json/dados.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao ler o arquivo');
        }

        const clubes = JSON.parse(data);

        const clubeEncontrado = clubes.find(item => item.clube.senha_diretor === senha_digitada);

        if (clubeEncontrado) {
            return res.send('Senha correta!');
        } else {
            return res.status(400).send('Senha não inserida corretamente!');
        }
    });
});