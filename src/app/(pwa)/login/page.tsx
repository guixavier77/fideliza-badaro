'use client'
import ButtonStyled from "@/components/GlobalComponents/button";
import InputStyled from "@/components/GlobalComponents/input";
import Loading from "@/components/GlobalComponents/loading";
import Logo from "@/components/GlobalComponents/logo";

import { DefaultContext } from "@/contexts/defaultContext";
import api from "@/services/api";
import { generatePassword } from "@/utils/password";
import { ROLE } from "@/utils/types/roles";
import Cookies from 'js-cookie'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useFormik } from "formik";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";



export default function Login() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setloading(true);
      setError('');
      try{
        const response = await api.post('authUsers', {
          email: values.email,
          password: await generatePassword(values?.password)
        })
        if(response.status === 200){
          const {user, token} = response?.data;
          if(user && token){
            Cookies.set('token', token, { expires: 30 });
            if(user.role === ROLE.SUPERADMIN) router.push('/dashboard')
            if(user.role === ROLE.ADMIN) router.push('/redirectScreen')
            if(user.role === ROLE.CUSTOMER || user.role === ROLE.OPERATOR) router.push('/home')
        
          }
        } else {
          setError('Credenciais inválidas, tente novamente.')
        }
      }catch{
        setError('Credenciais inválidas, tente novamente.')
        
      }finally{
        setloading(false);
      }
    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className="s:w-screen t:w-3/6 d:w-2/6 mx-auto flex flex-col justify-evenly p-4 h-screen  ">
      {loading && <Loading text="Autenticando..." />}
      {!loading && <>
        <div>
          <Logo />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-5">
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
          </div>
          {error && <p className="text-center text-red font-semibold text-sm">{error}</p>}
          <button type="button" className="text-end mt-2 text-black font-bold text-sm" onClick={() => router.push('/accountRecovery')}>Esqueci minha senha</button>


        </div>
        <div className="flex flex-col gap-4 ">
          <ButtonStyled
            type="submit"
            styles="w-full"
            bgColor='bg-red'
            title="Entrar"
          />

          <ButtonStyled
            type="button"
            onClick={() => router.push('/register')}
            styles="w-full"
            title="Cadastre-se"
          />

        </div>



      </>}
    </form >
  )
}
