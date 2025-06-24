import { Pages } from '@/constants';
import Button from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import Dropdown from '@/components/ui/Dropdown';
import classNames from 'classnames';
import s from './styles.module.scss';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getUser } from '@/store/helpers/selectors';
import { changeSelectedBalance } from '@/store/helpers/actions';
import { BalanceType } from '@/types';

interface BalanceOption {
  id: BalanceType;
  name: string;
  value: number;
  isActive: boolean;
}

const Balance: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const { token, isConfirmed, balance, selectedBalance, demoBalance } = user;

  const balanceOptions: BalanceOption[] = [
    {
      id: BalanceType.REAL,
      name: t('realBalance'),
      value: balance,
      isActive: selectedBalance === BalanceType.REAL,
    },
    {
      id: BalanceType.DEMO,
      name: t('demo'),
      value: demoBalance,
      isActive: selectedBalance === BalanceType.DEMO,
    },
  ];

  const currentOption =
    balanceOptions.find((option) => option.isActive) || balanceOptions[0];

  const renderTrigger = ({
    isOpen,
    toggle,
  }: {
    isOpen: boolean;
    toggle: () => void;
  }) => (
    <Dropdown.TriggerButtonWithChevron
      variant='text'
      size='small'
      textColor='yellow'
      isOpen={isOpen}
      onClick={toggle}
    >
      {t(currentOption.id)}
    </Dropdown.TriggerButtonWithChevron>
  );

  const renderContent = ({ close }: { isOpen: boolean; close: () => void }) =>
    balanceOptions.map((option) => (
      <Dropdown.WindowItem
        key={option.id}
        active={option.isActive}
        className={s.balanceItem}
        onClick={() => {
          close();
          dispatch(changeSelectedBalance(option.id));
        }}
      >
        <div className={s.balanceItemLeft}>
          <div
            className={classNames(s.circle, {
              [s.activeCircle]: option.isActive,
            })}
          />
          <span>{option.name}</span>
        </div>
        <span className={classNames(s.balanceValue, s[option.id])}>
          {option.value}$
        </span>
      </Dropdown.WindowItem>
    ));

  if (!token || !isConfirmed) {
    return null;
  }

  return (
    <div className={s.balance}>
      <div className={s.right}>
        <div className={s.top}>
          <div className={s.label}>{t('balance')}:</div>
          <div className={classNames(s.value, s[currentOption.id])}>
            {currentOption.value}$
          </div>
        </div>
        <Dropdown
          placement='bottom-right'
          renderTrigger={renderTrigger}
          renderContent={renderContent}
        />
      </div>
      <Button
        variant='yellow'
        to={Pages.Cash}
        padding={{ px: '25px' }}
        size='medium'
      >
        {t('cash')}
      </Button>
    </div>
  );
};

export default Balance;
