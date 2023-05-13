import {Component} from 'react'
import {Link} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'

import {BiSearch} from 'react-icons/bi'

import './index.css'

import DetailPlace from '../DetailPlace'

const apiKey = '110272e91d137ec5464fb9faf2cd7e2e'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    dataObj: {},
    apiStatus: apiConstants.initial,
    forecast: [],
    favoritePlacesList: [],
    errMsg: '',
  }

  componentDidMount() {
    this.activateLocation()
  }

  getWeather = async (lat, long) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`,
    )
    // console.log(response)
    const data = await response.json()

    // console.log(data)

    if (response.ok) {
      const response2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`,
      )
      const data2 = await response2.json()

      if (response2.ok) {
        const forecastArr = data2.list.filter((obj, i) => i % 8 === 0)
        // console.log(forecastArr)
        const localStorageFavPlaces = localStorage.getItem('fav_weather_places')
        const favPlaces =
          localStorageFavPlaces === null
            ? []
            : JSON.parse(localStorageFavPlaces)
        // console.log(favPlaces)
        this.setState({
          dataObj: data,
          forecast: forecastArr,
          favoritePlacesList: favPlaces,
          apiStatus: apiConstants.success,
        })
      } else {
        this.setState({apiStatus: apiConstants.failure, errMsg: data2.message})
      }
    } else {
      this.setState({apiStatus: apiConstants.failure, errMsg: data.message})
    }
  }

  onFailureView = () => {
    const {errMsg} = this.state
    return <p className="error-message">{errMsg}</p>
  }

  activateLocation = () => {
    this.setState({apiStatus: apiConstants.inProgress})
    navigator.geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords
        this.getWeather(latitude, longitude)
      },
      error => {
        this.setState({errMsg: error.message, apiStatus: apiConstants.failure})
      },
    )
  }

  renderCurrentWeather = () => {
    const {dataObj, forecast, favoritePlacesList} = this.state

    return (
      <>
        <DetailPlace dataObj={dataObj} forecast={forecast} />
        <h1 className="home-favorite-places-tittle">Favorite Places</h1>
        <ul className="home-page-favorite-places-list">
          {favoritePlacesList.length !== 0 ? (
            favoritePlacesList.map(place => (
              <li key={place.id}>
                <Link
                  to={`/search/${place.name}`}
                  className="home-page-favorite-places-list-item"
                >
                  {place.name}
                </Link>
              </li>
            ))
          ) : (
            <p className="home-page-favorite-places-list-empty">
              No Favorite Places
            </p>
          )}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div className="home-page-spinner-card">
      <TailSpin color="#ffffff" height={50} width={50} />
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderCurrentWeather()
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.failure:
        return this.onFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="weather-home-page-bg-container">
        <div className="weather-home-page-bg-card">
          <div className="home-page-nav-bar">
            <h1 className="home-page-tittle">Know Your Weather</h1>
            <Link to="/search">
              <button type="button" className="home-search-button">
                <BiSearch />
              </button>
            </Link>
          </div>
          <div className="home-page-location-weather-card">
            {this.renderAll()}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
