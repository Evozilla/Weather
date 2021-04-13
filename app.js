window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // const proxy = `http://cors-anywhere.herokuapp.com/`;
      const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=569046bf7bc8f61c69bbf9092a3e1a09&units=metric `;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp, name } = data.main;
          const { description, main } = data.weather[0];
          // set DOM Elements from the API
          temperatureDegree.textContent = temp;
          locationTimezone.textContent = data.name;
          temperatureDescription.textContent = description;
          // Formula for celsius
          let farenheit = temp * 1.8 + 32;
          setIcons(main, document.querySelector(".icon"));

          // change temperature to celcius/farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(farenheit);
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  } /* else {
    h1.texContent = "ative a geolocalizao";
  }*/

  function setIcons(main, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = main.replace(/ /g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
