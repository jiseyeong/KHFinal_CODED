import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WeeklyWetherCard from './WeeklyWetherCard';

function WeeklySideForm() {
  const [weeklyData, setWeeklyData] = useState([
    { weekly: { min: 0, max: 0 }, message: '' },
  ]);
  const accessToken = useSelector((state) => state.member.access);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/auth/userDTO',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        const address1 = response.data.address1;
        const address2 = response.data.address2;
        axios({
          method: 'get',
          url: '/weather/today',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            address1: address1,
            address2: address2,
            time: new Date().getTime(),
          },
        }).then((response) => {
          setWeeklyData([]);
          console.log(response);
          setWeeklyData((prev) => {
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
            params: {
              address1: address1,
              address2: address2,
            },
          }).then((response) => {
            response.data.forEach((item, index) => {
              console.log(`sky${item.week.dDay} : ${item.week.skyCode}`);
              console.log(`pty${item.week.dDay} : ${item.week.ptyCode}`);
              setWeeklyData((prev) => {
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
            console.log(weeklyData);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken]);

  return (
    <div>
      {weeklyData.map((item, index) => {
        return (
          <WeeklyWetherCard
            weeklyData={item.weekly}
            weatherMessage={item.message}
          />
        );
      })}
    </div>
  );
}

export default WeeklySideForm;
