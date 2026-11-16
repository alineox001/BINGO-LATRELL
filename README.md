# Bingo en vivo – Latrell City (v6.1, multi-anfitrión)
Sin dependencias. Requiere Node 18 o superior.

**Novedad v5:** el bingo ahora es del **1 al 50**. El tablero del anfitrión tiene 50 casillas (8 columnas) y cada participante recibe un cartón de 16 números **al azar entre el 1 y el 50**. Las imágenes están en `public/board.jpg` (anfitrión) y `public/card.jpg` (participantes).

## Panel del anfitrión (novedades)
- **Personas y cartillas:** el panel muestra cuántas personas hay y cuántas cartillas en total. Antes de empezar lista a todos con su cantidad de cartillas (🎟️); durante la partida el ranking también la muestra.
- **Hasta 5 premios:** elige "Puestos a premiar" de 1 a 5 y escribe un premio por puesto.
- **Desempate:** si varios completan en el mismo número y el empate afecta a un puesto premiado, aparece **🎲 Desempate**: sortea al azar el orden entre los empatados.
- **Más cartillas:** escribe el nick (con autocompletado), elige +1…+5 o −1 y pulsa **🎟️ Cartillas**. Solo antes de sacar el primer número; máximo 10 por persona. Se conservan en "Nueva partida" (se regeneran con otros números). El participante cambia entre sus cartillas con las pestañas 🎟️1, 🎟️2… y gana con la primera que complete.
- Sin scroll: las listas muestran lo que cabe y un "+N más".

Cada anfitrión tiene **su propia partida**, su **propio enlace de participantes** y su **propio panel privado**.
Solo quien tenga tu **clave maestra** puede crear partidas.

## Uso local
    ADMIN_KEY=miclave node server.js
Abre http://localhost:3000/ → "Crear mi partida" (te pide la clave maestra).

## Render
- Start command: `node server.js`
- Variable de entorno `ADMIN_KEY` = tu clave maestra (si ya tenías `HOST_KEY`, también se acepta como clave maestra).
- Debe correr con **1 sola instancia** (las partidas viven en la memoria del proceso).

## Enlaces
| Quién | Enlace |
|---|---|
| Crear partidas (con clave maestra) | `https://TU-APP.onrender.com/` |
| Participantes de una partida | `https://TU-APP.onrender.com/s/CODIGO` |
| Anfitrión de esa partida (privado) | `https://TU-APP.onrender.com/s/CODIGO/host?key=CLAVE_DE_LA_SALA` |

- **Código**: aleatorio (6 caracteres) o personalizado (3–30: minúsculas, números y guiones).
- Al crear la sala se muestra el enlace del panel **una sola vez**; guárdalo.
- **✏️ Cambiar** (junto a "Copiar", en el panel): cambia el enlace de participantes con confirmación; puedes escribir un nombre o dejarlo vacío para uno aleatorio.
  El enlace anterior deja de funcionar y los participantes conectados reciben un aviso. La partida y los lugares de los participantes **se conservan**: al abrir el enlace nuevo recuperan su cartón.
- Los participantes también pueden escribir el código en la página principal.

## Variables opcionales
- `ROOM_TTL_HOURS` (12): horas sin actividad ni conexiones tras las cuales se borra una sala.
- `MAX_ROOMS` (200): máximo de salas simultáneas.
- `DATA_DIR` (`./data`): dónde se guarda `rooms.json` (códigos y claves de las salas).

## Persistencia (importante)
- El estado de cada partida (números, participantes) vive en memoria: si Render reinicia, se pierde.
- Los **códigos y claves de las salas** se guardan en `data/rooms.json`: si el disco persiste (Render Disk) los enlaces siguen funcionando tras un reinicio (con la partida vacía). Sin disco persistente, hay que volver a crear las salas.
- En el plan gratuito de Render el servicio se duerme tras ~15 min sin tráfico.

## Seguridad
- Crear salas exige la clave maestra; tras 8 intentos fallidos desde una IP se bloquea 10 minutos.
- La clave de cada sala solo sirve en esa sala.

## Demo sin servidor
`bingo-demo.html` sigue siendo la demo de una sola partida (no usa salas).

## Novedades v6.1 (solo robustez, sin cambiar el juego)
- El servidor ya no se cae con peticiones malformadas; hay captura global de errores.
- Los participantes **se reconectan solos** si el servidor reinicia o Render despierta.
- Límites: intentos de clave de sala (429), y máx. 150 `/join` por minuto y por IP.
- La IP usada para el freno es la última de `X-Forwarded-For` (la que añade el proxy), no la que envía el cliente.
- Un código de enlace cambiado ya no puede reutilizarse (hasta reiniciar).
- Nombres sin caracteres invisibles/bidireccionales; página comprimida con gzip; motor más rápido (Set + un solo cálculo de ganadores por envío).
- La demo se regeneró con el motor y la interfaz actuales. `npm test` ejecuta pruebas del motor.

## Funciones ya existentes (no documentadas antes)
Sorteo automático (cada N segundos), voz y sonido, expulsar participantes, reiniciar toda la página (borra participantes e historial).
