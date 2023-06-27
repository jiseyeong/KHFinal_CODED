import { createContext, useContext, useState } from 'react';
import WeeklyFeedForm from '../../../component/Weekly/WeeklyFeedForm';
import WeeklySideForm from '../../../component/Weekly/WeeklySideForm';
import { FeedMaxTempProvider } from '../../../modules/Context/FeedMaxTempContext';
import { useSelector } from 'react-redux';

function WeeklyPage() {
  const accessToken = useSelector((state) => state.member.access);
  return (
    <>
      {accessToken ? (
        <FeedMaxTempProvider>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <WeeklySideForm />
            </div>
            <div style={{ flex: 3 }}>
              <WeeklyFeedForm />
            </div>
          </div>
        </FeedMaxTempProvider>
      ) : (
        <div>MEMBER-ONLY SERVICE. Login First!</div>
      )}
    </>
  );
}

export default WeeklyPage;
