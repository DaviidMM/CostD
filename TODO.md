# Lista de cosas que hacer

- Funcionalidad

  - Añadir al documento de usuario sus grupos. Esos grupos son los que se listarán en `/groups`
  - Cuando un usuario añada un movimiento, no le debe notificar a el mismo
  - Usuario solo vea sus grupos
  - Sistema de notificaciones
    - PUSH
      - Almacenar token de Cloud Messaging en la información de la BD del usuario
      - Crear api para suscribir tokens a "topics". Un topic es una especie de agrupación. Se pueden mandar notificaciones a los topics y les llegarán a todos los tokens suscritos a ese topic.
    - Correo

- Visual:
  - Añadir imagen de como queda una gráfica y explicando que la app te muestra gráficamente los saldos
  - Añadir gasto total y mi gasto

## Futuras mejoras:

- Ordenar movimientos:
  - Por tipo
  - Por cantidad de dinero
  - Por título
  - Por pagador
  - Por categoría
- Sistema de amigos
  - Poder enviar invitación a amigo sin copiar enlace, es decir, que haya un menú de invitar y puedas invitar a tus amigos
  - Panel donde veas quién es tu amigo
  - Solicitar amistad a alguien en función de su email o id
    - Botón para copiar el ID y compartirlo
- Actualizaciones de grupos en tiempo real con firebase
- Sistema de participaciones en un gasto:
  - Por ejemplo: David cuenta como 2 y Victor como 1 solo. Esto repartiria el gasto en 2/3 partes para David y 1/3 para Victor
