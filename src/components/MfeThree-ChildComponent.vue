<template>
  <div>
    <l-map v-if="mounted" style="height: 300px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>
    <div class="shared-comp">
      <SharedComponent />
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { defineAsyncComponent } from "vue";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    SharedComponent: defineAsyncComponent(() =>
      import("MfeOne/SharedComponent")
    ),
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159],
      mounted: false,
    };
  },
  mounted() {
    this.mounted = true;
  },
};
</script>
<style scoped>
.shared-comp {
  background-color: lightgray;
  padding: 10px;
  width: 25%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 35%;
}

</style>