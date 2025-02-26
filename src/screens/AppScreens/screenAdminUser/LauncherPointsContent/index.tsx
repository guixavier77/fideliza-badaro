import React from 'react';
import AppCardLauncherPointsContent from '@/components/AppComponents/cards/AppCardLauncherPoints';
import useLoadPromotions from '@/hooks/useLoadPromotions';
import Loading from '@/components/GlobalComponents/loading';

interface AppLauncherPointsContentProps {
  hidden: boolean;
}

const AppLauncherPointsContent: React.FC<AppLauncherPointsContentProps> = ({ hidden }) => {

  const {loading, promotions} = useLoadPromotions(hidden);
  console.log(promotions);
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center mb-4'>Lançar Pontos</h1>
      {loading ? 
        <Loading text='Buscando dados...'/>
      :
        <>
          {promotions.map((promotion) => (
            <AppCardLauncherPointsContent key={promotion.id} promotion={promotion} />
          ))}
        </>
      }

    </div>
  )
}

export default AppLauncherPointsContent