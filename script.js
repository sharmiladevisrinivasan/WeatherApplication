let appId= '34bd780c61d18b767d8dad1c1d5ea917';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
        else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then (result =>{
        return result.json();
    }).then(result => {
          init(result);
    })
}
    function init(resultFromServer) {
        switch(resultFromServer.weather[0].main)
        {
            case 'Clear':
                document.body.style.backgroundImage = 'url("clear.jpg")';
                break;
                case 'Clouds':
                    document.body.style.backgroundImage = 'url("cloudy.jpg")';
                    break;
                    case 'Rain':
                        case 'Drizzle':
                            case 'Mist':
                                document.body.style.backgroundImage = 'url("rain.jpg")';
                                break;
                                case 'Thunderstorm':
                                    document.body.style.backgroundImage = 'url("storm.jpg")';
                                    break;
                                    case 'snow':
                                        document.body.style.backgroundImage = 'url("snow.jpg")';
                                        break;
                                        default:
                                            document.body.style.backgroundImage = 'url("default.png")';
                                            break;
        }
        let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
        let temparatureElement = document.getElementById('temparature');
        let humidityElement = document.getElementById('humidity');
        let windSpeedElement = document.getElementById('windSpeed');
        let cityHeader = document.getElementById('cityHeader');
        let weatherIcon = document.getElementById('documentIconImg');
        let minimumTemparature = document.getElementById('mintemp');
        let maximumTemparature = document.getElementById('maxtemp');
    
        weatherIcon.src='http://openweathermap.org/img/wn/'+ resultFromServer.weather[0].icon + '.png';
        let resultDescription = resultFromServer.weather[0].description;
        weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
        temparatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
        
        cityHeader.innerHTML = resultFromServer.name;
        humidityElement.innerHTML = 'Humidity levels at'  +resultFromServer.main.humidity + ' %';
        minimumTemparature.innerHTML = 'Min Temparature ' + Math.floor(resultFromServer.main.temp_min) + '&#176';
        maximumTemparature.innerHTML = 'Max Temparature ' +Math.floor(resultFromServer.main.temp_max) + '&#176';
        windSpeedElement.innerHTML = 'Winds at' + Math.floor(resultFromServer.wind.speed)  +  ' m/s';

        setPositionForWeatherInfo();
    }

    function setPositionForWeatherInfo() {
        let weatherContainer = document.getElementById('weatherContainer');
        let weatherContainerHeight = weatherContainer.clientHeight;
        let weatherContainerWidth = weatherContainer.clientWidth;

        weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
        weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
        weatherContainer.style.visibility = 'visible';
    }

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
    searchWeather(searchTerm);
})