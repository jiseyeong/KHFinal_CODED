import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WeeklyWeatherCard from './WeeklyWeatherCard';
import LoadingBar from '../Common/LoadingBar';
import { FeedMaxTempContext } from '../../modules/Context/FeedMaxTempContext';
import { styled } from 'styled-components';
import style from './WeeklySideForm.module.scss';

function WeeklySideForm() {
  const [weeklyData, setWeeklyData] = useState([
    { weekly: { min: 0, max: 0 }, message: '', date: new Date() },
  ]);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const accessToken = useSelector((state) => state.member.access);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setMaxTemp, setTempRange } = useContext(FeedMaxTempContext);

  let cnt = 0;

  useEffect(() => {
    if(accessToken){
      setLoading(true);
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
          setWeeklyData([]);
          setDates([]);
          setAddress1(response.data.address1);
          setAddress2(response.data.address2);
          setMaxTemp(response.data.today.max);
          setTempRange(Math.abs(response.data.today.max - response.data.today.min));
          cnt = 0;
          setWeeklyData((prev) => {
            const newDay = new Date();
            newDay.setDate(newDay.getDate() + cnt++);
            setDates((prev) => {
              return [...prev, newDay];
            });
            return [
              ...prev,
              {
                weekly: {
                  min: response.data.today.min,
                  max: response.data.today.max,
                  ptyCode: response.data.today.ptyCode,
                  skyCode: response.data.today.skyCode,
                },
                message: response.data.message,
              },
            ];
          });
          axios({
            method: 'get',
            url: '/weather/weekly',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((response) => {
            response.data.forEach((item, index) => {
              setWeeklyData((prev) => {
                const newDay = new Date();
                newDay.setDate(newDay.getDate() + cnt++);
                setDates((prev) => {
                  return [...prev, newDay];
                });
                return [
                  ...prev,
                  {
                    weekly: {
                      min: item.week.min,
                      max: item.week.max,
                      ptyCode: item.week.ptyCode,
                      skyCode: item.week.skyCode,
                    },
                    message: item.message,
                  },
                ];
              });
            });
            setLoading(false);
          });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [accessToken]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div>
      <div className={style.weatherTitle}>{`${address1}, ${address2}의 주간 날씨`}</div>
      {weeklyData.map((item, index) => {
        return (
          <WeeklyWeatherCard
            key={index}
            weeklyData={item.weekly}
            weatherMessage={item.message}
            date={dates[index]}
            index={index}
          />
        );
      })}
    </div>
  );
}

export default WeeklySideForm;
