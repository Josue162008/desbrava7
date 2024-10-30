window.onload(document.title = localStorage.getItem('clube'));

function desbrava(){
    const nome = document.getElementById('nome');
    const senha = document.getElementById('senha');
    if(senha === localStorage.getItem('senha_diretor', )){
        alert('olá diretor')
    }else{
        alert('ok')
    }
}