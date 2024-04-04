'use client'
import { DefaultContext } from '@/contexts/defaultContext';
import { useTab } from '@/contexts/tabContext'
import { TABS_DASH_PTBR } from '@/utils/types/tabs';
import React, { useContext, useMemo } from 'react'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useFormik } from 'formik';
import { ROLE } from '@/utils/types/roles';

const HeaderDash = () => {
  const { store, user, stores, setstoreSelected, storeSelected } = useContext(DefaultContext)
  const { tabDashSelected } = useTab();

  console.log(storeSelected);

  const options = useMemo(() => stores?.map(item => ({ value: item.id, text: item.name })), [stores])

  const formik = useFormik({
    initialValues: {
      storeSelected: '',
    },
    onSubmit: async (values) => {
      // setloading(true);
      // api.post('users', values).then().catch((e) => console.log(e)).finally(() => {
      //   setloading(false)
      //   setIsClose();
      // });
    }
  })

  return (
    <div className='bg-black  flex  justify-center items-center col-start-3 col-end-13  row-start-1 row-end-1 shadow-xl relative'>
      <div className='flex  justify-center items-center gap-3 absolute right-12'>
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
                <select name='storeSelected' value={storeSelected} onChange={(e) => setstoreSelected(e.target.value)} className=" w-full text-white font-semibold appearance-none outline-none bg-transparent px-8 bg-black ">
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
      </div>
      <h1 className='text-white font-bold text-4xl '>{TABS_DASH_PTBR[tabDashSelected]}</h1>
    </div>
  )
}

export default HeaderDash