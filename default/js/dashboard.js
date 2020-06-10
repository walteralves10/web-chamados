//button
var btnSair = document.getElementById('btnSair');
var btnSubmit = document.getElementById('btnSubmit');
//div
var divList = document.getElementById('divList');

var listPendentes = document.getElementById('list-pendentes');
var listPendentesList = document.getElementById('list-pendentes-list');

var buttonAndamento = document.getElementById('list-andamento');
var listAndamentoList = document.getElementById('list-andamento-list');

var buttonPrioridade = document.getElementById('list-prioridade');
var listPrioridadeList = document.getElementById('list-prioridade-list');

var buttonEncerrados = document.getElementById('list-encerrado');
var listEncerradosList = document.getElementById('list-encerrado-list');
//spam
this.SpanContPendentes = document.getElementById('list-pendentes-list-span');
this.SpanContAndamento = document.getElementById('list-andamento-list-span');
this.SpanContPrioridade = document.getElementById('list-prioridade-list-span');
this.SpanContEncerrados = document.getElementById('list-encerrado-list-span');
//a
var listSair = document.getElementById('listSair');

//localização
var myLatLng = {lat: 0, lng: 0};
var map;
var geocoder; 

//event
this.onPersonSearchFinish = new Event('personsearch'); 

sessionLogin();

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 17
    });

    geocoder = new google.maps.Geocoder;

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Estou Aqui!'
    });
}

listPendentesList.addEventListener('click', function(){
    clearDetail()
    getDatabaseUrgency(0);
});
listAndamentoList.addEventListener('click', function(){
    clearDetail()
    getDatabaseUrgency(1);
});
listPrioridadeList.addEventListener('click', function(){
    clearDetail()
    getDatabaseUrgency(2);
});
listEncerradosList.addEventListener('click', function(){
    clearDetail()
    getDatabaseUrgency(3);
});

btnSubmit.addEventListener('click', function(){ //da update do item no firbase 
    this.valueButton = JSON.parse(sessionStorage.getItem("item"));
    this.valueButton.medicalInfo = document.getElementById('medicalInfo').value;
    this.valueButton.description = document.getElementById('description').innerHTML;
    this.valueButton.status = Number(document.getElementById('status').value);
    updateFirebase(this.valueButton);
    clearDetail();
});
btnSair.addEventListener('click', function(){
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
        //alert('Você se deslogou');
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = 'index.html';
    }, function (error){
        console.error(error);
    });
}

function clickItem(item){
    clearDetail();

    this.buttonValue = item;

    document.getElementById('date').innerHTML = item.dataPedido + " - " + item.horaPedido;

    document.getElementById('description').innerHTML = item.description;

    searchPerson(item.personId);

    if(! (item.picture == null)){
        uploadImg(item.picture);
    }
    if(!(item.video == null)){
        uploadVideo(item.video);
    }

    document.getElementById('status').value = item.status;
    
    document.getElementById('medicalInfo').value = item.medicalInfo;

    sessionStorage.setItem("item", JSON.stringify(this.buttonValue));

}

function uploadVideo(urlVideo){
    var httpsReference = firebase.storage().refFromURL(urlVideo);
    
    httpsReference.getDownloadURL().then(function(url) {
        var video = document.getElementById('video');
        video.src = url;
      }).catch(function(error) {
        // Handle any errors
      });
}

function uploadImg(urlImg){
    var httpsReference = firebase.storage().refFromURL(urlImg);
    
    httpsReference.getDownloadURL().then(function(url) {
        var img = document.getElementById('img');
        img.src = url;
      }).catch(function(error) {
        // Handle any errors
      });
}

function updateFirebase(valueButton){
    firebase.database().ref('urgency/').child(valueButton.infoId).update(valueButton);
}

function clearDetail(){
    document.getElementById('date').innerHTML = "";

    document.getElementById('medicalInfo').value = "";

    document.getElementById('person').innerHTML = "";

    document.getElementById('address').innerHTML = "";

    document.getElementById('description').innerHTML = "";

    var iframe = document.getElementById('video');
    iframe.src = '';

    var img = document.getElementById('img');
    img.src = '';
}

