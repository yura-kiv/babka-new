import React from 'react';
import s from './PageTitle.module.scss';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  className = '',
  align = 'left',
  size = 'medium',
}) => {
  return (
    <div className={`${s.pageTitle} ${s[align]} ${s[size]} ${className}`}>
      <h1 className={s.title}>{title}</h1>
      {subtitle && <p className={s.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
