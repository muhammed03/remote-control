import robot from 'robotjs';
import Jimp from 'jimp';

const CAPTURE_SIZE = 200;

export const printScreen = async (): Promise<string> => {
  const { x, y } = robot.getMousePos();
  const bitMap = robot.screen.capture(x, y, CAPTURE_SIZE, CAPTURE_SIZE);
  const jImage = new Jimp(CAPTURE_SIZE, CAPTURE_SIZE);

  await new Promise<void>((resolve) => {
    let position = 0;

    jImage.scan(0, 0, jImage.bitmap.width, jImage.bitmap.height, (x, y, idx) => {
      jImage.bitmap.data[idx + 2] = bitMap.image.readUInt8(position++);
      jImage.bitmap.data[idx + 1] = bitMap.image.readUInt8(position++);
      jImage.bitmap.data[idx + 0] = bitMap.image.readUInt8(position++);
      jImage.bitmap.data[idx + 3] = bitMap.image.readUInt8(position++);

      if (x == jImage.bitmap.width - 1 && y == jImage.bitmap.height - 1) resolve();
    });
  });

  const buffer = await jImage.getBase64Async(Jimp.MIME_PNG);
  const result = buffer.slice(22);
  return result;
};
