import React from 'react'
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';


const WalletContent = ({ hidden }) => {
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center mb-5'>Pontos</h1>

      <div className='bg-white shadow-md py-4 px-3 rounded-20 flex justify-between items-center relative'>
        <div className='absolute top-0 right-5 bg-yellow px-3 rounded-b-xl'>
          <p className='text-[9px] text-black font-bold'>Em andamento</p>
        </div>
        <div className='flex items-center gap-2'>
          <StoreMallDirectoryIcon style={{ fontSize: 52 }} />
          <div>
            <p className='font-bold'>Nome da Loja</p>
            <p className='font-extralight'>Nome da promoção</p>
          </div>

        </div>


        <p className='font-extralight text-2xl'>
          10/
          <span className='font-bold'>20</span>
        </p>



      </div>

    </div>
  )
}

export default WalletContent