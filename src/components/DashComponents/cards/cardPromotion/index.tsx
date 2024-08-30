
import ButtonStyled from '@/components/GlobalComponents/button';
import { DefaultContext } from '@/contexts/defaultContext';
import Award from '@/interfaces/award.interface';
import Promotion from '@/interfaces/promotion.interface';
import Money from '@/utils/masks/money';
import FlagIcon from '@mui/icons-material/Flag';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import Image from 'next/image';
import { useContext, useState } from 'react';
import ModalPromotions from '../../modals/ModalPromotions';
import logoPng from '../../../../assets/logo.png'

interface CardPromotionProps {
  promotion: Promotion;
}

interface AwardsDictionary {
  [key: string]: Award;
};



const CardPromotion: React.FC<CardPromotionProps> = ({ promotion }) => {
  const {storeSelected} = useContext(DefaultContext);
  const [awardsDicionary, setawardsDicionary] = useState<AwardsDictionary>();


  const [openEdit, setOpenEdit] = useState(false);
  return (
    <div className='relative bg-white shadow-lg rounded-20 w-60 hover:shadow-xl transition-shadow duration-300'>
      <div className={`absolute top-0 right-0 rounded-tr-20 rounded-bl-20 px-4 py-1 text-white font-bold ${promotion?.active ? 'bg-green' : 'bg-red'}`}>
        {promotion?.active ? 'Ativo' : 'Inativo'}
      </div>
      <div className='px-4 flex w-full flex-col pt-10'>
        <div className='flex flex-col items-center'>
          <Image
            src={awardsDicionary ? awardsDicionary[promotion.awardId]?.image_url : logoPng}
            alt='Imagem do prêmio'
            width={150}
            height={150}
          />
          <p className='font-medium text-lg text-center mt-4'>
            {awardsDicionary ? awardsDicionary[promotion.awardId]?.name : 'Indefinido'}
          </p>
          <p className='font-light text-gray-500 text-center mt-2'>
            {awardsDicionary ? Money.centsToMaskMoney(awardsDicionary[promotion.awardId]?.price) : Money.centsToMaskMoney(0)}
          </p>
        </div>
        <div className='flex flex-col relative '>
          <p className='font-bold text-left text-lg my-3 flex items-center'>
            <MonetizationOn style={{ color: '#C90B0B' }} className='mr-2' />
            {promotion?.name.substring(0, 20)}
          </p>
          <p className='font-bold text-left text-lg flex items-center'>
            <FlagIcon style={{ color: '#C90B0B' }} className='mr-2' />
            {promotion?.points} Pontos
          </p>
        </div>
      </div>

      <div className={`bg-black rounded-b-20 w-full mt-4 flex items-center justify-center`}>
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