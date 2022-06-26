import { Transform } from 'stream';

export class TransportStream extends Transform {
  _transform(chunk: any, encoding: any, cb: () => void) {
    console.log(`TransportStream chunk= ${chunk}`);
    const newChunk = `${chunk}`;
    this.push(newChunk);
    cb();
  }
}
