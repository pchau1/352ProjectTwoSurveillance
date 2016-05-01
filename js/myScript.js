$(document).ready(function(){
 
	if( navigator.geolocation )
	 navigator.geolocation.getCurrentPosition(success, fail);
	else
	 $("p").html("HTML5 Not Supported");
 
});
 
function success(position)
{
	var googleLatLng = new google.maps.LatLng(position.coords.latitude, 
						position.coords.longitude);
	var mapOtn={
zoom:10,
center:googleLatLng,
mapTypeId:google.maps.MapTypeId.ROAD
	};
 
	var Pmap=document.getElementById("map");
 
	var map=new google.maps.Map(Pmap, mapOtn);
	addMarker(map, googleLatLng, "Technotip.com", 
                  "Location");
}
 
function addMarker(map, googleLatLng, title, content){
	var markerOptn={
position:googleLatLng,
map:map,
title:title,
animation:google.maps.Animation.DROP
	};
 
	var marker=new google.maps.Marker(markerOptn);
 
	var infoWindow=new google.maps.InfoWindow({ content: content, 
	                                               position: googleLatLng});
    google.maps.event.addListener(marker, "click", function(){
		infoWindow.open(map);
	});
		// Add circle overlay and bind to marker
var circle = new google.maps.Circle({
  map: map,
  radius: 2500,    // 10 miles in metres
  fillColor: '#0000FF'
})
circle.bindTo('center', marker, 'position');											   
}
 
function fail(error)
{
	var errorType={
0:"Unknown Error",
1:"Permission denied by the user",
2:"Position of the user not available",
3:"Request timed out"
	};
 
	var errMsg = errorType[error.code];
 
	if(error.code == 0 || error.code == 2){
		errMsg = errMsg+" - "+error.message;
	}
 
	$("p").html(errMsg);
}