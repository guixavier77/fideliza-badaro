import User from '@/database/entities/user.entity'
import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import masks from '@/utils/masks/masks';
import { ROLE_PTBR } from '@/utils/types/roles';

const CardUser = ({ user }: User) => {
  return (
    <div className='bg-white shadow-lg rounded-40 py-2 px-4'>
      <div className='flex'>
        <AccountBoxIcon style={{ fontSize: 48, color: user.status ? 'green' : '#C90B0B' }} />
        <div className='grid grid-cols-12 gap-x-4 items-center w-full pl-2'>
          <p className='font-bold col-span-3 text-left'>{user.name}</p>
          <p className='font-light col-span-2'>{masks.cpfMask(user.cpf)}</p>
          <p className='font-light col-span-4'>{user.email}</p>
          <p className='font-medium col-span-2 '>{ROLE_PTBR[user.role]}</p>
          <button className='col-start-12 col-span-1 text-right'><ModeEditOutlineIcon /></button>
        </div>




      </div>


    </div>
  )
}

export default CardUser