    var myLatLng = {lat: -17.7955723, lng: -50.9463489};
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
