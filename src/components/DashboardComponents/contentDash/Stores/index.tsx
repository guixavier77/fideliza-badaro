import { useCallback, useContext, useEffect, useState } from 'react';

import { DefaultContext } from '@/contexts/defaultContext';
import User from '@/database/entities/user.entity';
import Add from '@mui/icons-material/Add';
import CardStore from '../../cards/cardStore';
import ModalStores from '../../modals/ModalStores';
import Store from '@/database/entities/store.entity';

const TABS = [
  {
    name: 'Ativos',
    value: 'active',
  },
  {
    name: 'Inativos',
    value: 'inactive',
  },
  {
    name: 'Todos',
    value: 'all'
  }
]

const StoresContent = ({ hidden }: any) => {
  const { stores } = useContext(DefaultContext);
  const [tab, setTab] = useState('all');
  const [openUsers, setopenUsers] = useState(false);
  const [storesFilter, setStoresFilter] = useState<Store[]>([])


  useEffect(() => {
    if (!stores) return
    if (tab === 'all') {
      setStoresFilter(stores);
    } else if (tab === 'active') {
      setStoresFilter(stores.filter(store => store.status));
    } else {
      setStoresFilter(stores.filter(store => !store.status));
    }
  }, [stores, tab])



  const onPressItem = (item: any) => {
    setTab(item);
  }
  const handleOpenUsers = useCallback(() => {
    setopenUsers(true);
  }, []);

  const handleCloseUsers = useCallback(() => {
    setopenUsers(false);
  }, []);
  return (
    <div hidden={hidden}>
      <div className='w-full flex justify-center gap-4' >
        <div className='bg-black rounded-40 w-full  shadow-xl'>
          <div className='flex items-center justify-between py-4 px-10'>
            {TABS.map((item) => (
              <button onClick={() => onPressItem(item.value)} className={`${tab === item.value ? 'bg-red  rounded-40 ' : ''} px-6 p-2 text-white text-2xl font-bold `}>{item.name}</button>
            ))}

          </div>
        </div>
        <button onClick={handleOpenUsers} className='bg-black px-3 rounded-20  text-white shadow-xl'>
          <Add style={{ fontSize: 52, color: '#C90B0B' }} />
        </button>
      </div>

      <div className='mt-10 flex flex-col gap-4'>
        {storesFilter?.map((store: Store) =>
          <>
            <CardStore store={store} />
          </>
        )}
      </div>

      <ModalStores
        open={openUsers}
        setIsClose={handleCloseUsers}
      />

    </div>
  )
}

export default StoresContent