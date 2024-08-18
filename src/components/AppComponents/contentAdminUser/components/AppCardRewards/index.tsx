import Promotion from '@/interfaces/promotion.interface';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import React from 'react';

interface AppCardRewardsContentProps {
    promotion?: Promotion
}

const AppCardRewardsContent: React.FC<AppCardRewardsContentProps> = ({ promotion }) => {
  return (
    <div className='bg-white shadow-md py-4 px-3 rounded-20 flex justify-between items-center relative'>
      <div className='flex items-center gap-2'>
        <EmojiEventsIcon style={{ fontSize: 52 }} />
        <div className='absolute top-0 right-5 bg-green px-3 rounded-b-xl'>
          <p className='text-[9px] text-white font-bold'>Entregue</p>
        </div>

        <div className='absolute top-0 left-5 bg-yellow px-3 rounded-b-xl'>
          <p className='text-[9px] text-white font-bold'>Pendente</p>
        </div>
        <div>
					<p className='font-bold'>Nome da promoção</p>
					<p className='font-extralight'>Guilherme Xavier</p>
        </div>
      </div>
        
      <div>
					<p className='font-bold'>20/20</p>			
      </div>
    </div>
  )
}

export default AppCardRewardsContent