import s from './styles.module.scss';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className={s.progress}>
      <div className={s.bar} style={{ width: `${value}%` }} />
    </div>
  );
};

export default ProgressBar;
