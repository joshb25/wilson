import React, {useState, useEffect} from "react"
import WeatherCard from "./WeatherCard"


export default function CitySearch(){
      const [bool, setBool]=useState(false)
      const [city, setCity]=useState({})
      const [defaultCity, setDefaultCity]=useState({})
      const [query, setQuery]=useState('')
       console.log(city)
    //   console.log(defaultCity)
   
    useEffect(()=>{
    const url=`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=auto:ip&days=10&aqi=yes&alerts=yes` //auto:ip
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        setDefaultCity(data)
         setDefaultCity((prevData=>({
            ...prevData,
            condition: prevData.current.condition.text,
            code: prevData.current.condition.code,
            icon:  prevData.current.condition.icon,
            tempInF: Math.floor(prevData.current.temp_f) + "°F" ,
            feelsLikeF: "feels like " + Math.floor(prevData.current.feelslike_f)  + "°F",
            tempInC: Math.floor(prevData.current.temp_c) + "°C",
            feelsLikeC: "feels like " + Math.floor(prevData.current.feelslike_c) + "°C",
            humidity: "Humidity: " + prevData.current.humidity + "%",
            uv: "UV: " +  prevData.current.uv,
            rain: "Rain: " + prevData.current.precip_mm + "mm",
            wind: "Wind: " + prevData.current.wind_mph + "mph ",
            country: prevData.location.country,
            region: prevData.location.name, 
            date: prevData.location.localtime,
            alert: prevData.alerts.alert.length>1 && prevData.alerts.alert[0].event,
            firstMaxTempF: Math.floor(prevData.forecast.forecastday[0].day.maxtemp_f) + "°F/",
            firstMaxTempC: Math.floor(prevData.forecast.forecastday[0].day.maxtemp_c) + "°C",
            firstCondition: prevData.forecast.forecastday[0].day.condition.text,
            firstIcon: prevData.forecast.forecastday[0].day.condition.icon,
            firstDate: prevData.forecast.forecastday[0].date,
            secondMaxTempF: Math.floor(prevData.forecast.forecastday[1].day.maxtemp_f) + "°F/",
            secondMaxTempC: Math.floor(prevData.forecast.forecastday[1].day.maxtemp_c) + "°C",
            secondCondition: prevData.forecast.forecastday[1].day.condition.text,
            secondIcon: prevData.forecast.forecastday[1].day.condition.icon,
            secondDate: prevData.forecast.forecastday[1].date,
            thirdMaxTempF: Math.floor(prevData.forecast.forecastday[2].day.maxtemp_f) + "°F/",
            thirdMaxTempC: Math.floor(prevData.forecast.forecastday[2].day.maxtemp_c) + "°C",
            thirdCondition: prevData.forecast.forecastday[2].day.condition.text,
            thirdIcon: prevData.forecast.forecastday[2].day.condition.icon,
            thirdDate: prevData.forecast.forecastday[2].date
        })))

    })
    },[])

      async function fetchData(e){
          e.preventDefault()
          const url=`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${query}&days=10&aqi=yes&alerts=yes` 


          try{
              
              var res= await fetch(url)
              var data= await res.json()
              setCity(data)
              setCity(prevData=>({
            ...prevData,
            condition: prevData.current.condition.text,
            code: prevData.current.condition.code,
            icon:  prevData.current.condition.icon,
            tempInF: Math.floor(prevData.current.temp_f) + "°F" ,
            feelsLikeF: "feels like " + Math.floor(prevData.current.feelslike_f)  + "°F",
            tempInC: Math.floor(prevData.current.temp_c) + "°C",
            feelsLikeC: "feels like " + Math.floor(prevData.current.feelslike_c) + "°C",
            humidity: "Humidity: " + prevData.current.humidity + "%",
            uv: "UV: " + prevData.current.uv,
            rain: "Rain: " + prevData.current.precip_mm + "mm",
            wind: "Wind: " + prevData.current.wind_mph + "mph ",
            country: prevData.location.country,
            region: prevData.location.name, 
            date: prevData.location.localtime,
            alert: prevData.alerts.alert.length>1 && prevData.alerts.alert[0].event,
            firstMaxTempF: Math.floor(prevData.forecast.forecastday[0].day.maxtemp_f) + "°F/",
            firstMaxTempC: Math.floor(prevData.forecast.forecastday[0].day.maxtemp_c) + "°C",
            firstCondition: prevData.forecast.forecastday[0].day.condition.text,
            firstIcon: prevData.forecast.forecastday[0].day.condition.icon,
            firstDate: prevData.forecast.forecastday[0].date,
            secondMaxTempF: Math.floor(prevData.forecast.forecastday[1].day.maxtemp_f) + "°F/",
            secondMaxTempC: Math.floor(prevData.forecast.forecastday[1].day.maxtemp_c) + "°C",
            secondCondition: prevData.forecast.forecastday[1].day.condition.text,
            secondIcon: prevData.forecast.forecastday[1].day.condition.icon,
            secondDate: prevData.forecast.forecastday[1].date,
            thirdMaxTempF: Math.floor(prevData.forecast.forecastday[2].day.maxtemp_f) + "°F/",
            thirdMaxTempC: Math.floor(prevData.forecast.forecastday[2].day.maxtemp_c) + "°C",
            thirdCondition: prevData.forecast.forecastday[2].day.condition.text,
            thirdIcon: prevData.forecast.forecastday[2].day.condition.icon,
            thirdDate: prevData.forecast.forecastday[2].date
        }))
        setBool(true)
          }catch(err){
              console.log(err)

          }
      }

      
      
      
    return(
        <div className="grid-container" >
        <header>
            <h1 className="web-title">Wilson's Simple Forecast</h1>
            <form onSubmit={fetchData}>
                <input 
                    type="text"
                    name="city"
                    placeholder="SEARCH CITY..."
                    value={query}
                    className="input"
                    onChange={(e)=>setQuery(e.target.value)}
                    style={{fontFamily: "Hanuman, serif", color: "#fff"}}
                    required
                    
                />
                <button type="submit" className="btn1"><img src="./wilson/searchW.png" className="searchIcon"/></button>
            </form>
        </header>

        
            {bool ? <WeatherCard {...city}/>:<WeatherCard {...defaultCity}/>}
        
        </div>

    )
}