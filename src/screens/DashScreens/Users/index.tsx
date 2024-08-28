'use client'
import PaginationDash from '@/components/DashComponents/PaginationDash';
import CardUser from '@/components/DashComponents/cards/cardUser';
import ModalUsers from '@/components/DashComponents/modals/ModalUsers';
import { DefaultContext } from '@/contexts/defaultContext';
import User from '@/interfaces/user.interface';
import api from '@/services/api';
import { users } from '@/utils/mocks';
import Add from '@mui/icons-material/Add';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';


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

let itemsPerPage = 7;
const UsersContent = ({ hidden }: any) => {
  const { storeSelected } = useContext(DefaultContext);
  const [tab, setTab] = useState('all');
  const [openUsers, setopenUsers] = useState(false);
  const [users, setUsers] = useState<User[]>([])
  const [usersFilter, setUsersFilter] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1);

  
  const usersToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  }, [currentPage, usersFilter]);
  const numberPages = useMemo(() => users.length > 1 ? Math.ceil(usersFilter.length / itemsPerPage) : 1, [usersFilter]);

  useEffect(() => {
    if(hidden) return;
    api.get('users')
    .then(res => setUsers(res.data?.users))
    .catch(error => console.error('[ERROR API /users]', error?.response?.data))
  },[hidden])

  useEffect(() => {
    if (tab === 'all') {
      setUsersFilter(users.filter(user => user.storeId === storeSelected));
    } else if (tab === 'active') {
      setUsersFilter(users.filter(user => user.status && user.storeId === storeSelected));
    } else {
      setUsersFilter(users.filter(user => !user.status && user.storeId === storeSelected));
    }
  }, [storeSelected, users, tab])

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
    <div hidden={hidden} className='h-full relative'>
      <div className='w-full flex justify-between gap-4' >
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
        {usersToDisplay?.map((user) =>
          <>
            <CardUser user={user} />
          </>
        )}
      </div> 

      <div className='mt-10 absolute right-0 bottom-20'>
        <PaginationDash 
          count={numberPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        
        
        />
      </div>

      <ModalUsers
        open={openUsers}
        setIsClose={handleCloseUsers}
      />

    </div>
  )
}

export default UsersContent