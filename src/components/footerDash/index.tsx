'use client'
import { useTab } from '@/contexts/tabContext'
import { TABS_DASH_PTBR } from '@/utils/types/tabs';
import React from 'react'

const FooterDash = () => {
  return(
    <div className='bg-black col-start-3 col-end-13 h-10 flex px-4   items-center justify-between '>



      <p className='text-white font-light text-lg'>2024 - FidelizaBadaro</p>
      <p className='text-white font-light text-lg'>Todos os direitos reservados.</p>

    </div>
  )
}

export default FooterDash