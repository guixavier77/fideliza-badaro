import AsideBar from "@/components/DashboardComponents/asideBar";
import ContentDash from "@/components/DashboardComponents/contentDash";
import FooterDash from "@/components/DashboardComponents/footerDash";
import HeaderDash from "@/components/DashboardComponents/headerDash";

export default function Dashboard() {
  return (
    <main className="w-screen h-screen overflow-hidden  grid grid-cols-12 grid-rows-12">
      <HeaderDash />
      <AsideBar />
      <FooterDash />
      <ContentDash />
    </main>
  )
}
