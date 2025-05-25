import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Pages } from "@/constants";
import s from './styles.module.scss'
import { FaGift } from 'react-icons/fa'

const HowToPlayButton: React.FC = () => {
    const {t} = useTranslation();
    return (
        <Link to={Pages.Rules} className={s.button}>
            <FaGift size={28} />
            <div className={s.text}>
                <div className={s.label}>{t('howToPlay')}</div>
                <div className={s.description}>{t('instructions')}</div>
            </div>
        </Link>
    )
}   

export default HowToPlayButton;