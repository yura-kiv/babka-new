import React, { type ReactNode } from 'react';
import s from './styles.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export interface LoaderProps {
  isLoading: boolean;
  children?: ReactNode;
  type?: 'fixed' | 'absolute' | 'replace';
  size?: 'small' | 'medium' | 'large';
  containerClassName?: string;
}

const Loader: React.FC<LoaderProps> = ({
  isLoading,
  children,
  type = 'absolute',
  size = 'medium',
  containerClassName,
}) => {
  const { t } = useTranslation();
  const containerClasses = classNames(
    s.container,
    s[type],
    s[size],
    {
      [s.hasContent]: !!children,
    },
    containerClassName
  );

  const loaderElement = (
    <div className={containerClasses}>
      <div className={s.loader}>
        <div className={s.bombs}>
          <img src='imgs/game/bombSad.svg' alt='bomb' className={s.bombSad} />
          <img
            src='imgs/game/bombHappy.svg'
            alt='bomb'
            className={s.bombHappy}
          />
        </div>
        <span className={s.loading}>{t('loading')}</span>
      </div>
    </div>
  );

  if (type === 'replace') {
    return loaderElement;
  }

  return (
    <>
      {children}
      {isLoading && loaderElement}
    </>
  );
};

export default Loader;
