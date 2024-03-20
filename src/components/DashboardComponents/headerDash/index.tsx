'use client'
import { useTab } from '@/contexts/tabContext'
import { TABS_DASH_PTBR } from '@/utils/types/tabs';
import React from 'react'

const HeaderDash = () => {
  const { tabDashSelected } = useTab();
  return (
    <div className='bg-black  flex justify-center items-center col-start-3 col-end-13  row-start-1 row-end-1 shadow-xl'>
      <h1 className='text-white font-bold text-4xl '>{TABS_DASH_PTBR[tabDashSelected]}</h1>
    </div>
  )
}

export default HeaderDash