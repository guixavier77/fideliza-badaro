import TopDash from '@/components/DashComponents/topDash'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import Group from '@mui/icons-material/Group'
import PaidIcon from '@mui/icons-material/Paid'
import React from 'react'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import EmojiEvents from '@mui/icons-material/EmojiEvents'
import useLoadDashboardTotals from '@/hooks/useLoadDashboardTotals'
import CardDash from '@/components/DashComponents/cardDash'
import { DataGrid } from '@mui/x-data-grid'

const rows: any[] = [
  {
    id: 1,
    name: 'João',
    email: 'joao@example.com',
    cpf: '123.456.789-01',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Maria',
    email: 'maria@example.com',
    cpf: '987.654.321-00',
    status: 'Inativo',
  },
]

const columns: any[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Nome', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'cpf', headerName: 'CPF', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
]

const DashboardContent = ({ hidden }: any) => {
  const { data, loading } = useLoadDashboardTotals(hidden)

  console.log(data)
  return (
    <div hidden={hidden} className="w-full">
      <TopDash
        title="Dashboard"
        description="Veja as principais métricas e informações da loja e promoções."
        icon={DashboardOutlinedIcon}
      />

      <div className="grid grid-cols-4 gap-6 ">
        <CardDash
          icon={<Group />}
          title="Clientes"
          value={data?.totalClients ?? 0}
        />
        <CardDash
          icon={<PaidIcon />}
          title="Promoções Ativas"
          value={data?.totalPromotionsActive ?? 0}
        />
        <CardDash
          icon={<PaidOutlinedIcon />}
          title="Promoções Finalizadas"
          value={data?.totalPromotionsInactive ?? 0}
        />
        <CardDash
          icon={<EmojiEvents />}
          title="Resgates Pendentes"
          value={12}
        />
      </div>
    </div>
  )
}

export default DashboardContent
