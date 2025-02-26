import React from 'react';
import AppCardRewardsContent from '@/components/AppComponents/cards/AppCardRewards';

interface AppRewardsContentProps {
  hidden: boolean;
}

const AppRewardsContent: React.FC<AppRewardsContentProps> = ({ hidden }) => {
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center mb-4'>Realizar Entregas</h1>

      <AppCardRewardsContent  />
    </div>
  )
}

export default AppRewardsContent