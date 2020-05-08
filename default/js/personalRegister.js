//var userList             = document.getElementById('userList');

//inputs
var nameCompletInput     = document.getElementById('nameCompletInput');
var emailInput           = document.getElementById('emailInput');
var passwordInput        = document.getElementById('passwordInput');

//button
var btnSubmit            = document.getElementById('btnSubmit');

// Novo user
btnSubmit.addEventListener('click', function(){
    createUserFirebase();
    createNewPerson();
});

/*cria novo usuario*/ 
function createUserFirebase(){
    firebase
    .auth()
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function(){
        alert('Bem vindo ' +  emailInput.value);
        //return true;
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('erro ao auth!' + errorMessage + errorCode);
        //return false;
    });
}

/*Adicionando um json ao banco*/ 
function createNewPerson(){

    var data = {
        name: nameCompletInput.value,
        email: emailInput.value,
        status: 1
    }

    return firebase.database().ref().child('person').push(data);
}



//valida inputs de senhas
function validatePassword(pass){
    if (pass.length < 5 ){
        alert("Tamanho da senha invalido (maior que 5 digitos) ! ");
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

        return true;
    }else{
        
        alert("E-mail invalido");
        return false;
    }
}

/* Listar users do banco atraves de um snapshot
    firebase.database().ref('person').on('value', function(snapshot) {
        userList.innerHTML = '';
        snapshot.forEach(function(item) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(item.val().email + ': ' + item.val().name));
            userList.appendChild(li);
        });
    });*/
