import React from 'react';
import s from './styles.module.scss';
import classNames from 'classnames';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  removeOffset?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  className = '',
  align = 'left',
  as = 'h1',
  removeOffset = false,
}) => {
  const HeadingTag = as;

  const getSize = (): 'small' | 'medium' | 'large' => {
    switch (as) {
      case 'h1':
        return 'large';
      case 'h2':
        return 'medium';
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return 'small';
      default:
        return 'medium';
    }
  };

  const titleSize = getSize();

  return (
    <div
      className={classNames(s.pageTitle, s[align], s[titleSize], className, {
        [s.removeOffset]: removeOffset,
      })}
    >
      <HeadingTag className={s.title}>{title}</HeadingTag>
      {subtitle && <p className={s.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
