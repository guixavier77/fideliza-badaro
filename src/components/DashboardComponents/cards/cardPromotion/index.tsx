
import ButtonStyled from '@/components/GlobalComponents/button';
import { DefaultContext } from '@/contexts/defaultContext';
import Money from '@/utils/masks/money';
import FlagIcon from '@mui/icons-material/Flag';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import Image from 'next/image';
import { useContext, useState } from 'react';
import ModalPromotions from '../../modals/ModalPromotions';



const CardPromotion = ({ promotion }: any) => {
  const { awardsDicionary } = useContext(DefaultContext);
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <div className='bg-white shadow-lg rounded-20 w-60'>
      <div className='px-2 flex w-full flex-col'>
        <div className='flex flex-col items-center'>
          <Image
            src={awardsDicionary ? awardsDicionary[promotion.awardId]?.image_url : ''} alt='Imagem do premio'
            width={150}
            height={150}
          />
          <p className='font-light text-center'>{awardsDicionary ? awardsDicionary[promotion.awardId]?.name : ''}</p>
          <p className='font-light text-center'>{awardsDicionary ? Money.centsToMaskMoney(awardsDicionary[promotion.awardId]?.price) : ''}</p>
        </div>
        <div className='flex flex-col'>

          <p className='font-bold  text-left my-3'><MonetizationOn style={{ color: '#C90B0B' }} /> {promotion?.name.substring(0, 20)}</p>
          <p className='font-bold text-left '><FlagIcon style={{ color: '#C90B0B' }} /> {promotion?.points} Pontos</p>
          {/* <div className=' flex'>
            <p className={`${promotion?.active ? 'bg-green' : 'bg-red'} rounded-20 text-white px-3 py-1 `}>{`${promotion?.active ? 'Ativo' : 'Inativo'}`}</p>
          </div> */}

        </div>
      </div>

      <div className='bg-black w-full h-10 rounded-b-20 mt-2'>
        <ButtonStyled
          type="button"
          onClick={() => setOpenEdit(true)}
          styles="w-full"
          title="Editar"
        />
      </div>
      <ModalPromotions
        open={openEdit}
        setIsClose={() => setOpenEdit(false)}
        promotionEdit={promotion}
      />
    </div>
  )
}

export default CardPromotion