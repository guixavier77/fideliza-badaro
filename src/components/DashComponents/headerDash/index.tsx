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
    setstoreSelected(options[0].value)
  },[options])
  return (
    <div className='bg-black  py-2 flex px-4 justify-between items-center relative'>
      <h1 className='text-white font-bold text-2xl '>{TABS_DASH_PTBR[tabDashSelected]}</h1>
      <div className='flex  justify-center items-center absolute right-10'>
        {user?.role !== ROLE.SUPERADMIN ? (
          <>
            <StoreOutlinedIcon style={{ color: '#FFFFFF' }} />
            <p className='text-white'>{store?.name}</p>
          </>
        ) :
          (
            <div className={`outline-none rounded-xl p-2 flex items-center justify-between`}>
              <div className='flex items-center  w-full relative bg-none'>
                <StoreOutlinedIcon style={{ color: '#FFFFFF' }} />
                <select name='storeSelected' value={Number(storeSelected)} onChange={(e) => setstoreSelected(Number(e.target.value))} className=" w-full text-white font-semibold appearance-none outline-none bg-transparent pl-2 pr-6 bg-black ">
                  {options?.map((item: any) => (
                    <option value={item.value}>{item.text}</option>
                  ))}
                </select>
                <div className='absolute right-0 pointer-events-none'>
                  <KeyboardArrowDownIcon style={{ color: '#FFFFFF' }} />
                </div>
              </div>
            </div>


          )
        }

        <button
          onClick={handleLogout}
          className='text-white bg-red px-4 py-1 rounded-20'>
          <ExitToAppOutlinedIcon />
        </button>
      </div>
    </div>
  )
}

export default HeaderDash