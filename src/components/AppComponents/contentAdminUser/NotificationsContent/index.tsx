import NotificationAnimation from '@/components/animations/notifications';
import React from 'react';
import AppCardNotificationsContent from '../components/AppCardNotifications';

interface NotificationsContentProps {
  hidden: boolean;
}



const AppNotificationsContent: React.FC<NotificationsContentProps> = ({ hidden }) => {
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center mb-3'>Notificações</h1>


    <AppCardNotificationsContent/>

    </div>
  )
}

export default AppNotificationsContent