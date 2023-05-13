import './index.css'

const DetailPlace = props => {
  const {dataObj, forecast} = props

  const newDate = new Date()
  const date = newDate.toDateString()

  const tempFormate = val => Math.floor(val - 273.15)

  return (
    <div className="home-weather-details-card">
      <h1 className="home-current-weather-location-name">
        {dataObj.name} , {dataObj.sys.country}
      </h1>
      <div className="home-current-weather-details-card">
        <h1 className="home-current-weather-location-temp">
          {tempFormate(dataObj.main.temp)}
        </h1>
        <div className="home-current-weather-location-temp-card">
          <p className="home-current-weather-location-temp-c"> C</p>
          <p className="home-current-weather-location-temp-sky">
            {dataObj.weather[0].main}
          </p>
        </div>
      </div>
      <p className="home-current-date-min-max">
        {date} ~ {tempFormate(dataObj.main.temp_max)} C /{' '}
        {tempFormate(dataObj.main.temp_min)} C
      </p>

      <div className="home-current-location-weather-bg-container">
        <div className="home-current-location-weather-bg-card">
          <p className="home-current-location-weather-card-tittle">
            Feels Like
          </p>
          <p className="home-current-location-weather-card-description">
            {tempFormate(dataObj.main.feels_like)} C
          </p>
        </div>
        <div className="home-current-location-weather-bg-card">
          <p className="home-current-location-weather-card-tittle">Humidity</p>
          <p className="home-current-location-weather-card-description">
            {dataObj.main.humidity} %
          </p>
        </div>
        <div className="home-current-location-weather-bg-card">
          <p className="home-current-location-weather-card-tittle">S wind</p>
          <p className="home-current-location-weather-card-description">
            {dataObj.wind.speed} km/h
          </p>
        </div>
        <div className="home-current-location-weather-bg-card">
          <p className="home-current-location-weather-card-tittle">
            Visibility
          </p>
          <p className="home-current-location-weather-card-description">
            {Math.floor(dataObj.visibility / 1000)} km
          </p>
        </div>
        <div className="home-current-location-weather-bg-card">
          <p className="home-current-location-weather-card-tittle">
            Air pressure
          </p>
          <p className="home-current-location-weather-card-description">
            {dataObj.main.pressure} hPa
          </p>
        </div>
      </div>
      <h1 className="home-current-weather-location-name">5-days Forecast</h1>
      <ul className="home-current-location-5day-forecast-list">
        {forecast.map(day => (
          <li
            key={day.dt}
            className="home-current-location-5day-forecast-list-item"
          >
            <p className="home-current-location-5day-forecast-date">
              {new Date(day.dt_txt).toDateString()}
            </p>
            <p className="home-current-location-5day-forecast-date">
              {day.weather[0].main}
            </p>
            <p className="home-current-location-5day-forecast-date">
              {tempFormate(day.main.temp_min)} /{' '}
              {tempFormate(day.main.temp_max)} C
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DetailPlace
