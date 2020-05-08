var displayName          = document.getElementById('displayName');

var emailInput           = document.getElementById('emailInput');
var passwordInput        = document.getElementById('passwordInput');

var btnLogin            = document.getElementById('btnLogin');

btnLogin.addEventListener('click', function(){
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            console.log(result);
            displayName.innerText = 'Bem vindo, ' +  emailInput.value;
            alert('Bem vindo ' +  emailInput.value);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('erro ao auth!' + errorMessage + ' - ' + errorCode);
        });
});