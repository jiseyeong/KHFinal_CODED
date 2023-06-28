import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import weatherIcons from '../WeatherCommon/WetherIcons';
import './TodayWeather.scss';

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
    <div className="TodayCardWrapper">
      <div className="mainWrapper">
        <div className="innerWrapper" onClick={(e) => e.stopPropagation()}>
          <button className="closeBtn" onClick={DeleteAccountCom}>
            x
          </button>
          <div className="blankWrapper"></div>
          <div className="infoWrapper">
            <div>{`${address1}, ${address2} 의 날씨`}</div>
            <div>{weatherIcon}</div>
            <div>{recentTemp}</div>
            <div>H:{maxTemp}</div>
            <div>L:{minTemp}</div>
            <div>{'>' + weatherMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayCard;
