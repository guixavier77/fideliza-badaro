import React from 'react'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GraphicDash from '@/components/DashComponents/GraphicDash';
const DashboardContent = ({ hidden }: any) => {
  const CardDash = ({ icon, title, value }: any) => {
    return (
      <div className='flex bg-black rounded-20 w-64 px-6 py-4'>
        {React.cloneElement(icon, {
          style: {
            fontSize: 74,
            color: '#FFFFFF',
          }
        })}
        <div className='pl-5'>
          <p className='text-4xl text-white font-bold'>{value}</p>
          <p className='text-2xl text-white font-extralight'>{title}</p>

        </div>

      </div>
    )
  }
  return (
    <div hidden={hidden} className='w-full'>
  
    </div>
  )
}

export default DashboardContent