import { Link } from "react-router-dom"
import { Pages } from "@/constants"
import s from './styles.module.scss'
import { useTranslation } from "react-i18next";

const TopPlayersButton: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Link to={Pages.Leaders} className={s.button}>
            <div className={s.label}>{t('topPlayers')}</div>
            <div className={s.description}>{t('motivateBest')}</div>
            <span className={s.coin} />
            <span className={s.money} />
        </Link>
    )
}

export default TopPlayersButton;