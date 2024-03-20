import User from '@/database/entities/user.entity'
import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import masks from '@/utils/masks/masks';

const CardUser = () => {
  return (
    <div className='bg-white shadow-lg rounded-40 py-2 px-4'>
      <div className='flex items-center'>
        <AccountBoxIcon style={{ fontSize: 48 }} />

        <div className='flex justify-between items-center w-full pl-4'>
          <p className='font-bold'>Guilherme Xavier Martins</p>
          <p className='font-light'>{masks.cpfMask('11052557600')}</p>
          <p className='font-light'>xguilherme1@gmai.com</p>
          <p className='font-medium'>Administrador</p>
          <p className='font-medium bg-red text-white px-3 rounded-20'>Ativo</p>

          <button><ModeEditOutlineIcon/></button>

        </div>


      </div>


    </div>
  )
}

export default CardUser