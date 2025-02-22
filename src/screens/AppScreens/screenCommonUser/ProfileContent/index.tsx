import InputStyled from '@/components/GlobalComponents/input';
import { DefaultContext } from '@/contexts/defaultContext';
import masks from '@/utils/masks/masks';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect } from 'react';

interface ProfileContentProps {
  hidden: boolean;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ hidden }) => {
  const { user } = useContext(DefaultContext);
  const stylesInput = 'bg-white border-none shadow-sm py-3'
  useEffect(() => {
    console.log(user);
    formik.setValues({
      cpf: user ? user?.cpf : '',
      name: user ? user?.name : '',
      email: user ? user?.email : '',
      phone: user ? user?.phone : '',
      birthDate: user ? user?.birthDate : '',
    })
  }, [user])

  const formik = useFormik({
    initialValues: {
      cpf: '',
      name: '',
      email: '',
      phone: '',
      birthDate: '',
    },
    onSubmit: (values) => {

    }
  })
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center'>Perfil</h1>
      <div className='flex flex-col gap-2'>
        <InputStyled
          edit={true}
          styles={stylesInput}
          id="cpf"
          onChange={formik.handleChange}
          value={masks.cpfMask(formik.values.cpf)}
          label="CPF"
          type="tel"
          placeholder="000.000.000-00"
          icon={<ArticleOutlinedIcon style={{ color: '#C90B0B' }} />}
        />
        <InputStyled
          edit={true}
          styles={stylesInput}
          onChange={formik.handleChange}
          value={formik.values.name}
          id="name"
          label="Nome"
          type="text"
          placeholder="Exemplo"
          icon={<PersonOutlineOutlinedIcon style={{ color: '#C90B0B' }} />}
        />
        <InputStyled
          edit={true}
          styles={stylesInput}
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="E-mail"
          type="text"
          placeholder="exemplo@gmail.com"
          icon={<MailOutlineIcon style={{ color: '#C90B0B' }} />}
        />

        <InputStyled
          edit={true}
          styles={stylesInput}
          onChange={formik.handleChange}
          value={masks.phoneMask(formik.values.phone)}
          id="phone"
          label="Telefone"
          type="text"
          placeholder="(00) 00000-0000"
          icon={<LocalPhoneOutlinedIcon style={{ color: '#C90B0B' }} />}
        />

        <InputStyled
          edit={true}
          id="birthDate"
          styles={stylesInput}
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          label="Data de Nascimento"
          type="tel"
          placeholder="DD/MM/YYYY"
          icon={<CalendarMonthOutlined style={{ color: '#C90B0B' }} />}
        />

      </div>

    </div>
  )
}

export default ProfileContent