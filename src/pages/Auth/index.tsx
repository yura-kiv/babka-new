import React from 'react';
import { TabSwitch } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import s from './styles.module.scss';

const Auth: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState('login');

  const tabOptions = [
    { id: 'login', label: t('auth.login') },
    { id: 'register', label: t('auth.registration') },
  ];

  return (
    <div className={s.wrapper}>
      <TabSwitch
        options={tabOptions}
        activeId={activeTab}
        onChange={setActiveTab}
        size='large'
        fullWidth
      />
      {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default Auth;
