// This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var map;
var infowindow;
var service;
//Array of all places to look for
var types = ['bar', 'store', 'restaurant'];

// Initialize map
function initMap() {
var pyrmont = {lat: 17.817380, lng: -91.536030};

map = new google.maps.Map(document.getElementById('map'), {
center: pyrmont,
zoom: 17
});

//Create infoWindow and request all places by types to google
infowindow = new google.maps.InfoWindow();
service = new google.maps.places.PlacesService(map);
service.nearbySearch({
  location: pyrmont,
  radius: 500,
  type: types
  }, callback);
}

//Callback to create markers once status is OK
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

// Create markers for each location
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
  map: map,
  position: place.geometry.location
});
  
  //Add click event to each marker
  google.maps.event.addListener(marker, 'click', function() {
    //Request detals using the place id
    service.getDetails({
      placeId:  place.place_id
     }, function (place) {
        //pass parameters (name, address and phone number) to createFrane function
        createFrame(place.name, place.formatted_address, place.formatted_phone_number);
        console.table(place);
      });
        infowindow.setContent(place.name);
        infowindow.open(map, this);
        document.getElementById('results').innerHTML='';
       });
}

//Create list and assign buttons for each result
function createFrame(rs, ds, ps) {
  var frame = document.getElementById('results');
  var ul = document.createElement('ul');
  var li = document.createElement('li');
  var btn = document.createElement('button');
  var p = document.createElement('p');
  var txt = rs;

  p.className = 'panel panel-default';
  p.textContent = ds + '\n\n' + ps; 
  btn.className = 'btn btn-success';
  btn.textContent = txt;
  li.appendChild(btn);
  li.appendChild(p);
  frame.appendChild(li);
}
