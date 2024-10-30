function login(){
    var nome = document.querySelector('#nome').value;
    var senha = document.querySelector("#senha").value;

    if(nome === "admin" && senha === "desbravador123"){
        window.location = "public/src/admin.html"
    }else{
        window.location = 'public/src/index.html'
    }
}