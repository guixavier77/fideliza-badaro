import React, { useCallback, useEffect, useState } from 'react'

import Add from '@mui/icons-material/Add';
import ModalUsers from '../../modals/ModalUsers';
import CardUser from '../../cards/cardUser';
import { Alert } from '@mui/material';
import UserDB from '@/database/wrappers/user';
import { orderBy } from 'firebase/firestore';
import User from '@/database/entities/user.entity';

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

const UsersContent = ({ hidden }: any) => {
  const [tab, setTab] = useState('all');
  const [openUsers, setopenUsers] = useState(false);
  const [users, setUsers] = useState<User[]>([])
  const [usersFilter, setUsersFilter] = useState<User[]>([])

  useEffect(() => {
    const onSubscribe = new UserDB().on(setUsers, orderBy('name', 'asc'));
    return () => {
      onSubscribe();
    };
  }, [hidden])


  useEffect(() => {
    if (tab === 'all') {
      setUsersFilter(users);
    } else if (tab === 'active') {
      setUsersFilter(users.filter(user => user.status));
    } else {
      setUsersFilter(users.filter(user => !user.status));

    }
  }, [users, tab])




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
        {usersFilter.map((user) =>
          <>
            <CardUser user={user} />
          </>
        )}
      </div>

      <ModalUsers
        open={openUsers}
        setIsClose={handleCloseUsers}
      />

    </div>
  )
}

export default UsersContent