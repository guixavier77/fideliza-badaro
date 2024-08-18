import React from 'react';
import AppCardRewardsContent from '../components/AppCardRewards';

interface AppRewardsContentProps {
  hidden: boolean;
}

const AppRewardsContent: React.FC<AppRewardsContentProps> = ({ hidden }) => {
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center mb-4'>Realizar Resgates</h1>

      <AppCardRewardsContent  />
    </div>
  )
}

export default AppRewardsContent