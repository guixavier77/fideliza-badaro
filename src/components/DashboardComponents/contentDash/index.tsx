'use client'
import React from 'react'
import DashboardContent from './Dashboard'
import { TABS_DASH } from '@/utils/types/tabs'
import { useTab } from '@/contexts/tabContext'
import UsersContent from './Users'
import PromotionsContent from './Promotions'
import CustomersContent from './Customers'
import ReewardsContent from './Reewards'
import QrCodeContent from './QrCode'
import AwardsContent from './Awards'
import StoresContent from './Stores'

const ContentDash = () => {
  const {tabDashSelected} = useTab();
  return (
    <div  className='col-start-4 col-end-12 row-start-2 row-end-13 mt-14 '>

      <DashboardContent hidden={tabDashSelected !== TABS_DASH.DASH}/>
      <StoresContent hidden={tabDashSelected !== TABS_DASH.STORE} />
      <UsersContent hidden={tabDashSelected !== TABS_DASH.USERS} />
      <AwardsContent hidden={tabDashSelected !== TABS_DASH.AWARDS}/>
      <PromotionsContent hidden={tabDashSelected !== TABS_DASH.PROMOTIONS} />
      <CustomersContent hidden={tabDashSelected !== TABS_DASH.CUSTOMERS} />
      <ReewardsContent hidden={tabDashSelected !== TABS_DASH.REEWARDS} />
      <QrCodeContent hidden={tabDashSelected !== TABS_DASH.QRCODE} />

    </div>
  )
}

export default ContentDash