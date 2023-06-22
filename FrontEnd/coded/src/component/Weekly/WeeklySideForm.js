import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WeeklyWetherCard from './WeeklyWetherCard';
import LoadingBar from '../Common/LoadingBar';

function WeeklySideForm() {
  const [weeklyData, setWeeklyData] = useState([
    { weekly: { min: 0, max: 0 }, message: '', date: new Date() },
  ]);
  const accessToken = useSelector((state) => state.member.access);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  let cnt = 0;

  useEffect(() => {
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
              console.log(newDay);
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
  }, [accessToken]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div>
      {weeklyData.map((item, index) => {
        return (
          <WeeklyWetherCard
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
