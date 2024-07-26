import ButtonStyled from '@/components/GlobalComponents/button';
import InputStyled from '@/components/GlobalComponents/input';
import masks from '@/utils/masks/masks';
import { ROLE, ROLE_PTBR } from '@/utils/types/roles';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useMemo, useState, useEffect, useContext } from 'react';
import SelectStyled from '@/components/GlobalComponents/select';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import api from '@/services/api';
import { DefaultContext } from '@/contexts/defaultContext';
import StoreIcon from '@mui/icons-material/Store';


const functions = [
  {
    name: ROLE_PTBR[ROLE.ADMIN],
    value: ROLE.ADMIN
  },
  {
    name: ROLE_PTBR[ROLE.CASHIER],
    value: ROLE.CASHIER

  },
]

const ModalUsers = ({ open, setIsClose, userData }: any) => {
  const { stores, storeSelected,user } = useContext(DefaultContext);
  const [loading, setloading] = useState(false);

  const optionsStores = useMemo(() => stores?.map(store => ({ value: store.id, text: store.name })), [stores])

  const options = useMemo(() => functions.map(item => ({ value: item.value, text: item.name })), [functions])

  useEffect(() => {
    if (!open) return formik.resetForm();
    if (userData) {
      const {
        name,
        cpf,
        email,
        password,
        role,
        active,
        storeId,
      } = userData;
      formik.setValues({
        name: name,
        cpf: cpf,
        email: email,
        password: password,
        role: role,
        active,
        storeId,
      });
    }
  }, [userData, open])


  const formik = useFormik({
    initialValues: {
      cpf: '',
      name: '',
      email: '',
      password: '',
      storeId: storeSelected,
      role: ROLE.CASHIER,
      active: true,
    },
    onSubmit: async (values) => {
      setloading(true);
      api.post('users', values).then().catch((e) => console.log(e)).finally(() => {
        setloading(false)
        setIsClose();
      });
    }
  })
  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className='bg-white rounded-20 w-1/3 p-4'>
        <p className='font-semibold text-xl text-center uppercase pb-5'>Cadastro de usuário</p>
        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
          <InputStyled
            id="cpf"
            onChange={formik.handleChange}
            value={masks.cpfMask(formik.values.cpf)}
            label="CPF"
            type="tel"
            placeholder="000.000.000-00"
            icon={<ArticleOutlined style={{ color: '#C90B0B' }} />}
          />
          <InputStyled
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            label="Nome"
            type="text"
            placeholder="Exemplo"
            icon={<PersonOutlineOutlined style={{ color: '#C90B0B' }} />}
          />
          <InputStyled
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={userData}
            label="E-mail"
            type="text"
            placeholder="exemplo@gmail.com"
            icon={<MailOutlineIcon style={{ color: '#C90B0B' }} />}
          />

          <InputStyled
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            label="Senha"
            type="password"
            placeholder="***********"
            disabled={userData}
            icon={<LockOutlinedIcon style={{ color: '#C90B0B' }} />}
          />

          <SelectStyled
            label="Função"
            icon={<AccountBoxIcon style={{ color: '#C90B0B' }} />}
            value={formik.values.role}
            onChange={formik.handleChange}
            id="role"
            options={options}
          />

          {user?.role === ROLE.SUPERADMIN &&
            <SelectStyled
              label="Loja"
              icon={<StoreIcon style={{ color: '#C90B0B' }} />}
              value={formik.values.storeId}
              onChange={formik.handleChange}
              id="storeId"
              options={optionsStores}
            />

          }


          <div className='flex gap-5 pt-5'>
            <ButtonStyled
              type="button"
              onClick={setIsClose}
              styles="w-full"
              bgColor='bg-red'
              title="Cancelar"
            />
            {loading ?
              <ButtonStyled
                bgColor='bg-darkGray'
                textColor='text-white'
                type="submit"
                styles="w-full"
                title='Cadastrando...'
                icon={<CircularProgress style={{ width: 20, height: 20, color: '#FFFFFF' }} />}

              /> :
              <ButtonStyled
                type="submit"
                styles="w-full"
                title="Cadastrar"
              />
            }


          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ModalUsers