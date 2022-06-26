import robot from 'robotjs';

import { COMMAND } from '../commands';
import drawCircle from './drawCircle';
import drawRectangle from './drawRectangle';
import { printScreen } from './printScreen';

export const handleCommand = async (command: string, option: string[]) => {
  const [option1, option2] = option;

  let sendOption = '';
  const { x, y } = robot.getMousePos();
  switch (command) {
    case COMMAND.mousePosition:
      sendOption = `${x},${y}`;
      break;
    case COMMAND.mouseUp:
      robot.moveMouse(x + 1, y - +option1);
      break;
    case COMMAND.mouseDwn:
      robot.moveMouse(x + 1, y + +option1);
      break;

    case COMMAND.mouseLeft:
      robot.moveMouse(x - +option1, y + 1);
      break;

    case COMMAND.mouseRight:
      robot.moveMouse(x + +option1, y + 1);
      break;

    case COMMAND.drawRectangle:
      drawRectangle(+option1, +option2);
      break;
    case COMMAND.drawSquare:
      drawRectangle(+option1, +option1);
      break;
    case COMMAND.drawCircle:
      drawCircle(+option1);
      break;
    case COMMAND.prntScrn:
      const raw = await printScreen();
      sendOption = raw;
      break;
    default:
      break;
  }

  return sendOption;
};
