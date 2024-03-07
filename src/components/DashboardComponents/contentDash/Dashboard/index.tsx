import React from 'react'
import GroupIcon from '@mui/icons-material/Group';
const DashboardContent = ({ hidden }: any) => {
  console.log(hidden, 'aqui')
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
    <div hidden={hidden}>
      <div className='flex  justify-between '>
        <CardDash title="Clientes" value="390" icon={<GroupIcon />} />
        <CardDash title="Resgates" value="390" icon={<GroupIcon />} />
        <CardDash title="Pontos" value="390" icon={<GroupIcon />} />
      </div>
    </div>
  )
}

export default DashboardContent