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