'use client'
import AsideBar from "@/components/DashComponents/asideBar";
import FooterDash from "@/components/DashComponents/footerDash";
import HeaderDash from "@/components/DashComponents/headerDash";
import { useTab } from "@/contexts/tabContext";
import AwardsContent from "@/screens/DashScreens/Awards";
import CustomersContent from "@/screens/DashScreens/Customers";
import DashboardContent from "@/screens/DashScreens/Dashboard";
import PromotionsContent from "@/screens/DashScreens/Promotions";
import QrCodeContent from "@/screens/DashScreens/QrCode";
import ReewardsContent from "@/screens/DashScreens/Reewards";
import StoresContent from "@/screens/DashScreens/Stores";
import UsersContent from "@/screens/DashScreens/Users";

import { TABS_DASH } from "@/utils/types/tabs";


export default function Dashboard() {
  const {tabDashSelected} = useTab();

  return (
    <main className="w-screen h-screen overflow-hidden  grid grid-cols-12 grid-rows-12">
      <HeaderDash />
      <AsideBar />
      <FooterDash />
      <div className='col-start-4 col-end-12 row-start-2 row-end-13 mt-14 '>
        <DashboardContent hidden={tabDashSelected !== TABS_DASH.DASH}/>
        <StoresContent hidden={tabDashSelected !== TABS_DASH.STORE} />
        <UsersContent hidden={tabDashSelected !== TABS_DASH.USERS} />
        <AwardsContent hidden={tabDashSelected !== TABS_DASH.AWARDS}/>
        <PromotionsContent hidden={tabDashSelected !== TABS_DASH.PROMOTIONS} />
        <CustomersContent hidden={tabDashSelected !== TABS_DASH.CUSTOMERS} />
        <ReewardsContent hidden={tabDashSelected !== TABS_DASH.REEWARDS} />
        <QrCodeContent hidden={tabDashSelected !== TABS_DASH.QRCODE} />
      </div>
    </main>
  )
}
