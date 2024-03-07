import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationAnimation from '@/components/animations/notifications';

const HistoryContent = ({ hidden }: any) => {
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center mb-3'>Histórico</h1>


      <div className='bg-white shadow-md py-4 px-3 rounded-20 flex justify-between items-center relative'>
        <div className='absolute top-0 right-5 bg-red px-3 rounded-b-xl'>
          <p className='text-xs text-white font-extralight'>27 JAN</p>
        </div>
        <div className='flex items-center gap-2'>
          <NotificationAnimation/>
          <div>
            <p className='font-bold'>RESGATOOU!!</p>
            <p className='font-extralight'>Resgatou 5 pontos</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default HistoryContent