'use client'
import ButtonStyled from "@/components/button";
import InputStyled from "@/components/input";
import Loading from "@/components/loading";
import Logo from "@/components/logo";
import { auth } from "@/database/firebase/config";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Login() {
  const {data} = useSession();
  console.log(data);
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
        signIn('credentials', { 
            email: values.email, 
            password: values.password,
            redirect: false,
          })
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
    <form onSubmit={formik.handleSubmit} className="w-screen flex flex-col justify-evenly p-4 h-screen ">
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
          <button  type="button"  className="text-end mt-2 text-black font-bold text-sm" onClick={() => router.push('/accountRecovery')}>Esqueci minha senha</button>
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