var userList = document.getElementById('userList');
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');
var btnLogin =document.getElementById('btnLogin');

btnLogin.addEventListener('click', function(){
    create(emailInput.value, passwordInput.value);
});

function create(email, password){
    var data = {
        email: email,
        password: password
    };

    return firebase.database().ref().child('users').push(data);
}

firebase.database().ref('users').on('value', function(snapshot) {
    userList.innerHTML = '';
    snapshot.forEach(function(item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().email + ': ' + item.val().password));
        userList.appendChild(li);
    });
});