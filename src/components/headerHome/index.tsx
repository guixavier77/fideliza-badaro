import React from 'react'
import Logo from '../logo'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const HeaderHome = () => {
  const router = useRouter();
  const handleLogout = () => {
    router.push('/login')
    signOut();
  }
  return (
    <div className='bg-black h-32 w-screen px-6 py-2 '>
      <div className='flex justify-between items-center'>
        <div className=''>
          <Logo type="white" styles='text-xl text-start' />
          <p className='text-white font-bold '>Olá, <span className='font-extralight'>Guilherme</span></p>
        </div>

        <button onClick={handleLogout}>
          <LogoutOutlinedIcon style={{ color: '#FFFFFF', fontSize: 48, rotate: '180deg' }} />
        </button>

      </div>
    </div>
  )
}

export default HeaderHome