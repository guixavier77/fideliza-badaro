import User from '@/database/entities/user.entity';
import masks from '@/utils/masks/masks';
import { ROLE_PTBR } from '@/utils/types/roles';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useCallback, useState } from 'react';
import ModalPromotions from '../../modals/ModalPromotions';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ModalAwards from '../../modals/ModalAwards';


const CardAwards = ({ promotion }: any) => {
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
        <div className={`${promotion.status ? 'bg-green' : 'bg-red'} mr-2 flex justify-normal items-center rounded-xl p-1`}>
          <AttachMoneyOutlinedIcon style={{ fontSize: 32, color: '#FFFFFF' }} />
        </div>
        <div className='grid grid-cols-12 gap-x-4 items-center w-full pl-2'>
          <p className='font-bold col-span-3 text-left'>{promotion.name}</p>
          <p className='font-light col-span-2'>{masks.cpfMask(promotion.cpf)}</p>
          <p className='font-light col-span-4'>{promotion.email}</p>
          <p className='font-medium col-span-2 '>{ROLE_PTBR[promotion.role]}</p>
          <button onClick={() => handleOpenEditUser(promotion)} className='col-start-12 col-span-1 text-right'><ModeEditOutlineIcon /></button>
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