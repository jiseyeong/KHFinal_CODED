import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FeedMaxTempContext } from '../../modules/Context/FeedMaxTempContext';
import { useSelector } from 'react-redux';
import weatherIcons from '../WeatherCommon/WetherIcons';
import style from './WeeklyWeatherCard.module.scss';

function WeeklyWeatherCard({ weeklyData, weatherMessage, date, index }) {
  const [weatherIcon, setWeatherIcon] = useState('');
  const { setMaxTemp, setTempRange } = useContext(FeedMaxTempContext);
  const accessToken = useSelector((state) => state.member.access);

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [week, setWeek] = useState('');

  useEffect(() => {
    if (index == 0) {
      handleClickCard();
    }
    if (weeklyData.ptyCode == 1 || weeklyData.ptyCode == 2) {
      setWeatherIcon(weatherIcons.rain);
    } else if (weeklyData.ptyCode == 3) {
      setWeatherIcon(weatherIcons.snow);
    } else if (weeklyData.ptyCode == 4) {
      setWeatherIcon(weatherIcons.heavyRain);
    } else {
      if (weeklyData.skyCode == 1) {
        setWeatherIcon(weatherIcons.sun);
      } else {
        setWeatherIcon(weatherIcons.cloud);
      }
    }
    if (date) {
      setYear(date.getFullYear());
      setMonth(date.getMonth() + 1);
      setDay(date.getDate());
      switch (date.getDay()) {
        case 0:
          setWeek('SUN');
          break;
        case 1:
          setWeek('MON');
          break;
        case 2:
          setWeek('TUE');
          break;
        case 3:
          setWeek('WED');
          break;
        case 4:
          setWeek('THU');
          break;
        case 5:
          setWeek('FRI');
          break;
        case 6:
          setWeek('SAT');
          break;
      }
    }
  }, [weeklyData]);

  function handleClickCard() {
    setMaxTemp(weeklyData.max);
    setTempRange(Math.abs(weeklyData.max - weeklyData.min));
  }

  if (!accessToken) {
    return <div>로그인이 필요한 서비스입니다.</div>;
  }
  return (
    <div className={style.weatherBox} onClick={handleClickCard}>
      <div className={style.weatherBody1}>{`${year}.${month}.${day} ${week}`}</div>
      <div className={style.weatherBody2}>
        <div className={style.weatherIconBox}>{weatherIcon}</div>
        <div className={style.weatherDataBox}>
            <div>최고기온 {weeklyData.max}º</div>
            <div>최저기온 {weeklyData.min}º</div>
        </div>
      </div>
      <div className={style.weatherBody3}>{weatherMessage}</div>
    </div>
  );
}

export default WeeklyWeatherCard;
