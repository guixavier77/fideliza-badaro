import Promotion from '@/interfaces/promotion.interface';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import MonetizationOnicon from '@mui/icons-material/MonetizationOn';
import React, { useCallback, useState } from 'react';
import ModalLauncherPoints from '../../modals/ModalLauncherPoints';
import Award from '@/interfaces/award.interface';

interface AppLauncherPointsContentProps {
    promotion?: Promotion
}
interface AwardsDictionary {
  [key: number]: Award;
};




const AppCardLauncherPointsContent: React.FC<AppLauncherPointsContentProps> = ({ promotion }) => {
  const [open, setOpen] = useState<boolean>(false);
  const openModalLauncher = useCallback(() => {
    setOpen(true);
  },[])

  const closeModalLauncher = useCallback(() => {
    setOpen(false);
  },[])

  return (
    <>
      <button className='bg-white shadow-md py-4 px-3 rounded-20 flex justify-between items-center relative w-full' onClick={openModalLauncher}>
        <div className='flex items-center gap-2'>
          <MonetizationOnicon style={{ fontSize: 52 }} />
          <div className='text-left'>
            <p className='font-bold'>{promotion?.name}</p>
            <p className='font-extralight'>{promotion?.points} pontos necessários</p>
          </div>
        </div>
          
        <ControlPointIcon style={{ fontSize: 52 }}/>
      </button>


      <ModalLauncherPoints 
        open={open}
        setIsClose={closeModalLauncher}
        promotion={promotion}
      />
    </>
  )
}

export default AppCardLauncherPointsContent