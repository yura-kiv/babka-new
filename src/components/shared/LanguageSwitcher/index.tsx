import React from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown, { type DropdownProps } from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';
import classNames from 'classnames';
import { FaChevronDown } from 'react-icons/fa';

import ukFlagSrc from '@/assets/icons/ukFlag.svg';
import uaFlagSrc from '@/assets/icons/uaFlag.svg';
import ruFlagSrc from '@/assets/icons/ruFlag.svg';

import s from './LanguageSwitcher.module.scss';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'En',
    flag: ukFlagSrc,
  },
  {
    code: 'ua',
    name: 'Ua',
    flag: uaFlagSrc,
  },
  {
    code: 'ru',
    name: 'Ru',
    flag: ruFlagSrc,
  },
];

type Props = {
  dropdownProps?: DropdownProps;
}

const LanguageSwitcher: React.FC<Props> = ({ dropdownProps }) => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language || 'en';
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const renderTrigger = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => (
    <Button
      variant="ghost"
      size="small"
      onClick={toggle}
      icon={<FaChevronDown className={classNames(s.arrow, { [s.open]: isOpen })} size={12} />}
      iconPosition='right'
    >
      <img src={currentLang.flag} className={s.flagIcon} alt={`${currentLang.code} flag`} />
      <span>{currentLang.name}</span>
    </Button>
  );

  const renderContent = ({ close }: { isOpen: boolean; close: () => void }) => languages.map((lang) => (
    <div
      key={lang.code}
      className={classNames(s.languageItem, {
        [s.active]: currentLanguage === lang.code,
      })}
      onClick={() => {
        changeLanguage(lang.code);
        close();
      }}
    >
      <img src={lang.flag} className={s.flagIcon} alt={`${lang.code} flag`} />
      <span>{lang.name}</span>
    </div>
  ));

  return (
    <Dropdown
      placement="bottom-right"
      contentClassName={s.dropdownContent}
      renderTrigger={renderTrigger}
      renderContent={renderContent}
      {...dropdownProps}
    />
  );
};

export default LanguageSwitcher;
