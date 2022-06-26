import { httpServer } from './http-server';
import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';
import { handleCommand } from './handlers';

console.log(`Start static http server on the 3000 port!`);
httpServer.listen(3000);

const wss = new WebSocketServer({ port: 8080 });

const socketArray: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
  socketArray.push(ws);
  const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  wsStream.on('data', async (data) => {
    console.log('received: %s', data);

    const [command, ...option] = data.toString().split(' ');

    const sendOptionString = await handleCommand(command, option);
    const sendString = `${command} ${sendOptionString}\0`;

    wsStream.write(sendString);
  });
});

process.on('SIGINT', () => {
  console.log('1 socketArray=', socketArray);

  socketArray.forEach((ws) => {
    ws.close();
  });
  process.exit(0);
});
