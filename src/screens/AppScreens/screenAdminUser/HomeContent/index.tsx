import { useContext } from 'react';
import PointsAnimation from '@/components/animations/points';
import { DefaultContext } from '@/contexts/defaultContext';
import { ROLE } from '@/utils/types/roles';

interface HomeContentProps {
  hidden: boolean;
}


const AppHomeContent: React.FC<HomeContentProps> = ({ hidden }) => {
  const {user} = useContext(DefaultContext);
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold'>Bem vindo ao <br/> nosso App!</h1>

      <p className='text-darkGray text-sm font-bold pt-10'>Gerencie seus clientes, <br/> acompanhe resgates de prêmios e <br/> otimize a experiência dos clientes com <br/> benefícios exclusivos.</p>
      <PointsAnimation />
    </div>
  )
}

export default AppHomeContent