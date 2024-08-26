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
import { generatePassword } from '@/utils/password';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WcIcon from '@mui/icons-material/Wc';

const functions = [
  {
    name: ROLE_PTBR[ROLE.ADMIN],
    value: ROLE.ADMIN
  },
  {
    name: ROLE_PTBR[ROLE.OPERATOR],
    value: ROLE.OPERATOR

  },
]

const ModalUsers = ({ open, setIsClose, userData }: any) => {
  const { stores, storeSelected,user } = useContext(DefaultContext);
  const [loading, setloading] = useState(false);

  const optionsStores = useMemo(() => stores?.map(store => ({ value: store.id, text: store.name })), [stores])

  const options = useMemo(() => functions.map(item => ({ value: item.value, text: item.name })), [functions])

  const optionsSex = [
    { value: 'm', text: 'Masculino' },
    { value: 'f', text: 'Feminino' },
    { value: 'i', text: 'Indefinido' },
  ];
  

  useEffect(() => {
    if (!open) return formik.resetForm();
    if (userData) {
      const {
        name,
        cpf,
        email,
        phone,
        password,
        sex,
        role,
        active,
        storeId,
      } = userData;
      formik.setValues({
        name: name,
        cpf: cpf,
        email: email,
        phone: phone,
        password: password,
        sex: sex,
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
      phone: '',
      password: '',
      sex: 'm',
      storeId: "",
      role: ROLE.OPERATOR,
      active: true,
    },
    onSubmit: async (values) => {
      setloading(true);

      const data = {
        cpf: masks.unmask(values.cpf),
        email: values.email,
        name: values.name,
        phone: masks.unmask(values.phone),
        sex: values.sex,
        active: true,
        role: values.role,
        storeId: 1,
        password: await generatePassword(values.password),
      }

      api.post('users', data)
        .then()
        .catch((e) => console.log(e))
        .finally(() => {
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
            id="phone"
            value={masks.phoneMask(formik.values.phone)}
            onChange={formik.handleChange}
            label="Telefone"
            type="text"
            placeholder="99 9999-9999"
            icon={<LocalPhoneIcon style={{ color: '#C90B0B' }} />}
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
            label="Sexo"
            icon={<WcIcon style={{ color: '#C90B0B' }} />}
            value={formik.values.sex}
            onChange={formik.handleChange}
            id="sex"
            options={optionsSex}
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