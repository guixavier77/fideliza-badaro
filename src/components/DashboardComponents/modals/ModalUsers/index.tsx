import ButtonStyled from '@/components/button';
import InputStyled from '@/components/input';
import masks from '@/utils/masks/masks';
import { ROLE, ROLE_PTBR } from '@/utils/types/roles';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import SelectStyled from '@/components/select';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


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

const ModalUsers = ({ open, setIsClose, usersData }: any) => {

  const options = useMemo(() => functions.map(item => ({ value: item.value, text: item.name })), [functions])


  const formik = useFormik({
    initialValues: {
      cpf: '',
      name: '',
      email: '',
      password: '',
      role: ROLE.CASHIER
    },
    onSubmit: async (values) => {

      console.log(values);


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


          <div className='flex gap-5 pt-5'>
            <ButtonStyled
              type="button"
              onClick={setIsClose}
              styles="w-full"
              bgColor='bg-red'
              title="Cancelar"
            />

            <ButtonStyled
              type="submit"
              styles="w-full"
              title="Cadastrar"
            />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ModalUsers