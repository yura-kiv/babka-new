import React from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '@/components/ui/Dropdown';
import classNames from 'classnames';
import { FaChevronDown } from 'react-icons/fa';
import s from './styles.module.scss';
import Button from '@/components/ui/Button';
import type { BombsCount } from '@/types';

interface BombDropdownProps {
  value: BombsCount;
  setValue: (value: BombsCount) => void;
  disabled?: boolean;
}

const BOMB_OPTIONS: BombsCount[] = [1, 2, 3];

const BombDropdown: React.FC<BombDropdownProps> = ({
  value,
  setValue,
  disabled = false,
}) => {
  const { t } = useTranslation();

  const bombIcon = (
    <img src='/imgs/game/bombIcon.svg' alt='bombIcon' className={s.bomb} />
  );

  // const renderTrigger = ({
  //   isOpen,
  //   toggle,
  // }: {
  //   isOpen: boolean;
  //   toggle: () => void;
  // }) => (
  //   <Button
  //     fullWidth
  //     size='large'
  //     borderRadius='small'
  //     variant='outline'
  //     onClick={toggle}
  //     className={classNames(s.trigger, { [s.open]: isOpen })}
  //     disabled={disabled}
  //   >
  //     {bombIcon}
  //     <span className={s.label}>{t('bombsSelection', { count: value })}</span>
  //     <FaChevronDown size={16} className={s.chevron} />
  //   </Button>
  // );

  const renderTrigger = ({
    isOpen,
    toggle,
  }: {
    isOpen: boolean;
    toggle: () => void;
  }) => (
    <Dropdown.TriggerButtonWithChevron
      isOpen={isOpen}
      onClick={toggle}
      disabled={disabled}
      fullWidth
      size='large'
      borderRadius='small'
      variant='outline'
      className={s.trigger}
    >
      {bombIcon}
      <span className={s.label}>{t('bombsSelection', { count: value })}</span>
    </Dropdown.TriggerButtonWithChevron>
  );

  const renderContent = ({ close }: { isOpen: boolean; close: () => void }) =>
    BOMB_OPTIONS.map((bomb) => (
      <Dropdown.WindowItem
        key={bomb}
        active={bomb === value}
        className={s.option}
        onClick={() => {
          setValue(bomb);
          close();
        }}
      >
        {bombIcon}
        {t('bombsSelection', { count: bomb })}
      </Dropdown.WindowItem>
    ));

  return (
    <Dropdown
      renderTrigger={renderTrigger}
      renderContent={renderContent}
      className={s.dropdown}
      contentClassName={s.content}
      placement='bottom-left'
      disabled={disabled}
    />
  );
};

export default BombDropdown;
