import i18n from 'i18next';

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

export const getMoneyView = (money: number) => {
  const lang = i18n.language;

  if (lang === 'uk' || lang === 'ru') {
    return `${money.toLocaleString(lang, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })} $`;
  }

  return `$ ${money.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};
