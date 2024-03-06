import React from 'react'
import Logo from '../logo'
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';

const HeaderHome = () => {
  return (
    <div className='bg-black h-32 w-screen px-6 py-2 '>
      <div className='flex justify-between items-center'>
        <div className=''>
          <Logo type="white" styles='text-xl text-start' />
          <p className='text-white font-bold '>Olá, <span className='font-extralight'>Guilherme</span></p>
        </div>

        <button>
          <PersonOutlineOutlined style={{ color: '#FFFFFF', fontSize: 48 }} />
        </button>

      </div>
    </div>
  )
}

export default HeaderHome