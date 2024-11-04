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
    <main className="w-screen h-screen flex overflow-hidden">
      <AsideBar />

      <div className="flex flex-col w-full h-full">
        <HeaderDash  />

        <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
          <div className="flex justify-center w-full h-full">
            <DashboardContent hidden={tabDashSelected !== TABS_DASH.DASH} />
            <StoresContent hidden={tabDashSelected !== TABS_DASH.STORE} />
            <UsersContent hidden={tabDashSelected !== TABS_DASH.USERS} />
            <AwardsContent hidden={tabDashSelected !== TABS_DASH.AWARDS} />
            <PromotionsContent hidden={tabDashSelected !== TABS_DASH.PROMOTIONS} />
            <CustomersContent hidden={tabDashSelected !== TABS_DASH.CUSTOMERS} />
            <ReewardsContent hidden={tabDashSelected !== TABS_DASH.REEWARDS} />
            <QrCodeContent hidden={tabDashSelected !== TABS_DASH.QRCODE} />
          </div>
        </div>

        <FooterDash />
      </div>
    </main>
  )
}
