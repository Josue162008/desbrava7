function desbrava(){
    const nome = document.getElementById('nome');
    const senha = document.getElementById('senha');
    if(localStorage.getItem('senha_diretor')){
        alert('olá diretor')
    }else{
        alert('ok')
    }
}


window.onload(document.title = localStorage.getItem('clube'));