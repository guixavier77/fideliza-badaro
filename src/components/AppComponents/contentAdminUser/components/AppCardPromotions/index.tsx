import Promotion from '@/interfaces/promotion.interface';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import React from 'react';

interface AppCardPromotionsContentProps {
    promotion?: Promotion
}

const AppCardPromotionsContent: React.FC<AppCardPromotionsContentProps> = ({ promotion }) => {
  return (
    <div className='bg-white shadow-md py-4 px-3 rounded-20 flex justify-between items-center relative'>
      <div className='flex items-center gap-2'>
        <StoreMallDirectoryIcon style={{ fontSize: 52 }} />
        <div>
					<p className='font-bold'>Nome da Loja</p>
					<p className='font-extralight'>Nome da promoção</p>
        </div>
      </div>
        
			<QrCode2OutlinedIcon style={{ fontSize: 52 }}/>
    </div>
  )
}

export default AppCardPromotionsContent