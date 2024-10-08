import Promotion from '@/interfaces/promotion.interface';
import React from 'react';
import NotificationAnimation from '@/components/animations/notifications';

interface AppCardNotificationsContentProps {
    promotion?: Promotion
}

const AppCardNotificationsContent: React.FC<AppCardNotificationsContentProps> = ({ promotion }) => {
  return (
    <div className='bg-white shadow-md py-4 px-3 rounded-20 flex justify-between items-center relative'>
    <div className='absolute top-0 right-5 bg-red px-3 rounded-b-xl'>
        <p className='text-xs text-white font-extralight'>27 JAN</p>
      </div>
      <div className='flex items-center gap-2'>
        <NotificationAnimation/>
        <div>
          <p className='font-bold'>Guilherme Xavier</p>
          <p className='font-extralight'>Resgatou 5 pontos</p>
        </div>

      </div>
  </div>
  )
}

export default AppCardNotificationsContent