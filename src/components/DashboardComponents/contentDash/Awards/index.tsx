import UserDB from '@/database/wrappers/user';
import { TABS_FILTER } from '@/utils/types/tabs';
import Add from '@mui/icons-material/Add';
import { orderBy } from 'firebase/firestore';
import User from '@/database/entities/user.entity';
import React, { useCallback, useEffect, useState } from 'react'
import CardPromotion from '../../cards/cardAwards';
import ModalPromotions from '../../modals/ModalPromotions';
import ModalAwards from '../../modals/ModalAwards';

const AwardsContent = ({ hidden }: any) => {
  const [tab, setTab] = useState('all');
  const [openModal, setopenModal] = useState(false);
  const [data, setdata] = useState();
  const [dataFilter, setdatafilter] = useState();

  const onPressItem = (item: any) => {
    setTab(item);
  }
  const handleOpenModal = useCallback(() => {
    setopenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setopenModal(false);
  }, []);
  return (
    <div hidden={hidden}>
      <div className='w-full flex justify-between gap-4' >
        <div className='bg-black rounded-40 w-full  shadow-xl'>
          <div className='flex items-center justify-between py-4 px-10'>
            {TABS_FILTER.map((item) => (
              <button onClick={() => onPressItem(item.value)} className={`${tab === item.value ? 'bg-red  rounded-40 ' : ''} px-6 p-2 text-white text-2xl font-bold `}>{item.name}</button>
            ))}

          </div>
        </div>
        <button onClick={handleOpenModal} className='bg-black px-3 rounded-20  text-white shadow-xl'>
          <Add style={{ fontSize: 52, color: '#C90B0B' }} />
        </button>
      </div>

      <div className='mt-10 flex flex-col gap-4'>
        {/* {usersFilter.map((user) =>
          <>
            <CardPromotion promotion={user} />
          </>
        )} */}
      </div>

      <ModalAwards
        open={openModal}
        setIsClose={handleCloseModal}
      />

    </div>
  )
}

export default AwardsContent