import { DefaultContext } from '@/contexts/defaultContext';
import Promotion from '@/database/entities/promotion';
import PromotionsDB from '@/database/wrappers/promotion';
import { TABS_FILTER } from '@/utils/types/tabs';
import Add from '@mui/icons-material/Add';
import { orderBy } from 'firebase/firestore';
import { useCallback, useContext, useEffect, useState } from 'react';
import CardPromotion from '../../cards/cardPromotion';
import ModalPromotions from '../../modals/ModalPromotions';

const PromotionsContent = ({ hidden }: any) => {
  const [tab, setTab] = useState('all');
  const { storeSelected } = useContext(DefaultContext);
  const [openPromotion, setopenPromotion] = useState(false);
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [promotionsFilter, setPromotionsFilter] = useState<Promotion[]>([])

  useEffect(() => {
    if (!storeSelected) return;
    const onSubscribe = new PromotionsDB(storeSelected).on(setPromotions, orderBy('name', 'asc'));
    return () => {
      onSubscribe();
    };
  }, [storeSelected])


  useEffect(() => {
    if (tab === 'all') {
      setPromotionsFilter(promotions);
    } else if (tab === 'active') {
      setPromotionsFilter(promotions.filter(user => user.active));
    } else {
      setPromotionsFilter(promotions.filter(user => !user.active));

    }
  }, [promotions, tab])




  const onPressItem = (item: any) => {
    setTab(item);
  }
  const handleOpenUsers = useCallback(() => {
    setopenPromotion(true);
  }, []);

  const handleClosePromotion = useCallback(() => {
    setopenPromotion(false);
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
        <button onClick={handleOpenUsers} className='bg-black px-3 rounded-20  text-white shadow-xl'>
          <Add style={{ fontSize: 52, color: '#C90B0B' }} />
        </button>
      </div>

      <div className='mt-10 flex flex-row gap-4'>
        {promotionsFilter.map((promotion) =>
          <>
            <CardPromotion promotion={promotion} />
          </>
        )}
      </div>

      <ModalPromotions
        open={openPromotion}
        setIsClose={handleClosePromotion}
      />

    </div>
  )
}

export default PromotionsContent