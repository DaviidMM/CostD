import {
  ArrowsPointingOutIcon,
  ClockIcon,
  Cog8ToothIcon,
  CubeTransparentIcon,
} from '@heroicons/react/24/solid';
import { BsCurrencyDollar } from 'react-icons/bs';
import Link from 'next/link';
import Button from '../components/Button';
import ColoredText from '../components/ColoredText';
import Feature from '../components/Feature';
import StepCard from '../components/StepCard';
import Typed from '../components/Typed';
import useAuth from '../hooks/useAuth';
import { useLoginModal } from '../hooks/useLoginModal';

const steps = [
  {
    title: 'Inicia sesión',
    description: 'Inicia sesión con tu cuenta de Google o Twitter.',
    image: { src: '/login.svg', alt: 'Iniciar sesión' },
  },
  {
    title: 'Crea un grupo o únete a uno',
    description: (
      <>
        ¡Puedes crear tu grupo para compartirlo o unirte a uno que otra persona
        haya creado!
        <br />
        <br />
        Para unirte a un grupo, solo necesitas que el creador o algún miembro lo
        comparta contigo.
      </>
    ),
    image: { src: '/share-group.svg', alt: 'Compartir grupo' },
  },
  {
    title: 'Añade gastos',
    description: (
      <>
        Añade gastos a tu grupo. <br />
        ¡Puedes decidir quien es parte de ese gasto!
      </>
    ),
    image: { src: '/add-expense.svg', alt: 'Añadir gasto' },
  },
  {
    title: (
      <>
        Deja que Cost<i>D</i> haga el resto
      </>
    ),
    description: (
      <>
        Cost<i>D</i> ajustará los gastos de cada miembro del grupo y minimizará
        las transacciones, de tal manera que todos paguen lo justo.
      </>
    ),
    image: { src: '/calculator-0.svg', alt: 'Calculadora a 0' },
  },
];

export default function HomePage({ groups }) {
  const { status } = useAuth();

  const { openLoginModal } = useLoginModal();

  return (
    <div>
      <section className="flex flex-col items-center gap-16 mb-24 md:gap-0 md:justify-between md:flex-row">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-5xl font-bold text-center md:text-left md:mb-12 md:text-7xl">
            <ColoredText color="sky">Organiza</ColoredText>{' '}
            <ColoredText color="orange">gastos</ColoredText>
            <br />
            con tus
            <br />
            <Typed
              className="block h-24"
              color="purple"
              gradientColor
              texts={['amigos', 'familiares', 'compañeros']}
              typeSpeed={100}
            />
          </h1>
          <p className="self-start mb-12 text-3xl font-semibold">
            Comparte gastos de la manera más <br />{' '}
            <ColoredText color="orange">simple</ColoredText> posible
          </p>
          {status === 'authenticated' ? (
            <Link href="/groups">
              <Button className="px-8 py-4 text-4xl !rounded-full" color="rose">
                Ver mis grupos
              </Button>
            </Link>
          ) : (
            <Button
              className="px-8 py-4 text-4xl !rounded-full"
              onClick={() => openLoginModal()}
            >
              ¡Comenzar!
            </Button>
          )}
        </div>
        <div className="h-56 md:relative md:h-[26rem]">
          <img
            src="/sharing-expenses.svg"
            className="w-full h-full"
            alt="Group sharing expenses"
          />
        </div>
      </section>
      <section className="grid mb-24 md:gap-6 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
        <Feature
          color="blue"
          Icon={ArrowsPointingOutIcon}
          id="multiplatform"
          title="Multiplataforma"
        >
          <p>
            Cost<i>D</i> se puede usar en <mark>cualquier</mark> dispositivo con
            acceso a internet.
          </p>
        </Feature>
        <Feature
          color="green"
          Icon={CubeTransparentIcon}
          id="transparent"
          title="Transparente"
        >
          <p>
            Cualquier miembro puede <mark>añadir</mark>, <mark>editar</mark> o{' '}
            <mark>eliminar</mark> gastos del grupo.
          </p>
        </Feature>
        <Feature
          color="rose"
          Icon={Cog8ToothIcon}
          id="functional"
          title="Funcional"
        >
          <p>
            Cost<i>D</i> calculará cuánto debe cada miembro{' '}
            <mark>automáticamente</mark>.
          </p>
        </Feature>
        <Feature color="sky" Icon={ClockIcon} id="efficient" title="Eficiente">
          <p>
            Cost<i>D</i> <mark>minimizará</mark> las transacciones para que
            todos paguen lo <mark>justo</mark> el <mark>mínimo</mark> número de
            veces.
          </p>
        </Feature>
      </section>
      <section id="simple">
        <h2 className="mb-10 text-5xl text-center">
          <ColoredText bold color="orange">
            Cost<i>D</i> en 4 pasos
          </ColoredText>
        </h2>
        <div className="flex flex-col gap-4 md:flex-row">
          {steps.map((step, idx) => (
            <StepCard key={idx + 1} step={idx + 1} {...step} />
          ))}
        </div>
      </section>
    </div>
  );
}
