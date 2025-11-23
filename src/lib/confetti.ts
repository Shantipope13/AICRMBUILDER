export function triggerConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const colors = ['#FFD700', '#00FF94', '#00D4FF', '#FF3366', '#FFB800'];

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    createConfettiPieces(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors,
      })
    );
    createConfettiPieces(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors,
      })
    );
  }, 250);
}

function createConfettiPieces(options: any) {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = options.zIndex.toString();
  document.body.appendChild(container);

  const colors = options.colors || ['#FFD700', '#00FF94'];

  for (let i = 0; i < options.particleCount; i++) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;

    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.left = `${options.origin.x * 100}%`;
    particle.style.top = `${options.origin.y * 100}%`;
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    const angle = Math.random() * Math.PI * 2;
    const velocity = (Math.random() * options.startVelocity) / 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 5;

    container.appendChild(particle);

    animateParticle(particle, vx, vy, options.ticks);
  }

  setTimeout(() => {
    document.body.removeChild(container);
  }, options.ticks * 16.67);
}

function animateParticle(particle: HTMLElement, vx: number, vy: number, ticks: number) {
  let x = 0;
  let y = 0;
  let tick = 0;
  const gravity = 0.5;

  function update() {
    tick++;
    if (tick > ticks) return;

    vy += gravity;
    x += vx;
    y += vy;

    particle.style.transform = `translate(${x}px, ${y}px) rotate(${tick * 5}deg)`;
    particle.style.opacity = (1 - tick / ticks).toString();

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
