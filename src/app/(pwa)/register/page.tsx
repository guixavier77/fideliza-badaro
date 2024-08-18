'use client'
import ButtonStyled from "@/components/GlobalComponents/button";
import InputStyled from "@/components/GlobalComponents/input";
import Loading from "@/components/GlobalComponents/loading";
import masks from "@/utils/masks/masks";
import { ROLE } from "@/utils/types/roles";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";


const validate = async (values: any) => {
  const unmaskCpf = values.cpf.replace(/\D/g, "")
  const errors: any = {};
  if (!values.cpf) {
    errors.cpf = 'Este campo é necessário';
  } else if (values.cpf.length < 14) {
    errors.cpf = 'Informe o cpf completo';
  } else if (!masks.validaCpf(unmaskCpf)) {
    errors.cpf = 'CPF inválido';
  }
  return errors;
}


export default function Register() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [sucessRegister, setsucessRegister] = useState(false);
  const formik = useFormik({
    initialValues: {
      cpf: '',
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
      role: ROLE.CUSTOMER
    },
    validate,
    onSubmit: async (values) => {
      setloading(true);
      const data: any = {
        name: values.name,
        cpf: masks.unmask(values.cpf),
        email: values.email,
        phone: values.phone,
        birthDate: values.birthDate,
        role: values.role
      }
      try {

      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        setsucessRegister(false)
      }


    }
  })
  return (
    <main className="w-screen flex flex-col p-4 relative ">
      {loading && <Loading text='Carregando...' />}

      {!loading && <>
        <button className="absolute top-2 left-2"><ArrowBackOutlinedIcon style={{ fontSize: 36, color: '#C90B0B' }} onClick={() => router.push('/login')} /> </button>
        <div className="text-center mt-5 pt-5">
          <PersonOutlineOutlinedIcon />
          <p className="font-bold uppercase text-lg">Cadastro</p>
        </div>
        <form className="flex flex-col " onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2">
            <InputStyled
              id="cpf"
              onChange={formik.handleChange}
              value={masks.cpfMask(formik.values.cpf)}
              label="CPF"
              type="tel"
              placeholder="000.000.000-00"
              icon={<ArticleOutlinedIcon style={{ color: '#C90B0B' }} />}
            />
            <InputStyled
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              label="Nome"
              type="text"
              placeholder="Exemplo"
              icon={<PersonOutlineOutlinedIcon style={{ color: '#C90B0B' }} />}
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
              id="phone"
              value={masks.phoneMask(formik.values.phone)}
              onChange={formik.handleChange}
              label="Telefone"
              type="text"
              placeholder="(00) 00000-0000"
              icon={<LocalPhoneOutlinedIcon style={{ color: '#C90B0B' }} />}
            />

            <InputStyled
              id="birthDate"
              value={masks.dateMask(formik.values.birthDate)}
              onChange={formik.handleChange}
              label="Data de Nascimento"
              type="tel"
              placeholder="DD/MM/YYYY"
              icon={<CalendarMonthOutlinedIcon style={{ color: '#C90B0B' }} />}
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

          </div>

          <div className="mt-5 py-5">
            <ButtonStyled
              type="submit"
              styles="w-full"
              bgColor='bg-red'
              title="Cadastrar"
            />

          </div>






        </form>

      </>}


    </main>
  )
}
