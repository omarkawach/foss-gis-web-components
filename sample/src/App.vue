<script setup>
import "@omar/mlibre/dist/mlibre-point-map";

const points = [
  {
    lat: 34,
    lon: -118,
    color: "black",
    text: "LA 2028",
  },
  {
    lat: -23,
    lon: -43,
    color: "#16963A",
    text: "Rio 2016",
  },
  {
    lat: 35.7,
    lon: 139.6,
    color: "#174896",
    text: "Tokyo 2020",
  },
  {
    lat: 51.5,
    lon: -0.1,
    color: "#D8018F",
    text: "London 2012",
  },
  {
    lat: 48.8,
    lon: 2.4,
    color: "#15B0AB",
    text: "Paris 2024",
  },
];

const mapLoaded = ({ detail: { map } }) => {
  // Do something with the map
  console.log("Map loaded", map);
};
</script>

<template>
  <header>
    <h1>Welcome to my site</h1>
  </header>
  <main>
    <div class="map-container">
      <mlibre-point-map
        v-bind:points="points"
        v-on:mapLoaded="mapLoaded"
      ></mlibre-point-map>
    </div>
  </main>
  <footer>
    <p>My website name</p>
  </footer>
</template>

<style>
#app,
html,
body {
  background-color: white;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header,
footer {
  background-color: #2b2b2b;
  color: white;
  padding: 1rem;
  text-align: center;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-container {
  height: 80%;
  width: 80%;
}
</style>
