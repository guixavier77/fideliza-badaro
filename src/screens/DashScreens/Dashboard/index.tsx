import React from 'react'
import TopDash from '@/components/DashComponents/topDash'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import Group from '@mui/icons-material/Group'
import PaidIcon from '@mui/icons-material/Paid'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import EmojiEvents from '@mui/icons-material/EmojiEvents'
import useLoadDashboardTotals from '@/hooks/useLoadDashboardTotals'
import CardDash from '@/components/DashComponents/cardDash'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles'
import TableDash from '@/components/DashComponents/tableDash'
import GraphicPromotions from '@/components/DashComponents/graphicPromotions'
import GraphicRewards from '@/components/DashComponents/graphicRewards'
const rows = [
  { id: 1, name: 'João', email: 'joao@example.com', cpf: '123.456.789-01', status: 'Ativo', points: 1200 },
  { id: 2, name: 'Maria', email: 'maria@example.com', cpf: '987.654.321-00', status: 'Inativo', points: 900 },
  { id: 3, name: 'Carlos', email: 'carlos@example.com', cpf: '112.233.445-66', status: 'Ativo', points: 1500 },
  { id: 3, name: 'Carlos', email: 'carlos@example.com', cpf: '112.233.445-66', status: 'Ativo', points: 1500 },
  { id: 3, name: 'Carlos', email: 'carlos@example.com', cpf: '112.233.445-66', status: 'Ativo', points: 1500 },
]

const columns = [
  { header: 'Rank', field: 'rank' },
  { header: 'Nome', field: 'name' },
  { header: 'Pontos', field: 'totalPoints' },
]

const DashboardContent = ({ hidden }: {hidden: boolean}) => {
  const { data, loading } = useLoadDashboardTotals(hidden)
  const theme = useTheme() 
  
  return (
    <div hidden={hidden} className="w-full">
      <TopDash
        title="Dashboard"
        description="Veja as principais métricas e informações da loja e promoções."
        icon={DashboardOutlinedIcon}
      />

      <div className="grid grid-cols-4 gap-6">
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

      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-9 flex flex-col gap-6"> 
          <div className="w-full">
            <GraphicPromotions data={data?.topPromotions ?? []}/>
          </div>
          <div className="w-full mt-2">
            <GraphicRewards />
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-6">
          <div className="w-full">
            <p className="text-black text-2xl font-bold uppercase mb-2">Top Clientes</p>
            <TableDash columns={columns} data={data?.topClients ?? []} rowKey="id" />
          </div>

          <div className="w-full">
            <p className="text-black text-2xl font-bold uppercase mb-2">Top Operadores</p>
            <TableDash columns={columns} data={data?.topOperators ?? []} rowKey="id" />
          </div>
        </div>
      </div>




    </div>
  )
}

export default DashboardContent