function renderListPendentes(listsPendentes, status){
    listPendentes.innerHTML = '';
    let i = 0;
    listsPendentes.forEach(function(item) {

        var button = document.createElement('button');

        button.addEventListener('click', function(event){
            clickItem(JSON.parse(event.target.getAttribute('data')));
        });

        //console.log(status + item.val().samu);
        //i++;
        firebase.database().ref('person/').child(item.val().personId).once('value').then(function(snapshot){
            if (status == 1 && item.val().samu == 1 && item.val().status == 0){
                i++;
                listPendentes.appendChild(setButtons(button, item, i, this.SpanContPendentes, snapshot.val().name));

            }
            if (status == 2 && item.val().amt == 1 && item.val().status == 0){
                i++;
                listPendentes.appendChild(setButtons(button, item, i, this.SpanContPendentes, snapshot.val().name));
            }
            if (status == 3 && item.val().fireFighter == 1 && item.val().status == 0){
                i++;
                listPendentes.appendChild(setButtons(button, item, i, this.SpanContPendentes, snapshot.val().name));
            }
            if (status == 4 && item.val().pm == 1 && item.val().status == 0){
                i++;
                listPendentes.appendChild(setButtons(button, item, i, this.SpanContPendentes, snapshot.val().name));
            }
        });

    });
}

function renderListAndamento(dataAndamento, status){
    buttonAndamento.innerHTML = '';
    let i = 0;
    dataAndamento.forEach(function(item) {

        var button = document.createElement('button');

        button.addEventListener('click', function(event){
            clickItem(JSON.parse(event.target.getAttribute('data')));
        });

        //console.log(status + item.val().samu);
        //i++;
        firebase.database().ref('person/').child(item.val().personId).once('value').then(function(snapshot){
            if (status == 1 && item.val().samu == 1 && item.val().status == 1){
                i++;
                buttonAndamento.appendChild(setButtons(button, item, i, this.SpanContAndamento, snapshot.val().name));

            }
            if (status == 2 && item.val().amt == 1 && item.val().status == 1){
                i++;
                buttonAndamento.appendChild(setButtons(button, item, i, this.SpanContAndamento, snapshot.val().name));
            }
            if (status == 3 && item.val().fireFighter == 1 && item.val().status == 1){
                i++;
                buttonAndamento.appendChild(setButtons(button, item, i, this.SpanContAndamento, snapshot.val().name));
            }
            if (status == 4 && item.val().pm == 1 && item.val().status == 1){
                i++;
                buttonAndamento.appendChild(setButtons(button, item, i, this.SpanContAndamento, snapshot.val().name));
            }
        });

    });
}

function renderListPrioridade(dataPrioridade, status){
    buttonPrioridade.innerHTML = '';
    let i = 0;
    dataPrioridade.forEach(function(item) {

        var button = document.createElement('button');

        button.addEventListener('click', function(event){
            clickItem(JSON.parse(event.target.getAttribute('data')));
        });

        //console.log(status + item.val().samu);
        //i++;
        firebase.database().ref('person/').child(item.val().personId).once('value').then(function(snapshot){
            if (status == 1 && item.val().samu == 1 && item.val().status == 2){
                i++;
                buttonPrioridade.appendChild(setButtons(button, item, i, this.SpanContPrioridade, snapshot.val().name));

            }
            if (status == 2 && item.val().amt == 1 && item.val().status == 2){
                i++;
                buttonPrioridade.appendChild(setButtons(button, item, i, this.SpanContPrioridade, snapshot.val().name));
            }
            if (status == 3 && item.val().fireFighter == 1 && item.val().status == 2){
                i++;
                buttonPrioridade.appendChild(setButtons(button, item, i, this.SpanContPrioridade, snapshot.val().name));
            }
            if (status == 4 && item.val().pm == 1 && item.val().status == 2){
                i++;
                buttonPrioridade.appendChild(setButtons(button, item, i, this.SpanContPrioridade, snapshot.val().name));
            }
        });

    });
}

