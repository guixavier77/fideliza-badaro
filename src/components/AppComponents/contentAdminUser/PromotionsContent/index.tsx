import React from 'react';
import AppCardPromotionsContent from '../components/AppCardPromotions';

interface AppPromotionsContentProps {
  hidden: boolean;
}

const AppPromotionsContent: React.FC<AppPromotionsContentProps> = ({ hidden }) => {
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center mb-4'>Gerar QR Code</h1>

      <AppCardPromotionsContent  />
    </div>
  )
}

export default AppPromotionsContent