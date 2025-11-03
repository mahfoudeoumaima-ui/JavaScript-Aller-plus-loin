let input = document.getElementById("input");
let button = document.getElementById("button");
let div = document.getElementById("div");

const api = {
  key: '4eb3703790b356562054106543b748b2',
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
};

button.addEventListener("click", function () {
  let cityName = input.value.trim();
  div.innerHTML = ""; // vider avant affichage

  if (cityName !== "") {
    let url = `${api.baseUrl}?q=${cityName}&appid=${api.key}&units=metric&lang=fr`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("Données reçues :", data);

        if (data.cod === "404") {  // attention, cod est une string ici
          div.textContent = "Ville introuvable !";
          return;
        }

        let city = document.createElement("h3");
        city.textContent = `Ville : ${data.name}`;

        let temp = document.createElement("p");
        temp.textContent = `Température : ${data.main.temp} °C`;

        let descrpt = document.createElement("p");
        descrpt.textContent = `Description : ${data.weather[0].description}`;

        let icon = document.createElement("img");
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        icon.alt = data.weather[0].description;

        div.appendChild(city);
        div.appendChild(temp);
        div.appendChild(descrpt);
        div.appendChild(icon);
      })
      .catch(error => {
        console.error("Erreur :", error);
        div.textContent = "Erreur de connexion !";
      });
  } else {
    div.textContent = "Écris le nom d'une ville d'abord !";
  }
});
