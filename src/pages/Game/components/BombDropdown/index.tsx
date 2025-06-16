import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '@/components/ui/Dropdown';
import classNames from 'classnames';
import { FaChevronDown } from 'react-icons/fa';
import s from './styles.module.scss';
import Button from '@/components/ui/Button';
import type { BombsCount } from '@/types';

interface BombDropdownProps {
  value?: BombsCount;
  setValue?: (value: BombsCount) => void;
  disabled?: boolean;
}

const BOMB_OPTIONS: BombsCount[] = [1, 2, 3];

const BombDropdown: React.FC<BombDropdownProps> = ({
  value,
  setValue,
  disabled = false,
}) => {
  const { t } = useTranslation();

  const bombIcon = <img src="/imgs/game/bombIcon.svg" alt="bombIcon" className={s.bomb} />;

  const renderTrigger = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => (
    <Button
      fullWidth
      size="large"
      borderRadius='small'
      variant="outline"
      onClick={toggle}
      className={classNames(s.trigger, { [s.open]: isOpen })}
      disabled={disabled}
    >
      {bombIcon}
      <span className={s.label}>{t('bombsSelection', { count: value })}</span>
      <FaChevronDown size={16} className={s.chevron} />
    </Button>
  );

  const renderContent = ({ close }: { isOpen: boolean; close: () => void }) => (
    <>
      {BOMB_OPTIONS.map((bomb) => (
        <div
          key={bomb}
          className={classNames(s.option, { [s.active]: bomb === value })}
          onClick={() => {
            setValue?.(bomb);
            close();
          }}
        >
          {bombIcon}
          {t('bombsSelection', { count: bomb })}
        </div>
      ))}
    </>
  );

  return (
    <Dropdown
      renderTrigger={renderTrigger}
      renderContent={renderContent}
      className={s.dropdown}
      contentClassName={s.content}
      placement="bottom-left"
      disabled={disabled}
    />
  );
};

export default BombDropdown;
