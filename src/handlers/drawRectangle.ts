import robot from 'robotjs';

const drawRectangle = (width: number, height: number): void => {
  const { x, y } = robot.getMousePos();

  robot.mouseToggle('down');
  for (let i = 0; i < width; i++) {
    robot.dragMouse(x + i, y);
  }

  const xEnd = x + width;
  for (let i = 0; i < height; i++) {
    robot.dragMouse(xEnd, y + i);
  }

  const yEnd = y + height;
  for (let i = 0; i < width; i++) {
    robot.dragMouse(xEnd - i, yEnd);
  }

  for (let i = 0; i < height; i++) {
    robot.dragMouse(x, yEnd - i);
  }
  robot.mouseToggle('up');
};

export default drawRectangle;
