import { TABS_FILTER } from '@/utils/types/tabs';
import Add from '@mui/icons-material/Add';
import { useCallback, useContext, useState, useEffect } from 'react';
import ModalAwards from '../../modals/ModalAwards';
import AwardDB from '@/database/wrappers/award';
import { DefaultContext } from '@/contexts/defaultContext';
import Award from '@/database/entities/award.entity';
import { orderBy } from 'firebase/firestore';
import user from '@/database/wrappers/user';
import CardAwards from '../../cards/cardAwards';

const AwardsContent = ({ hidden }: any) => {
  const { storeSelected } = useContext(DefaultContext)
  const [tab, setTab] = useState('all');
  const [openModal, setopenModal] = useState(false);
  const [data, setdata] = useState<Award[]>();
  const [dataFilter, setdatafilter] = useState<Award[]>();
  useEffect(() => {
    if(!storeSelected) return;
    const onSubscribe = new AwardDB(storeSelected).on(setdata, orderBy('name', 'asc'));
    return () => {
      onSubscribe();
    };
  }, [hidden, storeSelected])


  useEffect(() => {
    if (tab === 'all') {
      setdatafilter(data);
    } else if (tab === 'active') {
      setdatafilter(data.filter(data => data.status));
    } else {
      setdatafilter(data.filter(data => !data.status));

    }
  }, [data, tab])


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
        {dataFilter?.map((data) =>
          <>
            <CardAwards award={data} />
          </>
        )}
      </div>

      <ModalAwards
        open={openModal}
        setIsClose={handleCloseModal}
      />

    </div>
  )
}

export default AwardsContent