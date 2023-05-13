import {Component} from 'react'
import {Link} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'

import './index.css'

import DetailPlace from '../DetailPlace'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiKey = '110272e91d137ec5464fb9faf2cd7e2e'

class Search extends Component {
  state = {
    dataObj: {},
    api: apiConstants.initial,
    forecast: [],
    input: '',
    favList: [],
    errMsg: '',
  }

  getWeather = async () => {
    this.setState({api: apiConstants.loading})
    const {input} = this.state

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`,
    )
    const data = await response.json()
    // console.log(data)

    if (response.ok) {
      const response2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKey}`,
      )

      const data2 = await response2.json()
      // console.log(forecastArr)

      if (response2.ok) {
        const localStorageFavPlaces = localStorage.getItem('fav_weather_places')
        const favPlaces =
          localStorageFavPlaces === null
            ? []
            : JSON.parse(localStorageFavPlaces)
        const forecastArr = data2.list.filter((obj, i) => i % 8 === 0)
        // console.log(favPlaces)
        this.setState({
          dataObj: data,
          forecast: forecastArr,
          api: apiConstants.success,
          favList: favPlaces,
        })
      } else {
        this.setState({api: apiConstants.failure, errMsg: data2.message})
      }
    } else {
      this.setState({api: apiConstants.failure, errMsg: data.message})
    }
  }

  getFavList = () => {
    const localStorageFavPlaces = localStorage.getItem('fav_weather_places')
    const favPlaces =
      localStorageFavPlaces === null ? [] : JSON.parse(localStorageFavPlaces)
    this.setState({favList: favPlaces})
  }

  onClickAdd = () => {
    const {dataObj, favList} = this.state
    const favItem = {
      id: favList.length + 1,
      name: dataObj.name,
    }
    favList.push(favItem)
    localStorage.setItem('fav_weather_places', JSON.stringify(favList))
    this.getFavList()
  }

  onClickRemove = () => {
    const {dataObj, favList} = this.state
    const updatedFavList = favList.filter(obj => obj.name !== dataObj.name)
    // console.log(updatedFavList)
    localStorage.setItem('fav_weather_places', JSON.stringify(updatedFavList))
    this.getFavList()
  }

  renderCurrentWeather = () => {
    const {dataObj, forecast, favList} = this.state
    const isPresent = favList.find(obj => {
      if (dataObj.name === obj.name) {
        return true
      }
      return false
    })

    return (
      <>
        <DetailPlace dataObj={dataObj} forecast={forecast} />
        {isPresent ? (
          <button
            type="button"
            onClick={this.onClickRemove}
            className="add-remove-favorite"
          >
            Remove Favorite
          </button>
        ) : (
          <button
            type="button"
            onClick={this.onClickAdd}
            className="add-remove-favorite"
          >
            Add to Favorite
          </button>
        )}
      </>
    )
  }

  renderFailure = () => {
    const {errMsg} = this.state
    return (
      <div className="home-page-spinner-card">
        <p className="search-page-error">{errMsg}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div className="home-page-spinner-card">
      <TailSpin color="#ffffff" height={50} width={50} />
    </div>
  )

  onKeyDown = event => {
    if (event.key === 'Enter') {
      const {input} = this.state
      if (input === '') {
        alert('Enter Input')
        alert('Enter Input')
        this.setState({api: apiConstants.failure})
      } else {
        this.getWeather()
      }
    }
  }

  onClickSearch = () => {
    const {input} = this.state
    if (input === '') {
      alert('Enter Input')
      this.setState({api: apiConstants.failure})
    } else {
      this.getWeather()
    }
  }

  onChangeInput = event => {
    this.setState({input: event.target.value})
  }

  renderAllPages = () => {
    const {api} = this.state
    switch (api) {
      case apiConstants.success:
        return this.renderCurrentWeather()
      case apiConstants.loading:
        return this.renderLoading()
      case apiConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {input} = this.state
    return (
      <div className="weather-home-page-bg-container">
        <div className="weather-home-page-bg-card">
          <input
            type="search"
            className="location-search-bar"
            value={input}
            placeholder="Enter place or city or State"
            onChange={this.onChangeInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            className="search-location-button"
            onClick={this.onClickSearch}
          >
            Search
          </button>
          <div className="link-to-home-card">
            <Link to="/" className="link-to-home-page">
              Home
            </Link>
          </div>
          {this.renderAllPages()}
        </div>
      </div>
    )
  }
}

export default Search
