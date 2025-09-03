var plus = document.getElementById("form-app");
plus.addEventListener("submit", function (e) {

    e.preventDefault()

    var main = document.createElement('div');
    main.id = 'main';
    main.innerHTML = `
        <h3>Daily </h3>
        <div id="content"></div>
    `;

    const div1 = document.getElementById('date');
    div1.after(main);


    var city = ""
    city = document.querySelector("#search").value
    const apiKey = 'ed8b08e391d74f66b2c30059804ce319'
    

    getOne(city, apiKey)
        .then(data => data.json())
        .then(users => {

            ListUsers(users)

            return getAll(city, apiKey)
        })

        .then(data => data.json())
        .then(users2 => {

            Current2(users2.list)

        })

})


function getOne(city, apiKey) {

    const CurrentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial';
    return fetch(CurrentWeather)

}


function ListUsers(hell) {

    var iconCode = hell.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    var dat = document.querySelector("#date");
    dat.innerHTML =

        `<div class="city"> City   </div><div class="name">`+ hell.name + `</div>`+
        `<div class="mix"><div class="temp"> `+  Math.round(hell.main.temp) + `°` +`</div>` +`<div class="icon"><img src="${iconURL}"> </div> </div><br>` +
        `<div class="description">`+ hell.weather[0].description +`</div>`+ `<br>`+
        `<div class="details"> DETAILS : </div><br>` +
        `<div class="feels">Feels Like  </div>` +`<div class="feels-main">`+ hell.main.feels_like + `°`  +`</div>`+
        `<div class="wind">Wind  </div>` +`<div class="wind-speed">`+ hell.wind.speed + ` mph` +`</div>`+
        `<div class="humidity">Humidity </div>` +`<div class="humidity-main">`+ hell.main.humidity + `%` +`</div>`+
        `<div class="pressure">Pressure  </div>` +`<div class="pressure-main">`+ hell.main.pressure + ` hPa` +`</div>`;

}


function getAll(city, apiKey) {

    const Forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric"
    return fetch(Forecast)

}


function Current2(varia) {

    var content = document.querySelector("#content")
    content.innerHTML = ""

    const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));


    varia.splice(0, 7).map((item, idx) => {


        var iconCode = item.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        var p = document.createElement("p")
        p.innerHTML = `<div class="complete">` + `<div class="days">`+ forecastDays[idx]+ `</div>`  +`<br>` + 
          `<div class="mixed"><div class="tempe">`+ Math.round(item.main.temp) + `°` + `</div>`+`<div><img class="icon" src="${iconURL}"> </div> </div><br>` + 
          `<div class="feels-like"> Feels Like : </div>` +  `<div class="feels-like-main">`+ item.main.feels_like + `°`  +  `</div>`+
         `<div class="wind-speed"> Wind Speed : </div>` + `<div  class="wind-speed-main">`+  item.wind.speed + ` mph` + `</div>`+
         `<div class="humidity-value"> Humidity : </div>` + `<div class="humidity-value-main">`+  item.main.humidity + `%` + `</div>`+
         `<div class="pressure-value"> Pressure : </div>` + `<div class="pressure-value-main">`+  item.main.pressure + ` hPa` + `</div>`+
         `<div class="clouds-cover"> Clouds : </div>` + `<div class="clouds-cover-main">`+ item.clouds.all + `%` + `</div>` + `</div>`
        
        content.append(p)
    })



}

