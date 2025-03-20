import React, { useContext } from 'react'
import Logo from '../../GlobalComponents/logo'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Cookies from 'js-cookie'
import { DefaultContext } from '@/contexts/defaultContext'

const HeaderHome = () => {
  const router = useRouter()
  const { user } = useContext(DefaultContext)
  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  console.log(user)
  return (
    <div className="h-20 w-screen px-6 py-2 ">
      <div className="flex justify-between items-center">
        <div className="">
          <Logo type="white" styles="text-xl text-start" />
          <p className="text-white font-bold ">
            Olá, <span className="font-extralight">{user?.name}</span>
          </p>
        </div>

        <button onClick={handleLogout} className="">
          <LogoutOutlinedIcon
            style={{ color: '#FFFFFF', fontSize: 48, rotate: '180deg' }}
          />
        </button>
      </div>
    </div>
  )
}

export default HeaderHome
