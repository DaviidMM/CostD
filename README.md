# Puesta en marcha

Para desplegar la aplicación, primero hay que declarar varias variables de entorno. Se puede utilizar el archivo `.env.template` para saber que variables son necesarias.
Cuando la aplicación se ejecute en modo desarrollo, se utilizarán todas las variables que terminan en `_DEV`.

Todos estos datos se obtienen a través de la [consola de firebase](https://console.firebase.google.com/u/0/).

Para obtener la variable `GOOGLE_SA_CREDENTIALS` hay que [obtener las claves de cuenta de firebase admin](#claves-firebase-admin-sdk).

## Claves Firebase Admin SDK

Acceder a `Configuración del proyecto` > `Cuentas de servicio` > `Generar nueva clave privada`. Esto generará un archivo `json`, el cual habrá que codificar en `base64` y eliminar los saltos de línea que haya.

# README.md original NextJS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
