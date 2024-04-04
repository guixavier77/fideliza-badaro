'use client'
import ButtonStyled from "@/components/button";
import InputStyled from "@/components/input";
import Loading from "@/components/loading";
import Logo from "@/components/logo";
import UserDB from "@/database/wrappers/user";
import { ROLE } from "@/utils/types/roles";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Login() {
  const { data } = useSession();
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
      const user = await new UserDB().getByEmail(values.email);

      if (values.email && values.password) {
        console.log('CAIU AQ')
        const res = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (res?.ok && user?.role === ROLE.CUSTOMER || user?.role === ROLE.CASHIER) {
          router.push('/home');
          setloading(false);
        } else if (res?.ok && user?.role === ROLE.ADMIN || user?.role === ROLE.SUPERADMIN) {
          router.push('/redirectScreen')
          setloading(false);
        } else {
          setError('Opa, algo está errado, tente novamente.');
          setloading(false);
        }
      } else {
        setError('Email e senha precisam ser preenchidos.');
      }
    }
  })

  console.log(error);
  return (
    <form onSubmit={formik.handleSubmit} className="w-screen flex flex-col justify-evenly p-4 h-screen  ">
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
