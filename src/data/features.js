import {
  ClockIcon,
  Cog8ToothIcon,
  CubeTransparentIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid';

const features = [
  {
    color: 'green',
    Icon: CubeTransparentIcon,
    id: 'transparent',
    title: 'Transparente',
    description: (
      <p>
        Cualquier miembro puede <mark>añadir</mark>, <mark>editar</mark> o{' '}
        <mark>eliminar</mark> gastos del grupo.
      </p>
    )
  },
  {
    color: 'rose',
    Icon: Cog8ToothIcon,
    id: 'functional',
    title: 'Funcional',
    description: (
      <p>
        Cost<i>D</i> calculará cuánto debe cada miembro{' '}
        <mark>automáticamente</mark>.
      </p>
    )
  },
  {
    color: 'sky',
    Icon: ClockIcon,
    id: 'efficient',
    title: 'Eficiente',
    description: (
      <p>
        Cost<i>D</i> <mark>minimizará</mark> las transacciones para que todos
        paguen lo <mark>justo</mark> el <mark>mínimo</mark> número de veces.
      </p>
    )
  },
  {
    color: 'yellow',
    Icon: UserGroupIcon,
    id: 'collaborative',
    title: 'Colaborativo',
    description: (
      <p>
        Comparte grupos rápidamente mediante un <mark>código QR</mark> o un{' '}
        <mark>enlace</mark> a tus amigos.
      </p>
    )
  }
];

export default features;
