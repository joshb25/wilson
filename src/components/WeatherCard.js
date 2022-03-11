import React, {useState} from "react"
import imageData from "../imageData"

export default function WeatherCard({condition,code,icon,tempInF,feelsLikeF,tempInC,feelsLikeC,humidity,uv,wind,rain,country,region,date,alert,firstMaxTempF, firstMaxTempC,firstCondition, firstIcon,firstDate,secondMaxTempF,secondMaxTempC, secondCondition,secondDate, secondIcon, thirdMaxTempF, thirdMaxTempC, thirdCondition,thirdIcon, thirdDate}){
//date/time

    let dateloc= new Date(date) 
    const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
    const day=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let m= month[dateloc.getMonth()];
    let d= day[dateloc.getDay()];
    let n= dateloc.getDate();
    let year=dateloc.getFullYear().toString().slice(2);
    let h=dateloc.getHours();
    let min=dateloc.getMinutes();
    let ampm= h >= 12 ? "PM":"AM";
    h=h%12;
    h= h ? h:12;
    min= min < 10 ? '0'+min:min;

    let locTimeZone= `${h}:${min} ${ampm}-${d}, ${n} ${m} '${year}`
   
   
    function getDay(str){
        
        let dateVar= new Date(str)
        let i= day[dateVar.getUTCDay()];
        return i
    }
    
//date/time
    function background(){
        for(let i in imageData){
            if(imageData[i].id===code){    
                return imageData[i].url    
            }
        }
    }

    const [sliderBool, setSliderBool]=useState(true)
    // console.log(sliderBool)

    function slider(){
        setSliderBool(prevBool=>!prevBool)
    }
    
    return (
        <>
            <div className="w-info" style={{backgroundImage: `url(${background()})` }}>
                <div className="info-cont">
                <div className="local">
                <h1 className="title country">{country}</h1>
                <h2 className="subTitle-1 region">{region}</h2>
                <h4 className="subTitle-2 date">{locTimeZone}</h4>
                </div>
                <div className="forecast">
                <img src={icon} className="icon1"/> 
                <h2 className="title temp">{sliderBool? tempInF: tempInC}</h2>
                <div className="cond">
                <div className="slider-container" onClick={slider} style={{justifyContent: sliderBool ? "flex-start": "flex-end"}}>
                <div className="slider-cont">
                <div className="f">F</div>
                <div className="c">C</div>
                </div>
                <div className="slider"></div>
                </div>
                <h3 className="subTitle-1 condition">{condition}</h3>
                <h4 className="subTitle-2 feels">{sliderBool ? feelsLikeF: feelsLikeC}</h4>
                </div>
                </div>
                
             
            <div className="additional-info">
                <h2 className="humid">{humidity}</h2>
                <h2 className="rain">{rain}</h2>
                <h2 className="wind">{wind}</h2>
            </div>
            </div>

             <div className="two-day-forecast">
                
                <div className="day1">
                    <h1 className="dates">{getDay(secondDate)}</h1>
                    <h2 className="title title-fc">{secondMaxTempF} {secondMaxTempC}</h2>
                     <img src={secondIcon}/>
                    <h3 className="subTitle-1 condition-f">{secondCondition}</h3>
                </div>
                <div className="day2">
                    <h1 className="dates">{getDay(thirdDate)}</h1>
                    <h2 className="title title-fc">{thirdMaxTempF} {thirdMaxTempC}</h2>
                     <img src={thirdIcon}/>
                    <h3 className="subTitle-1 condition-f">{thirdCondition}</h3>
                </div>
            </div>
                <div className="alert-container">
                {alert? <img src="./alert.png" className="alert-img"/>: null}    
                <h1 className="alert">{alert}</h1>
                </div>
               </div> 
        </>

    )
}


