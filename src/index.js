import Vue from "vue";
import axios from "axios";

var app = new Vue({
  el: "#app",
  data: {
    valC: 0,
    valF: 32,
    valK: 273,
    cityTemperature: null
  },
  methods: {
    calculateFandK: function(e) {
      let celsiusValue = parseInt(e.target.value, 10);
      this.valF = Math.round(celsiusValue * (9 / 5) + 32);
      this.valK = Math.round(celsiusValue + 273.15);
    },
    calculateCandK: function(e) {
      let fahrenheitValue = parseInt(e.target.value, 10);
      this.valC = Math.round((fahrenheitValue - 32) * (5 / 9));
      this.valK = Math.round((fahrenheitValue - 32) * (5 / 9) + 273.15);
    },
    calculateCandF: function(e) {
      let kelvinValue = parseInt(e.target.value, 10);
      this.valC = Math.round(kelvinValue - 273.15);
      this.valF = Math.round((kelvinValue - 273.15) * (9 / 5) + 32);
    },
    getTemperature: function(city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e30275da87e827224394d9c047cf5d2`
        )
        .then(
          response =>
            (this.cityTemperature =
              Math.round(response.data.main.temp - 273.15) + " C")
        )
        .catch(error => console.log(error));
    }
  }
});
