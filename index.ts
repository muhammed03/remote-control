import { httpServer } from './src/http-server';
import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';
import { handleCommand } from './src/handlers';

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const WS_PORT = process.env.WS_PORT || 8080;

console.log(`Start static http server on the 3000 port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: +WS_PORT });

const socketArray: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
  socketArray.push(ws);
  const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  wsStream.on('data', async (data) => {
    console.log('received: %s', data);

    try {
      const [command, ...option] = data.toString().split(' ');

      const sendOptionString = await handleCommand(command, option);
      const sendString = `${command} ${sendOptionString}\0`;

      wsStream.write(sendString);
    } catch  {}
  });
});

process.on('SIGINT', () => {
  console.log('1 socketArray=', socketArray);

  socketArray.forEach((ws) => {
    ws.close();
  });
  process.exit(0);
});
