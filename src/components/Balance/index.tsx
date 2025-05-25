import { Pages } from "@/constants";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import Dropdown from "../Dropdown";
import classNames from "classnames";
import { FaChevronDown } from "react-icons/fa";

import s from './styles.module.scss'

interface BalanceOption {
  id: string;
  name: string;
  value: string;
  isActive?: boolean;
}

const Balance: React.FC = () => {
  const { t } = useTranslation();

  const balanceOptions: BalanceOption[] = [
    {
      id: 'real',
      name: t('realBalance'),
      value: '12000$',
      isActive: true
    },
    {
      id: 'demo',
      name: t('demo'),
      value: '1000$',
      isActive: false
    }
  ];

  const currentOption = balanceOptions.find(option => option.isActive) || balanceOptions[0];

  const renderTrigger = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => (
    <Button
      variant="text"
      size="small"
      onClick={toggle}
      className={s.trigger}
      rightIcon={<FaChevronDown className={classNames(s.arrow, { [s.open]: isOpen })} size={12} />}
    >
      {t('real')}
    </Button>
  );

  const renderContent = ({ close }: { isOpen: boolean; close: () => void }) => (
    <div className={s.balanceOptions}>
      {balanceOptions.map((option) => (
        <div
          key={option.id}
          className={classNames(s.balanceItem, {
            [s.active]: option.isActive
          })}
          onClick={() => {
            close();
          }}
        >
          <div className={s.balanceItemLeft}>
            <div className={classNames(s.circle, { [s.activeCircle]: option.isActive })}></div>
            <span>{option.name}</span>
          </div>
          <span className={classNames(s.balanceValue, s[option.id])}>
            {option.value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={s.balance}>
      <div className={s.right}>
        <div className={s.top}>
          <div className={s.label}>{t('balance')}:</div>
          <div className={classNames(s.value, s[currentOption.id])}>{currentOption.value}</div>
        </div>
        <Dropdown
          placement="bottom-right"
          contentClassName={s.dropdownContent}
          renderTrigger={renderTrigger}
          renderContent={renderContent}
        />
      </div>
      <Button variant="secondary" to={Pages.Balance}>
        {t('cash')}
      </Button>
    </div>
  )
}

export default Balance;
