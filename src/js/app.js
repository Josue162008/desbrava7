function login(){
    const senha_digitada = document.getElementById('senha').value;

    const dados = {
        senha_digitada
    };

    fetch('/verificar-senha', {
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
        window.location.href = '/diretor';
    })
    .catch(error => {
        alert(error.message);
    });
}


window.onload(document.title = localStorage.getItem('clube'));