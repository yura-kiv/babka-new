import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <h1>404</h1>
    </div>
  );
};

export default NotFound;
