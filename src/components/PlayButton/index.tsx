import { useTranslation } from "react-i18next";
import s from './styles.module.scss'
import { Link } from "react-router-dom";
import { Pages } from "@/constants";

const PlayButton: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Link to={Pages.Game} className={s.button}>
            <div className={s.label}>{t('play')}</div>
        </Link>
    )
}

export default PlayButton   