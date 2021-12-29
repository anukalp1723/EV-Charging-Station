//javascript.js
//set map options
var myLatLng = { lat: 12.9092  , lng: 77.5666 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Driving time  : " + result.routes[0].legs[0].duration.text +  ".<br />Total number of Ports available  : " +  10 +   ".<br />Number of spare ports  : " + Math.floor(Math.random() * 2) + ".<br />Number of vehicles in queue  : " + Math.floor(Math.random() * 10) + ".</div>";



            // new addition 

            const schdule = document.querySelector('#schdule');
            schdule.innerHTML = "<div class='alert-info'> Booking Slot At: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Driving time  : " + result.routes[0].legs[0].duration.text +    ".</div>";

             
            const date = document.querySelector('#date');
            date.innerHTML = "<input type='date' id='date'> " + ".</div>";

            const time = document.querySelector('#time');
            time.innerHTML = "<input type='time' id='time'> " + ".</div>";

            const yes = document.querySelector('#yes');
            yes.innerHTML = "<button type='button' onclick='alert('Congratulation! You have successfully scheduled your time slot for charging')' class='btn btn-primary btn-lg' id='yes'>Schdule now </button> " + ".</div>";
      
            //display route
            directionsDisplay.setDirections(result);
            
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";


            const date = document.querySelector('#date');
            date.innerHTML = "<input type='date' id='date'>" + ".</div>";

            const time = document.querySelector('#time');
            time.innerHTML = "<input type='time' id='time'> " + ".</div>";

            const yes = document.querySelector('#yes');
            yes.innerHTML = "<button type='button' class='btn btn-primary btn-lg' id='yes'>Schdule now </button> " + ".</div>";
            
        }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ["establishment"]
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
