<template>
    <div>
        <h3>Maps</h3>

        <div id="mapid" style="height: 500px;"></div>


    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default {
  updated() {
    this.create_map()
  },
  methods: {
    create_map() {
      // Creating map options
      var mapOptions = {
        center: [17.385044, 78.486671],
        zoom: 10
      }

      // Creating a map object
      var map = new L.map('mapid', mapOptions);

      // Creating a Layer object
      var layer = new L.TileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png');

      // Adding layer to the map
      map.addLayer(layer);

      this.add_markers(map);
    },
    add_markers(map) {
      for (let markers in this.mapsMarkers) {

        for (let n in markers){
          let circle = new L.circle([this.mapsMarkers[n]["Venue Latitude"], this.mapsMarkers[n]["Venue Longitude"]], {
            color: this.mapsMarkers[n]["Color"],
            fillColor: this.mapsMarkers[n]["Color"],
            fillOpacity: 0.8,
            radius: 10
          });
          circle.bindPopup(this.mapsMarkers[n]["Venue"] + "<br> <i>" + this.mapsMarkers[n]["Venue Category"] + "</i>");
          circle.addTo(map);
        }
      }
    }
  },
  computed: {
    mapsMarkers() {
      return this.$store.getters.map_markers
    }
  }
}
</script>

<style>

tr:nth-child(odd) {
  background-color: #f2f2f2;
}

</style>
