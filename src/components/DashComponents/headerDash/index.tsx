'use client'
import { DefaultContext } from '@/contexts/defaultContext';
import { useTab } from '@/contexts/tabContext';
import { TABS_DASH_PTBR } from '@/utils/types/tabs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Cookies from 'js-cookie';
import { ROLE } from '@/utils/types/roles';
import { useRouter } from 'next/navigation';

const HeaderDash = () => {
  const { store, user, stores, setstoreSelected, storeSelected } = useContext(DefaultContext)
  const { tabDashSelected } = useTab();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login')
  }

  const options = useMemo(() => stores?.map(item => ({ value: item.id, text: item.name })), [stores])


  useEffect(() => {
    if(options?.length > 0)setstoreSelected(options[0].value)
  },[options])
  return (
    <div className='flex bg-black justify-between items-center px-4 py-5 relative'>
      <div className='flex justify-center absolute items-center right-10'>
        {user?.role !== ROLE.SUPERADMIN ? (
          <>
            <StoreOutlinedIcon style={{ color: '#FFFFFF' }} />
            <p className='text-white'>{store?.name}</p>
          </>
        ) :
          (
            <div className={`outline-none rounded-xl p-2 flex items-center justify-between`}>
              <div className='flex bg-none w-full items-center relative'>
                <StoreOutlinedIcon style={{ color: '#FFFFFF' }} />
                <select name='storeSelected' value={Number(storeSelected)} onChange={(e) => setstoreSelected(Number(e.target.value))} className="bg-black bg-transparent text-white w-full appearance-none font-semibold outline-none pl-2 pr-6">
                  {options?.map((item: any) => (
                    <option value={item.value}>{item.text}</option>
                  ))}
                </select>
                <div className='absolute pointer-events-none right-0'>
                  <KeyboardArrowDownIcon style={{ color: '#FFFFFF' }} />
                </div>
              </div>
            </div>


          )
        }

      </div>
    </div>
  )
}

export default HeaderDash