import React from 'react'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GraphicDash from '@/components/DashComponents/GraphicDash';
const DashboardContent = ({ hidden }: any) => {
  const CardDash = ({ icon, title, value }: any) => {
    return (
      <div className='bg-black py-4 flex rounded-20 px-6 w-64'>
        {React.cloneElement(icon, {
          style: {
            fontSize: 74,
            color: '#FFFFFF',
          }
        })}
        <div className='pl-5'>
          <p className='text-white font-bold text-4xl'>{value}</p>
          <p className='text-white font-extralight text-2xl'>{title}</p>

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