import React from 'react';
import AppCardLauncherPointsContent from '@/components/AppComponents/cards/AppCardLauncherPoints';

interface AppLauncherPointsContentProps {
  hidden: boolean;
}

const AppLauncherPointsContent: React.FC<AppLauncherPointsContentProps> = ({ hidden }) => {
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center mb-4'>Lançar Pontos</h1>

      <AppCardLauncherPointsContent  />
    </div>
  )
}

export default AppLauncherPointsContent