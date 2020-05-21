var displayName          = document.getElementById('displayName');

var emailInput           = document.getElementById('emailInput');
var passwordInput        = document.getElementById('passwordInput');

var btnLogin            = document.getElementById('btnLogin');
var globalResult = null;

btnLogin.addEventListener('click', function(){
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            
            
            globalResult = JSON.stringify(result);
            localStorage.setItem("login", globalResult); //armazena no navegador
            console.log(globalResult);
            
            displayName.innerText = 'Bem vindo, ' +  emailInput.value;
            alert('Bem vindo ' +  emailInput.value);
            window.location.href = 'dashboard.html';

            // dados 
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('erro ao auth!' + errorMessage + ' - ' + errorCode);
        });
});