//button
var btnSair = document.getElementById('btnSair');
//div
var divList = document.getElementById('divList');
var listPendentes = document.getElementById('list-pendentes');
//a
var listSair = document.getElementById('listSair');


btnSair.addEventListener('click', function(){
    //alert('teste');
    
    firebase
        .auth()
        .signOut()
        .then( function () {
            alert('Você se deslogou');
            window.location.href = 'index.html';
        }, function (error){
            console.error(error);
        });
});

listSair.addEventListener('click', function(){
    firebase
    .auth()
    .signOut()
    .then( function () {
        alert('Você se deslogou');
        window.location.href = 'index.html';
    }, function (error){
        console.error(error);
    });
});

function clickItemPendentes(item){
    //alert(item);
    //console.log(item);
    document.getElementById('description').value = item.description;
    //document.getElementById('status').value = item.status;
    /**
     * latitude
     * longitude
     */
}

function renderListPendentes(listsPendentes){
    listPendentes.innerHTML = '';
    listsPendentes.forEach(function(item) {
        var button = document.createElement('button');

        button.addEventListener('click', function(event){
            clickItemPendentes(JSON.parse(event.target.getAttribute('data')));
        });

        button.setAttribute('class','list-group-item list-group-item-action');
        button.setAttribute('data', JSON.stringify(item));
        button.appendChild(document.createTextNode(item.val().description /*+ ' - ' + item.val().infoId*/));
        listPendentes.appendChild(button);
    });
}

/* Listar urgencys do banco atraves de um snapshot*/
    firebase.database().ref('person/'+'T0ZdsAxOlaNJVn4e65qpjUL0Zkf1').child('urgency').on('value', function(snapshot) {
        //alert('lista');
        renderListPendentes(snapshot);
    });

    /*
            snapshot.forEach(function(item) {
            
        });
            var button = document.createElement('button');
            button.appendChild(document.createTextNode(item.val().email + ': ' + item.val().name));
            userList.appendChild(button);*/