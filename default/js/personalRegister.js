var userList             = document.getElementById('userList');

var nameCompletInput       = document.getElementById('NameCompletInput');
var emailInput           = document.getElementById('emailInput');

var passwordInput        = document.getElementById('passwordInput');
var confirmPasswordInput = document.getElementById('confirmPasswordInput');

var btnSubmit            = document.getElementById('btnSubmit');

btnSubmit.addEventListener('click', function(){

    create(nameCompletInput.value, emailInput.value);
});

// Adicionando um json ao banco
function create(name, email){
    var data = {
        name: name,
        email: email
    }
    return firebase.database().ref().child('users').push(data);
}
// Listar users do banco atraves de um snapshot
firebase.database().ref('users').on('value', function(snapshot) {
    userList.innerHTML = '';
    snapshot.forEach(function(item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().email + ': ' + item.val().name));
        userList.appendChild(li);
    });
});
