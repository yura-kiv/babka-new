export const getBombPoints = (from: HTMLElement, to: HTMLElement) => {
  const scrollY = window.scrollY;

  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();

  const fromCenter = {
    x: fromRect.left + fromRect.width / 2,
    y: fromRect.top + fromRect.height / 2 + scrollY,
  };

  const toBottom = {
    x: toRect.left + toRect.width / 2,
    y: toRect.top + toRect.height - 20 + scrollY,
  };

  return {
    from: fromCenter,
    to: toBottom,
  };
};