function renderListEncerrado(dataEncerrados, status){
    buttonEncerrados.innerHTML = '';
    let i = 0;
    dataEncerrados.forEach(function(item) {

        var button = document.createElement('button');

        button.addEventListener('click', function(event){
            clickItem(JSON.parse(event.target.getAttribute('data')));
        });

        //console.log(status + item.val().samu);
        firebase.database().ref('person/').child(item.val().personId).once('value').then(function(snapshot){
            if (status == 1 && item.val().samu == 1 && item.val().status == 3){
                i++;
                buttonEncerrados.appendChild(setButtons(button, item, i, this.SpanContEncerrados, snapshot.val().name));
            }
            if (status == 2 && item.val().amt == 1 && item.val().status == 3){
                i++;
                buttonEncerrados.appendChild(setButtons(button, item, i, this.SpanContEncerrados, snapshot.val().name));
            }
            if (status == 3 && item.val().fireFighter == 1 && item.val().status == 3){
                i++;
                buttonEncerrados.appendChild(setButtons(button, item, i, this.SpanContEncerrados, snapshot.val().name));
            }
            if (status == 4 && item.val().pm == 1 && item.val().status == 3){
                i++;
                buttonEncerrados.appendChild(setButtons(button, item, i, this.SpanContEncerrados, snapshot.val().name));
            }
        });

    });
}

function setButtons(button, item, i, span, name = null){
    //console.log(item.val());
    //console.log(item.val().personId);
   

        span.innerHTML = i;

        button.setAttribute('class','list-group-item list-group-item-action');
        button.setAttribute('data', JSON.stringify(item));
        
        button.appendChild(document.createTextNode(
            item.val().titleAbstract + " - " + 
            item.val().dataPedido  + " - " +
            name));
            
            this.dispatchEvent(this.onPersonSearchFinish);
            return button;
            

     
    
   
}

function searchPerson(idPerson){
    firebase.database().ref('person/' + idPerson).on('value', function(snapshot) {
        //alert('lista');
        addLatLog(JSON.parse(JSON.stringify(snapshot)));
    });
}

function addLatLog(person){
    myLatLng = {
        lat: Number(person.latitude), 
        lng: Number(person.longitude)
    };

    document.getElementById('person').innerHTML = person.name;

    geocoder.geocode({'location': myLatLng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            document.getElementById('address').innerHTML = results[0].formatted_address;

          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });

    initMap();
}

function getCookie(cname) {

    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function getDatabaseUrgency(option){

    this.cookie = getCookie('token').split(',');
  
    if(option == 0){
        firebase.database().ref('urgency/').on('value', function(snapshot) {
            renderListPendentes(snapshot, this.cookie[1]);
        }); 
    } 
    if(option == 1){
        firebase.database().ref('urgency/').on('value', function(snapshot) {
            renderListAndamento(snapshot, this.cookie[1]);
        });         
    } 
    if(option == 2){
        firebase.database().ref('urgency/').on('value', function(snapshot) {
            renderListPrioridade(snapshot, this.cookie[1]);
        });         
    } 
    if(option == 3){
        firebase.database().ref('urgency/').on('value', function(snapshot) {
            renderListEncerrado(snapshot, this.cookie[1]);
        });         
    } 
}

function sessionLogin(){
    this.cookie = getCookie('token').split(',');
    
    if (this.cookie[0] == '') {
        alert(this.cookie + "Sessão expirada !");
        window.location.href = 'index.html';
    }
}

window.addEventListener("beforeunload", function(e){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
 }, false);

/* Listar urgencys do banco atraves de um snapshot*/
    firebase.database().ref('urgency/').on('value', function(snapshot) {
        this.cookie = getCookie('token').split(',');
        renderListPendentes(snapshot, this.cookie[1]);
        renderListEncerrado(snapshot, this.cookie[1]);
        renderListPrioridade(snapshot, this.cookie[1]);
        renderListAndamento(snapshot, this.cookie[1]);
    });


    /*
        limpar campos ao clicar

        Validar se email existe no cookie, caso não (vooltar para tela de login) - ok
  
        Colocar nome e cidade da pessoa no button ok
        arrumar layout detalha urgencias ok
        Adicionar imagens e videos ok

        atualização automatica dos botões de list ok
        fazer update dos chamados ok
    */