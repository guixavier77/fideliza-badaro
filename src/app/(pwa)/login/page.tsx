'use client'
import ButtonStyled from "@/components/button";
import InputStyled from "@/components/input";
import Logo from "@/components/logo";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from "next/navigation";



export default function Register() {
  const router = useRouter();

  const handleLogin = () => {
    console.log('LOGIN')
  }
  return (
    <main className="w-screen flex flex-col justify-evenly ">
      <Logo />
      <div className="flex flex-col">
        <div className="flex flex-col gap-5">
          <InputStyled
            label="E-mail"
            type="text"
            placeholder="exemplo@gmail.com"
            icon={<MailOutlineIcon style={{ color: '#C90B0B' }} />}
          />
          <InputStyled
            label="Senha"
            type="password"
            placeholder="***********"
            icon={<LockOutlinedIcon style={{ color: '#C90B0B' }} />}
          />
        </div>
        <button className="text-end mt-2 text-black font-bold text-sm">Esqueci minha senha</button>
      </div>
      <div className="flex flex-col gap-4 ">
        <ButtonStyled
          onClick={handleLogin}
          styles="w-full"
          bgColor='bg-red'
          title="Entrar"
        />
        <ButtonStyled
          onClick={() => router.push('/register')}
          styles="w-full"
          title="Cadastre-se"
        />
      </div>
    </main>
  )
}
