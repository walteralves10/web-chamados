
//button
var btnSair = document.getElementById('btnSair');
//div
var divList = document.getElementById('divList');

btnSair.addEventListener('click', function(){
    firebase
        .auth()
        .signOut()
        .then( function () {
            alert('Você se deslogou');
        }, function (error){
            console.error(error);
        });
});

/* Listar users do banco atraves de um snapshot
    firebase.database().ref('person').on('value', function(snapshot) {
        userList.innerHTML = '';
        snapshot.forEach(function(item) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(item.val().email + ': ' + item.val().name));
            userList.appendChild(li);
        });
    });*/