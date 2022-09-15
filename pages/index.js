import Link from 'next/link';
import Button from '../components/Button';
import ColoredText from '../components/ColoredText';
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
            Comparte gastos de la manera más <br /> simple posible
          </p>
          {status === 'authenticated' ? (
            <Link href="/groups">
              <Button className="px-8 py-4 text-4xl rounded-3xl" color="rose">
                Quiero ver mis grupos
              </Button>
            </Link>
          ) : (
            <Button
              className="px-8 py-4 text-4xl rounded-3xl"
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
      <section className="mb-12" id="simple">
        <h2 className="mb-10 text-5xl text-left">
          <ColoredText bold color="sky">
            Simple
          </ColoredText>
        </h2>
        <div className="flex flex-row gap-4">
          {steps.map((step, idx) => (
            <StepCard key={idx + 1} step={idx + 1} {...step} />
          ))}
        </div>
      </section>
      <section className="mb-12" id="transparent">
        <h2 className="mb-10 text-5xl text-right">
          <ColoredText bold color="green">
            Transparente
          </ColoredText>
        </h2>
        <div className="relative z-10 flex flex-row justify-center gap-12 p-4 group">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-600 via-green-700 to-green-600 duration-500 bg-pos-0 group-hover:bg-pos-100 bg-size-200 -z-10 transition-all [transform:skew(3deg)] group-hover:[transform:none]"></div>
          <p className="w-full my-auto text-3xl font-semibold text-right">
            ¡Todos los gastos que se añadan a un grupo los pueden ver y
            modificar todos los miembros!
          </p>
          <div className="w-full">
            <img className="w-11/12" src="/transparent.svg" alt="" />
          </div>
        </div>
      </section>
      <section className="mb-12" id="functional">
        <h2 className="mb-10 text-5xl text-left">
          <ColoredText bold color="rose">
            Funcional
          </ColoredText>
        </h2>
        <div className="relative z-10 flex flex-row justify-center gap-12 p-4 group">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-rose-500 via-rose-700 to-rose-500 duration-500 bg-pos-0 group-hover:bg-pos-100 bg-size-200 -z-10 transition-all [transform:skew(-3deg)] group-hover:[transform:none]"></div>
          <div className="w-full text-right">
            <img className="w-11/12 ml-auto" src="/save-time.svg" alt="" />
          </div>
          <p className="w-full my-auto text-3xl font-semibold text-left">
            Solo tienes que preocuparte de añadir gastos, ¡Cost<i>D</i> se
            encarga de ahorrar tiempo!
          </p>
        </div>
      </section>
      <ol>
        <h1>TODOs</h1>
        <li>
          ✅ Simple: Solo tienes que meter gastos, la app lo hace todo por ti
        </li>
        <li>
          ✅ Transparente: ¡Todos ven los gastos del grupo y pueden
          modificarlos!
        </li>
        <li>Funcional: Texto de Ahorra tiempo con imagen</li>
        <li>Gratis: Costd es gratis</li>
        <li>Hacer diagonal en el header con fondo</li>
      </ol>
    </div>
  );
}
