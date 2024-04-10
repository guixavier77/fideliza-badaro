import User from '@/database/entities/user.entity';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useCallback, useState } from 'react';
import ModalAwards from '../../modals/ModalAwards';
import Image from 'next/image';
import masks from '@/utils/masks/masks';
import Money from '@/utils/masks/money';


const CardAwards = ({ award }: any) => {
  const [openEdit, setopenEdit] = useState(false);
  const [awardSelected, setawardSelected] = useState<User>()
  const handleOpenEditUser = useCallback((user: User) => {
    setawardSelected(user);
    setopenEdit(true);
  }, []);

  const handleCloseEditUser = useCallback(() => {
    setopenEdit(false);
  }, []);
  return (
    <div className='bg-white shadow-lg rounded-40 py-2 px-4'>
      <div className='flex items-center'>
        <Image src={award?.image_url} alt='Imagem do premio' width={40}
          height={40} />
        <div className='grid grid-cols-6 items-center w-full pl-3'>
          <p className='font-bold col-span-2 text-left'>{award?.name}</p>
          <p className='font-bold text-left col-span-2'>{Money.centsToMaskMoney(award?.price)}</p>
          <div className='col-span-2 flex'>
            <p className={`${award?.status ? 'bg-green' : 'bg-red'} rounded-20 text-white px-3 py-1 `}>{`${award?.status ? 'Ativo' : 'Inativo'}`}</p>
          </div>
          <button onClick={() => handleOpenEditUser(award)} className='col-start-12 col-span-1 text-right'><ModeEditOutlineIcon /></button>
        </div>
      </div>

      <ModalAwards
        open={openEdit}
        setIsClose={handleCloseEditUser}
        awardEdit={awardSelected}

      />
    </div>
  )
}

export default CardAwards