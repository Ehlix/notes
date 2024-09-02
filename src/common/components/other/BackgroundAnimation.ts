import { debounce } from "@/common/utils/debounce";

const X_SPEED = 1;
const pixelRatio = 1.5;

export const InitCanvas = (canvas: HTMLCanvasElement) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const scaledWidth = width * pixelRatio;
  const scaledHeight = height * pixelRatio;
  if (!canvas) throw new Error("canvas is not defined");

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas context is not defined");

  const genStars = () => {
    const amount = Math.floor((width * height) / 4500);
    return new Array(amount).fill(0).map(() => ({
      x: Math.random() * scaledWidth,
      y: Math.random() * scaledHeight,
      size: Math.random() * 1.5 + 0.25,
      speedX: Math.random() * X_SPEED - X_SPEED / 2,
      speedY: (Math.random() * 0.25 + 0.05) * pixelRatio,
    }));
  };

  let stars = genStars();

  let opacityOverride = 0;

  const upd = debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    opacityOverride = 0;
    stars = genStars();
  }, 400);

  window.addEventListener("resize", function () {
    upd();
  });

  const draw = () => {
    ctx.clearRect(0, 0, scaledWidth, scaledHeight);

    if (opacityOverride < 1) opacityOverride += 0.005;

    for (const star of stars) {
      /** fade out stars on their way up */
      const posOpacity = star.y / scaledHeight;

      ctx.beginPath();
      ctx.fillStyle = `hsla(0, 0%, 100%, ${
        (star.size / 7.5) * posOpacity * opacityOverride
      })`;
      ctx.arc(star.x, star.y, star.size * pixelRatio, 0, Math.PI * 2);
      ctx.fill();

      star.y -= star.speedY;
      star.x += star.speedX;

      if (star.y < -star.size) {
        star.y = scaledHeight + star.size;
      } else if (star.x > scaledWidth || star.x < 0) {
        star.speedX *= -1;
      }
    }

    requestAnimationFrame(draw);
  };

  draw();
};
