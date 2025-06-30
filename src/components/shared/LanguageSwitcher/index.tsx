import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, type DropdownProps } from '@/components/ui';

import ukFlagSrc from '@/assets/icons/ukFlag.svg';
import uaFlagSrc from '@/assets/icons/uaFlag.svg';
import ruFlagSrc from '@/assets/icons/ruFlag.svg';

import s from './styles.module.scss';

interface Language {
  code: string;
  shortName: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: 'en',
    shortName: 'En',
    name: 'English',
    flag: ukFlagSrc,
  },
  {
    code: 'uk',
    shortName: 'Ua',
    name: 'Українська',
    flag: uaFlagSrc,
  },
  {
    code: 'ru',
    shortName: 'Ru',
    name: 'Русский',
    flag: ruFlagSrc,
  },
];

type Props = {
  dropdownProps?: DropdownProps;
};

const LanguageSwitcher: React.FC<Props> = ({ dropdownProps }) => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language || 'en';
  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const renderTrigger = ({
    isOpen,
    toggle,
  }: {
    isOpen: boolean;
    toggle: () => void;
  }) => (
    <Dropdown.TriggerButtonWithChevron
      variant='ghost'
      size='small'
      isOpen={isOpen}
      onClick={toggle}
    >
      <img
        src={currentLang.flag}
        className={s.flagIcon}
        alt={`${currentLang.code} flag`}
      />
      <span>{currentLang.shortName}</span>
    </Dropdown.TriggerButtonWithChevron>
  );

  const renderContent = ({ close }: { isOpen: boolean; close: () => void }) =>
    languages.map((lang) => (
      <Dropdown.WindowItem
        key={lang.code}
        active={lang.code === currentLanguage}
        className={s.languageItem}
        onClick={() => {
          changeLanguage(lang.code);
          close();
        }}
      >
        <img src={lang.flag} className={s.flagIcon} alt={`${lang.code} flag`} />
        <span>{lang.name}</span>
      </Dropdown.WindowItem>
    ));

  return (
    <Dropdown
      placement='bottom-left'
      renderTrigger={renderTrigger}
      renderContent={renderContent}
      {...dropdownProps}
    />
  );
};

export default LanguageSwitcher;
