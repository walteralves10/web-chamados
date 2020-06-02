//button
var btnSair = document.getElementById('btnSair');
//div
var divList = document.getElementById('divList');
var listPendentes = document.getElementById('list-pendentes');
//a
var listSair = document.getElementById('listSair');

var myLatLng = {lat: 0, lng: 0};
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 17
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
}

function markerMap(){
    map.innerHTML = '';
    map = null;

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 17
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
}

btnSair.addEventListener('click', function(){
    //alert('teste');
    
    signOut();
});

listSair.addEventListener('click', function(){
    signOut();
});

function signOut(){
    firebase
    .auth()
    .signOut()
    .then( function () {
        alert('Você se deslogou');
        window.location.href = 'index.html';
    }, function (error){
        console.error(error);
    });
}

function clickItemPendentes(item){
    //alert(item);
    //console.log(item);
    document.getElementById('description').value = item.description;
    
    searchPerson(item.personId);

    document.getElementById('status').value = item.status;
    /**
     * latitude
     * longitude
     */
}

function renderListPendentes(listsPendentes, pessoas){
    listPendentes.innerHTML = '';
    listsPendentes.forEach(function(item) {
        var button = document.createElement('button');

        button.addEventListener('click', function(event){
            clickItemPendentes(JSON.parse(event.target.getAttribute('data')));
        });

        console.log(pessoas);
        button.setAttribute('class','list-group-item list-group-item-action');
        button.setAttribute('data', JSON.stringify(item));
        button.appendChild(document.createTextNode(item.val().description));
        listPendentes.appendChild(button);
    });
}

function searchPerson(idPerson){
    firebase.database().ref('person/' + idPerson)/*.child('urgency')*/.on('value', function(snapshot) {
        //alert('lista');
        addLatLog(JSON.parse(JSON.stringify(snapshot)));
    });
}

function addLatLog(person){
    myLatLng = {
        lat: Number(person.latitude), 
        lng: Number(person.longitude)
    };

    initMap();
}

/* Listar urgencys do banco atraves de um snapshot*/
    firebase.database().ref('urgency/').on('value', function(snapshot) {
        renderListPendentes(snapshot, JSON.parse(localStorage.getItem("login")));
    });

    /*
            snapshot.forEach(function(item) {
            
        });
            var button = document.createElement('button');
            button.appendChild(document.createTextNode(item.val().email + ': ' + item.val().name));
            userList.appendChild(button);*/