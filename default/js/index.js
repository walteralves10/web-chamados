var displayName          = document.getElementById('displayName');

var emailInput           = document.getElementById('emailInput');
var passwordInput        = document.getElementById('passwordInput');

var btnLogin            = document.getElementById('btnLogin');
var arrayLogin = [];

btnLogin.addEventListener('click', function(){
    /**
                validaUsuario();

                displayName.innerText = 'Bem vindo, ' +  emailInput.value;
                alert('Bem vindo ' +  emailInput.value);
                window.location.href = 'dashboard.html';

     */
    signIn();
    validaUsuario();
});

function signIn(){

    firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function (result) {
        
        displayName.innerText = 'Bem vindo, ' +  emailInput.value;
        alert('Bem vindo ' +  emailInput.value);

        // dados 
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('erro ao auth!' + errorMessage + ' - ' + errorCode);
    });
}

function returnStatus(email){
    console.log(email);

    firebase.database().ref('person/').once('value').then(function(snapshot){
        snapshot.forEach(function(item) {
            console.log(JSON.stringify(item));

            if(email == item.val().email){

                arrayLogin.push(item.val().email);
                arrayLogin.push(item.val().status);

                console.log(arrayLogin);
                localStorage.setItem("login", arrayLogin);
            }
            
        });
    });
    
    //return arrayLogin;
}

function validaUsuario(){

    var user = firebase.auth().currentUser;
    if (user != null) {
        user.providerData.forEach(function (profile) {
            console.log("meu cu true da true");
            returnStatus(profile.email);

        });
    }else {
       console.log("meu cu");
    }
}