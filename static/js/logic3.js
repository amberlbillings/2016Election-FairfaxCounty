// Creating map object
var map = L.map("map", {
  center: [38.9085, -77.2405],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.high-contrast",
  accessToken: API_KEY
}).addTo(map);

var link = "http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/" +
"35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson";

// Function that will determine the color of a neighborhood based on the borough it belongs to
// Link to GeoJSON
var link = "static/js/2016_Election_Results__USPresidentVicePresident.geojson";

// Function that will determine the color of a neighborhood based on the WINPARTY it belongs to
function chooseColor(WINPARTY) {
  switch (WINPARTY) {
  case "Clinton / Kaine (D)":
    return "blue";
  case "Trump / Pence (R)":
    return "red";
  default:
    return "black";
  }
}

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  console.log(data);
  L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: chooseColor(feature.properties.WINPARTY),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },

    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        }
        
      });
      layer.bindPopup("<h1>" + feature.properties.WINPARTY + "</h1> <hr> <h2>" + "Won by " + feature.properties.WINPERCENT * 100 + "%" + "</h2>");
    }
  }).addTo(map);
});
