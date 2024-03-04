'use client'
import ButtonStyled from "@/components/button";
import InputStyled from "@/components/input";
import Loading from "@/components/loading";
import Logo from "@/components/logo";
import { app, auth } from "@/database/firebase/config";
import UserDB from "@/database/wrappers/user";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import email from "next-auth/providers/email";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Register() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setloading(true);
      console.log(values);

      try {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then(() => {
            router.push('/home')
          })
          .catch(error => console.log(error))
          .finally(() => {
            setloading(false);
          })


      } catch (error) {
        console.error(error);
      }


    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className="w-screen flex flex-col justify-evenly ">
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
          <button className="text-end mt-2 text-black font-bold text-sm" onClick={() => router.push('/accountRecovery')}>Esqueci minha senha</button>
        </div>
        <div className="flex flex-col gap-4 ">
          <ButtonStyled
            type="submit"
            styles="w-full"
            bgColor='bg-red'
            title="Entrar"
          />
          <ButtonStyled
            type={undefined}
            onClick={() => router.push('/register')}
            styles="w-full"
            title="Cadastre-se"
          />

        </div>



      </>}
    </form >
  )
}
