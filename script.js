//var city = ""

    var plus = document.getElementById("form-app");
    plus.addEventListener("submit", function(e){
        e.preventDefault()
        console.log("Hey")
        var city = ""
        city = document.querySelector("#first").value
        const apiKey = 'ed8b08e391d74f66b2c30059804ce319'

            getOne(city , apiKey)
                .then(data => data.json())
                .then(users => {
             
                    ListUsers(users)
                   // console.log(users)

                    return getAll(city,apiKey)
                })

                .then(data=> data.json())
                .then(users2=>{

                    Current2(users2.list)
                
                })


    })

function getOne(city , apiKey){

    const CurrentWeather = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units=metric';
    return fetch(CurrentWeather)
}

function ListUsers(hell){

            var dat = document.querySelector("#date");
            dat.innerHTML = 
                "City : " + hell.name + " <br> " +
                "Description : "+ hell.weather[0].description + "<br>"+
                "Temperature :  " + hell.main.temp + " °C" + "<br>" +
                "DETAILS : <br>"+
                "Feels Like : "+ hell.main.feels_like + "<br>"+
                "Wind : "  + hell.wind.speed + "<br>"+
                "Humidity :" + hell.main.humidity + "<br>" +
                "Pressure : " +  hell.main.pressure

}



function getAll(city,apiKey){

    const Forecast = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+"&units=metric"
    return fetch(Forecast)

}

function Current2(varia){
    console.log(varia)    

    var content = document.querySelector("#content")
    content.innerHTML = ""

    const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    varia.splice(0,7).map((item, idx)=>{

        var p = document.createElement("p")
        p.innerHTML =   forecastDays[idx]+ " : " + "<br> "+
             "Temperature : " + item.main.temp + " °C"+ "<br>" + 
             "Pressure : "+ item.main.pressure + "<br>" +
             "Humidity : " + item.main.humidity + "<br>" +
             "Clouds : " + item.clouds.all + "<br>" + 
             "Wind Speed : " + item.wind.speed + "<br>" +
             "Feels Like : " + item.main.feels_like 

        content.append(p)
    })

}

