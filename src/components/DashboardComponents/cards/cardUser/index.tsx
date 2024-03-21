import User from '@/database/entities/user.entity'
import React, { useState, useCallback } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import masks from '@/utils/masks/masks';
import { ROLE_PTBR } from '@/utils/types/roles';
import ModalUsers from '../../modals/ModalUsers';
import Person from '@mui/icons-material/Person';

const CardUser = ({ user }: User) => {
  const [openEdit, setopenEdit] = useState(false);
  const [userSelected, setuserSelected] = useState<User>()
  const handleOpenEditUser = useCallback((user: User) => {
    setuserSelected(user);
    setopenEdit(true);
  }, []);

  const handleCloseEditUser = useCallback(() => {
    setopenEdit(false);
  }, []);
  return (
    <div className='bg-white shadow-lg rounded-40 py-2 px-4'>
      <div className='flex items-center'>
        <div className={`${user.status ? 'bg-green' : 'bg-red'} mr-2 flex justify-normal items-center rounded-xl p-1`}>
          <Person style={{ fontSize: 32, color: '#FFFFFF'}} />
        </div>
        <div className='grid grid-cols-12 gap-x-4 items-center w-full pl-2'>
          <p className='font-bold col-span-3 text-left'>{user.name}</p>
          <p className='font-light col-span-2'>{masks.cpfMask(user.cpf)}</p>
          <p className='font-light col-span-4'>{user.email}</p>
          <p className='font-medium col-span-2 '>{ROLE_PTBR[user.role]}</p>
          <button onClick={() => handleOpenEditUser(user)} className='col-start-12 col-span-1 text-right'><ModeEditOutlineIcon /></button>
        </div>
      </div>

      <ModalUsers
        open={openEdit}
        setIsClose={handleCloseEditUser}
        userData={userSelected}

      />
    </div>
  )
}

export default CardUser