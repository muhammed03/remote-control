import robot from 'robotjs';

const drawCircle = (radius: number): void => {
  const mousePos = robot.getMousePos();
  robot.setMouseDelay(1);
  robot.mouseToggle('down');
  for (let i = Math.PI * 2; i >= 0; i -= 0.01) {
    const x = mousePos.x + radius * Math.sin(i);
    const y = mousePos.y + radius * Math.cos(i) - radius;
    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');
};

export default drawCircle;
