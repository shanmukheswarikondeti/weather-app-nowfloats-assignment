import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'

import './index.css'

import DetailPlace from '../DetailPlace'

const apiKey = '110272e91d137ec5464fb9faf2cd7e2e'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

function FavoritePlace() {
  const name = useParams().place

  const [dataObj, setDataObj] = useState({})
  const [apiStatus, setApiStatus] = useState(apiConstants.initial)
  const [forecast, setForecast] = useState([])
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    async function getWeather() {
      setApiStatus(apiConstants.loading)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`,
      )
      const data = await response.json()
      if (response.ok) {
        const response2 = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${apiKey}`,
        )
        const data2 = await response2.json()
        if (response2.ok) {
          const forecastArr = data2.list.filter((obj, i) => i % 8 === 0)
          setDataObj(data)
          setForecast(forecastArr)
          setApiStatus(apiConstants.success)
        } else {
          setApiStatus(apiConstants.failure)
          setErrMsg(data2.message)
        }
      } else {
        setApiStatus(apiConstants.failure)
        setErrMsg(data.message)
      }
      // console.log(data)
    }
    getWeather()
  }, [name])

  const renderFailure = () => (
    <div className="home-page-spinner-card">
      <p className="search-page-error">{errMsg}</p>
    </div>
  )

  const renderCurrentWeather = () => (
    <>
      <DetailPlace dataObj={dataObj} forecast={forecast} />
    </>
  )

  const renderLoader = () => (
    <div className="home-page-spinner-card">
      <TailSpin color="#ffffff" height={50} width={50} />
    </div>
  )

  const renderAll = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return renderCurrentWeather()
      case apiConstants.loading:
        return renderLoader()
      case apiConstants.failure:
        return renderFailure()
      default:
        return null
    }
  }

  return (
    <div className="weather-home-page-bg-container">
      <div className="weather-home-page-bg-card">
        <div className="link-to-home-card">
          <Link to="/" className="link-to-home-page">
            Home
          </Link>
        </div>
        <div className="home-page-location-weather-card">{renderAll()}</div>
      </div>
    </div>
  )
}

export default FavoritePlace
