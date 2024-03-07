import PointsAnimation from '../../../animations/points'

const HomeContent = ({hidden}) => {
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold'>Acumule pontos <br /> e troque por <br /> benefícios</h1>

      <p className='text-darkGray text-sm font-bold pt-10'>Explore nossos estabelecimentos <br />parceiros, ganhe pontos e desfrute de<br /> benefícios exclusivos ao trocá-los.</p>
      <PointsAnimation />

    </div>
  )
}

export default HomeContent