import NotificationAnimation from '@/components/animations/notifications';
import HistoryCustomer from '@/interfaces/historyCustomer.interface';
import WalletCustomer from '@/interfaces/walletCustomer.interface';
import React from 'react';

interface AppCardHistoryContentProps {
    history?: HistoryCustomer
}
const monthNames = [
  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
];

const AppCardHistory: React.FC<AppCardHistoryContentProps> = ({ history }) => {
  const date = history?.created_at ? new Date(history.created_at) : null;
  const day = date ? String(date.getUTCDate()).padStart(2, "0") : '';
  const month = date ? monthNames[date.getUTCMonth()] : '';
  return (
    <div className='bg-white shadow-md py-4 px-3 rounded-20 flex justify-between items-center relative'>
    <div className='absolute top-0 right-5 bg-red px-3 rounded-b-xl'>
      <p className='text-xs text-white font-extralight'>{day} {month}</p>
    </div>
    <div className='flex items-center gap-2'>
      <NotificationAnimation/>
      <div>
        <p className='font-bold'>{history?.title}</p>
        <p className='font-extralight'>{history?.message}</p>
      </div>

    </div>
  </div>

  )
}

export default AppCardHistory