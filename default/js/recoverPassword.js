// inputs
var emailInput           = document.getElementById('emailInput');
//button
var btnRecover = document.getElementById('btnRecover');

btnRecover.addEventListener('click', function(){

    if (validaEmail(emailInput.value)) {

        newPassword(emailInput);

    }
    
});

function validaEmail(field){
    var usuario = field.substring(0, field.indexOf("@"));
    var dominio = field.substring(field.indexOf("@")+ 1, field.length);
 
    if ((usuario.length >=1) &&
        (dominio.length >=3) && 
        (usuario.search("@")==-1) && 
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) && 
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&      
        (dominio.indexOf(".") >=1)&& 
        (dominio.lastIndexOf(".") < dominio.length - 1)) {

        return true;
    }else{
        
        alert("E-mail invalido");
        return false;
    }
}

function newPassword(emailAddress){
    var auth = firebase.auth();
    
    auth.sendPasswordResetEmail(emailAddress.value).then(function() {
      // Email sent.
      alert("E-mail enviado !");
    }).catch(function(error) {
      // An error happened.
      alert("Erro ao enviar e-mail !");
    });
}