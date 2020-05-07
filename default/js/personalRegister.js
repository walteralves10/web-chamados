var userList             = document.getElementById('userList');

var nameCompletInput     = document.getElementById('nameCompletInput');
var emailInput           = document.getElementById('emailInput');

var passwordInput        = document.getElementById('passwordInput');
var confirmPasswordInput = document.getElementById('confirmPasswordInput');

var btnSubmit            = document.getElementById('btnSubmit');

btnSubmit.addEventListener('click', function(){
    var data = {
        name: nameCompletInput.value,
        email: emailInput.value,
        status: 1
    }

    if(validatePassword(passwordInput.value, confirmPasswordInput.value) 
        && validaEmail(emailInput.value)){

            firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then( function () {
                alert('New user created!');
                createNewPerson(data);
            }).catch(function (error) {
                console.error(error.code);
                console.error(error.massage);
                alert('Falha ao cadastrar !');
            });

        //createUserFirebase(data);
        //createNewPerson(data);
    }
});

// cria novo usuario
/*function createUserFirebase(data){
    var email           = document.getElementById('emailInput').value;
    var password        = document.getElementById('passwordInput').value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then( function (){
            alert('New user created!');
            createNewPerson(data);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.massage);
            alert('Falha ao cadastrar !');
        });
}*/

// Adicionando um json ao banco
function createNewPerson(data){
    return firebase.database().ref().child('person').push(data);
}

//valida inputs de senhas
function validatePassword(pass1, pass2){
    if(pass1 != pass2){
        alert("senhas diferentes");
        return false;
    }
    if (pass1.length < 7 && pass2.length < 7){
        alert("Tamanho da senha invalido (maior que 8 digitos) ! ");
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
        alert("E-mail invalido");
        return false;
    }
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
