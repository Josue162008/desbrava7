function darkMode(){
    if (document.body.style.backgroundColor !== 'black') {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        localStorage.setItem('theme', 'light');
    }
}

function applyTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    } else if(theme === 'white'){
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    }
}

window.onload = applyTheme;

function clube(){
    const uniao_clube = document.getElementById('uniao-clube').value;
    const associacao_clube = document.getElementById('associacao-clube').value;
    const regiao_clube = document.getElementById('regiao-clube').value;
    const clube = document.getElementById('clube-clube').value;

    function gerarSenhaAleatoria(tamanho) {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let senha = "";
        for (let i = 0; i < tamanho; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            senha += caracteres[indiceAleatorio];
        }
        return senha;
    }
    
    const tamanhoSenha = 12;
    const senhaGerada = gerarSenhaAleatoria(tamanhoSenha);

    if(!localStorage.getItem('click')){
        localStorage.setItem('click', false)
    }
    
    if(localStorage.getItem('click') === "true"){
        alert('Você já está contido em um clube!');
    }else{
        if(uniao_clube === '0'){
            alert('Defina uma União!');
        }else if(associacao_clube === ''){
            alert('Defina a Associação de seu clube!');
        }else if(regiao_clube === ''){
            alert('Defina a Região de seu clube!')
        }else if(clube === ''){
            alert('Defina o seu clube!')
        }else if(uniao_clube !== '0' && associacao_clube !== '' && regiao_clube !== '' && clube !== ''){
            JSON.stringify(localStorage.setItem('uniao', uniao_clube));
            JSON.stringify(localStorage.setItem('associacao', associacao_clube));
            JSON.stringify(localStorage.setItem('regiao', regiao_clube));
            JSON.stringify(localStorage.setItem('clube', clube));
            JSON.stringify(localStorage.setItem('possui', true));
            JSON.stringify(localStorage.setItem('senha_diretor', senhaGerada));
            JSON.stringify(localStorage.setItem('click', "true"));
            alert(`Salve essa senha imediatamente: ${localStorage.getItem('senha_diretor')}`);

            const dados = {
                uniao_clube,
                associacao_clube,
                regiao_clube,
                clube,
                senha_diretor: senhaGerada
            };

            fetch('/adicionar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.text();
            })
            .then(data => {
                alert(data);
            })
            .catch(error => {
                alert(error.message);
            });
        }else{
            alert('Preencha Tudo!')
        }
    }
}

function desbrava(){
    if(localStorage.getItem('possui', true)){
        window.location = '/app'
    }else{
        alert('Você não está em um clube!')
    }
}
