const express = require('express');
const path = require('path');
const { parentPort } = require('worker_threads');
const app = express();
const PORT = 3001;
const http = require('http');
const server = new http.createServer(app);

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
    res.sendFile(path.join(__dirname, 'json', 'dados.js'));
});
// -----------------------IMAGENS-----------------------------
app.get('/logo', (req, res)=>{
    res.sendFile(path.join(__dirname,'src', 'img', 'f1df3925ac598980d0110515e4639fd7-removebg-preview.png'));
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/cadastro-login`);
});
