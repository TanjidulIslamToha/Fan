const blades = document.getElementById('blades');
const powerButton = document.getElementById('powerBtn');
const fanContainer = document.querySelector('.fan-container');

let angle = 0;
let speed = 0; // current speed
let targetSpeed = 0; // target speed
const maxSpeed = 50; // degrees per frame at max
const accel = 0.08; // acceleration rate
const decel = 0.15; // deceleration rate

let isRunning = false;
let isAnimating = false;

function animate() {
  isAnimating = true;
  if (speed < targetSpeed) {
    speed = Math.min(targetSpeed, speed + accel);
  } else if (speed > targetSpeed) {
    speed = Math.max(targetSpeed, speed - decel);
  }

  if (speed > 0) {
    angle = (angle + speed) % 360;
    blades.style.transform = `rotate(${angle}deg)`;
    requestAnimationFrame(animate);
  } else {
    speed = 0;
    isAnimating = false;
  }
}

powerButton.addEventListener('click', () => {
  isRunning = !isRunning;
  fanContainer.classList.toggle('fan-on', isRunning);
  powerButton.classList.toggle('active', isRunning);

  targetSpeed = isRunning ? maxSpeed : 0;

  if (!isAnimating) {
    requestAnimationFrame(animate);
  }
}); 