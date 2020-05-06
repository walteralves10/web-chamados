var userList             = document.getElementById('userList');

var nameCompletInput     = document.getElementById('nameCompletInput');
var emailInput           = document.getElementById('emailInput');

var passwordInput        = document.getElementById('passwordInput');
var confirmPasswordInput = document.getElementById('confirmPasswordInput');

var btnSubmit            = document.getElementById('btnSubmit');

btnSubmit.addEventListener('click', function(){
    var data = {
        email: emailInput.value,
        name: nameCompletInput.value,
        status: 1
    }
    var auth = {
        email: emailInput.value,
        password: passwordInput.value
    }

    if(validatePassword(passwordInput.value, confirmPasswordInput.value) 
        && validaEmail(emailInput.value)){

        createUserFirebase(auth)
        //createNewPerson(data);
    }else{
        alert('Email invalido ou Senhas diferentes !');
    }
});

// Adicionando um json ao banco
function createNewPerson(data){
    return firebase.database().ref().child('person').push(data);
}

//valida inputs de senhas
function validatePassword(pass1, pass2){
    if(pass1 != pass2){
        return false;
    }
    if (pass1.length < 7 && pass2.length < 7){
        return false;
    }

    return true;
    
}

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

        //document.getElementById("msgemail").innerHTML="E-mail válido";
        //alert("E-mail valido");
        return true;
    }else{
        //document.getElementById("msgemail").innerHTML="<font color='red'>E-mail inválido </font>";
        //alert("E-mail invalido");
        return false;
    }
}

function createUserFirebase(auth){
    firebase
        .auth()
        .createUserWithEmailAndPassword(auth.email, auth.password)
        .catch(function (error) {
            console.error(error.code);
            console.error(error.massage);
            alert('Falha ao cadastrar !');
        });
}
// Listar users do banco atraves de um snapshot
firebase.database().ref('person').on('value', function(snapshot) {
    userList.innerHTML = '';
    snapshot.forEach(function(item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().email + ': ' + item.val().name));
        userList.appendChild(li);
    });
});
