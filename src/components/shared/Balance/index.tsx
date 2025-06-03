import { Pages } from "@/constants";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import Dropdown from "@/components/ui/Dropdown";
import classNames from "classnames";
import { FaChevronDown } from "react-icons/fa";
import s from './styles.module.scss'
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getUserData } from '@/store/helpers/selectors'
import { changeSelectedBalance } from '@/store/helpers/actions'

interface BalanceOption {
  id: 'real' | 'demo';
  name: string;
  value: number;
  isActive: boolean;
}

const Balance: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserData);

  const balanceOptions: BalanceOption[] = [
    {
      id: 'real',
      name: t('realBalance'),
      value: user.balance,
      isActive: user.selectedBalance === 'real',
    },
    {
      id: 'demo',
      name: t('demo'),
      value: user.demoBalance,
      isActive: user.selectedBalance === 'demo',
    }
  ];

  const currentOption = balanceOptions.find(option => option.isActive) || balanceOptions[0];

  const renderTrigger = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => (
    <Button
      variant="text"
      size="small"
      textColor="yellow"
      onClick={toggle}
      icon={<FaChevronDown className={classNames(s.arrow, { [s.open]: isOpen })} size={12} />}
      iconPosition="right"
    >
      {t(currentOption.id)}
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
            dispatch(changeSelectedBalance(option.id));
          }}
        >
          <div className={s.balanceItemLeft}>
            <div className={classNames(s.circle, { [s.activeCircle]: option.isActive })}></div>
            <span>{option.name}</span>
          </div>
          <span className={classNames(s.balanceValue, s[option.id])}>
            {option.value}$
          </span>
        </div>
      ))}
    </div>
  );

  if (!user?.isAuthenticated) {
    return null;
  }

  return (
    <div className={s.balance}>
      <div className={s.right}>
        <div className={s.top}>
          <div className={s.label}>{t('balance')}:</div>
          <div className={classNames(s.value, s[currentOption.id])}>{currentOption.value}$</div>
        </div>
        <Dropdown
          placement="bottom-right"
          contentClassName={s.dropdownContent}
          renderTrigger={renderTrigger}
          renderContent={renderContent}
        />
      </div>
      <Button variant="yellow" to={Pages.Cash} padding={{ px: '25px' }} size="medium">
        {t('cash')}
      </Button>
    </div>
  )
}

export default Balance;
