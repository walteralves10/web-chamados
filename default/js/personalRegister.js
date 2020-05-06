var userList = document.getElementById('userList');
var firstNameInput = document.getElementById('firstName');
var lastNameInput  = document.getElementById('lastName');
var emailInput     = document.getElementById('emailInput');
//var passwordInput = document.getElementById('passwordInput');
var btnLogin =document.getElementById('btnLogin');

btnLogin.addEventListener('click', function(){
    create(emailInput.value, passwordInput.value);
});

// Adicionando um json ao banco
function create(email, password){
    var data = {
        email: email,
        password: password
    };

    return firebase.database().ref().child('users').push(data);
}
// Listar users do banco atraves de um snapshot
firebase.database().ref('users').on('value', function(snapshot) {
    userList.innerHTML = '';
    snapshot.forEach(function(item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().email + ': ' + item.val().password));
        userList.appendChild(li);
    });
});
