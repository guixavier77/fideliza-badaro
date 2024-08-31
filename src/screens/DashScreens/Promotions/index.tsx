'use client'
import { useCallback, useContext, useEffect, useState, useMemo } from 'react';
import { DefaultContext } from '@/contexts/defaultContext';
import Promotion from '@/interfaces/promotion.interface';
import { TABS_FILTER } from '@/utils/types/tabs';
import Add from '@mui/icons-material/Add';
import CardPromotion from '@/components/DashComponents/cards/cardPromotion';
import PaginationDash from '@/components/DashComponents/PaginationDash';
import ModalPromotions from '@/components/DashComponents/modals/ModalPromotions';
import useLoadPromotions from '@/hooks/useLoadPromotions';



let itemsPerPage = 7;
const PromotionsContent = ({ hidden }: any) => {
  const [tab, setTab] = useState('all');
  const {promotions,loading} = useLoadPromotions(hidden)
  const [openPromotion, setopenPromotion] = useState(false);
  const [promotionsFilter, setPromotionsFilter] = useState<Promotion[]>([])
  const [currentPage, setCurrentPage] = useState(1);

  const numberPages = useMemo(() => promotionsFilter.length > 0 ? Math.ceil(promotionsFilter.length / itemsPerPage) :  1, [promotionsFilter]);

  const promotionsFilterDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return promotionsFilter.slice(startIndex, endIndex);
  }, [currentPage, promotionsFilter]);


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
    <div hidden={hidden} className='h-full relative'>
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

      {loading ? 
        <>

        </>
        :
        <div className='mt-10 flex flex-row gap-4'>
          {promotionsFilterDisplay.map((promotion) =>
            <>
              <CardPromotion promotion={promotion} />
            </>
          )}
        </div>
      }

      <div className='mt-10 absolute right-0 bottom-20'>
        <PaginationDash 
          count={numberPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        
        
        />
      </div>

      <ModalPromotions
        open={openPromotion}
        setIsClose={handleClosePromotion}
      />

    </div>
  )
}

export default PromotionsContent