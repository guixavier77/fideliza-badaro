'use client'
import { colors } from '@/utils/colors/colors'
import { TABS_FILTER } from '@/utils/types/tabs'
import Add from '@mui/icons-material/Add'
import StoreOutlined from '@mui/icons-material/Store'

const TopDash = ({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: any
}) => {
  return (
    <div className="flex mb-4 items-center">
      <div className="flex justify-center items-center bg-red  p-2 rounded-xl mr-4">
        <Icon style={{ color: colors.white, fontSize: 48 }} />
      </div>

      <div>
        <p className="text-black text-2xl font-bold uppercase">{title}</p>
        <p className="text-black font-light">{description}</p>
      </div>
    </div>
  )
}

export default TopDash
