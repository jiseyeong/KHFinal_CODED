import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import weatherIcons from '../WeatherCommon/WeatherIcons';
import style from './TodayWeather.module.scss';

function TodayCard() {
  const [weatherIcon, setWeatherIcon] = useState('');
  const [weatherMessage, setWeatherMessage] = useState('');
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [recentTemp, setRecentTemp] = useState(0);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const accessToken = useSelector((state) => state.member.access);

  useEffect(() => {
    if (accessToken) {
      axios({
        method: 'get',
        url: '/weather/today',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          time: new Date().getTime(),
        },
      })
        .then((response) => {
          setAddress1(response.data.address1);
          setAddress2(response.data.address2);
          setWeatherMessage(response.data.message);
          setRecentTemp(response.data.today.recent);
          setMinTemp(response.data.today.min);
          setMaxTemp(response.data.today.max);
          if (
            response.data.today.ptyCode == 1 ||
            response.data.today.ptyCode == 2
          ) {
            setWeatherIcon(weatherIcons.rain);
          } else if (response.data.today.ptyCode == 3) {
            setWeatherIcon(weatherIcons.snow);
          } else if (response.data.today.ptyCode == 4) {
            setWeatherIcon(weatherIcons.heavyRain);
          } else {
            if (response.data.today.skyCode == 1) {
              setWeatherIcon(weatherIcons.sun);

            } else {
              setWeatherIcon(weatherIcons.cloud);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: 'get',
        url: '/weather/todayNonMem',
        params: {
          time: new Date().getTime(),
        },
      })
        .then((response) => {
          setAddress1(response.data.address1);
          setAddress2(response.data.address2);
          setWeatherMessage(response.data.message);
          setRecentTemp(response.data.today.recent);
          setMinTemp(response.data.today.min);
          setMaxTemp(response.data.today.max);
          if (
            response.data.today.ptyCode == 1 ||
            response.data.today.ptyCode == 2
          ) {
            setWeatherIcon(weatherIcons.rain);
          } else if (response.data.today.ptyCode == 3) {
            setWeatherIcon(weatherIcons.snow);
          } else if (response.data.today.ptyCode == 4) {
            setWeatherIcon(weatherIcons.heavyRain);
          } else {
            if (response.data.today.skyCode == 1) {
              setWeatherIcon(weatherIcons.sun);
            } else {
              setWeatherIcon(weatherIcons.cloud);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  return (
    <div className={style.todayCardWrapper}>
      <div className={style.mainWrapper}>
        <div className={style.innerWrapper} onClick={(e) => e.stopPropagation()}>
          {/* <button className="closeBtn" onClick={}>
            x
          </button> */}
          <div className={style.blankWrapper}></div>
          <div className={style.infoWrapper}>
            <div className={style.title}>{`${address1}, ${address2} 의 날씨`}</div>
            <div className={style.message}>{weatherMessage}</div>
            <div className={style.icon} style={{height:"40px",width:"40px"}}>{weatherIcon}</div>
            <div className={style.recentTemp}>{recentTemp}º</div>
            <div className={style.highestTemp}>최고기온 {maxTemp}</div> 
            <div className={style.lowestTemp}>최저기온 {minTemp}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayCard;
