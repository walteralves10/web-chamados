//button
var btnSair = document.getElementById('btnSair');
//div
var divList = document.getElementById('divList');
var listPendentes = document.getElementById('list-pendentes');
//a
var listSair = document.getElementById('listSair');


btnSair.addEventListener('click', function(){
    alert('teste');
    
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
        listPendentes.innerHTML = '';
        snapshot.forEach(function(item) {
            var li = document.createElement('button');
            li.appendChild(document.createTextNode(item.val().email + ': ' + item.val().name));
            userList.appendChild(button);
        });
    });*/