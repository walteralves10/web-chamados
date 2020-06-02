// inputs
var emailInput           = document.getElementById('emailInput');
var passwordInput        = document.getElementById('passwordInput');
var confirmPasswordInput = document.getElementById('confirmPasswordInput');

//button
var btnRecover = document.getElementById('btnRecover');

btnRecover.addEventListener('click', function(){

    if (validatePassword(passwordInput, confirmPasswordInput)) {
        newPassword(passwordInput.value);
    }else {
        alert("Senhas estão diferente !");
    }
    
});

function validatePassword(pass, confirmPass){
    if(pass.value == confirmPass.value){
        return true;
    }else {
        return false;
    }
}

function newPassword(newPassword){
    var user = firebase.auth().currentUser;

    user.updatePassword(newPassword).then(function() {
    // Update successful.
    }).catch(function(error) {
    // An error happened.
    });
}
