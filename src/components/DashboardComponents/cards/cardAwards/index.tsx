import User from '@/database/entities/user.entity';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useCallback, useState } from 'react';
import ModalAwards from '../../modals/ModalAwards';
import Image from 'next/image';
import masks from '@/utils/masks/masks';
import Money from '@/utils/masks/money';


const CardAwards = ({ award }: any) => {
  const [openEdit, setopenEdit] = useState(false);
  const [userSelected, setuserSelected] = useState<User>()
  const handleOpenEditUser = useCallback((user: User) => {
    setuserSelected(user);
    setopenEdit(true);
  }, []);

  const handleCloseEditUser = useCallback(() => {
    setopenEdit(false);
  }, []);
  return (
    <div className='bg-white shadow-lg rounded-40 py-2 px-4'>
      <div className='flex items-center'>
        <div className={`${award?.status ? 'bg-green' : 'bg-red'} mr-2 flex justify-normal items-center rounded-xl p-1`}>
          <Image src={award?.image_url} alt='Imagem do premio' width={20}
            height={20} />
        </div>
        <div className='grid grid-cols-12 gap-x-4 items-center w-full pl-2'>
          <p className='font-bold col-span-3 text-left'>{award?.name}</p>
          <p className='font-bold col-span-3 text-left'>{Money.centsToMaskMoney(award?.price)}</p>
          {/* <p className='font-light col-span-2'>{masks.cpfMask(award.cpf)}</p>
          <p className='font-light col-span-4'>{award.email}</p>
          <p className='font-medium col-span-2 '>{ROLE_PTBR[award.role]}</p> */}
          <button onClick={() => handleOpenEditUser(award)} className='col-start-12 col-span-1 text-right'><ModeEditOutlineIcon /></button>
        </div>
      </div>

      <ModalAwards
        open={openEdit}
        setIsClose={handleCloseEditUser}
        userData={userSelected}

      />
    </div>
  )
}

export default CardAwards