import RulesGameAnimation from "@/components/shared/RulesGameAnimation";
import Checkbox from "@/components/ui/Checkbox";
import Modal from "@/components/ui/Modal";
import { useTranslation } from "react-i18next";
import s from './styles.module.scss'
import { useState, useEffect } from "react";

const STORAGE_KEY = 'hideHowToPlayModal';

const HowToPlayModal: React.FC = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doNotShowAgain, setDoNotShowAgain] = useState(false);

    useEffect(() => {
        const hideModal = localStorage.getItem(STORAGE_KEY);
        if (hideModal !== 'true') {
            setIsModalOpen(true);
        }
    }, []);

    const handleClose = () => {
        setIsModalOpen(false);
        
        if (doNotShowAgain) {
            localStorage.setItem(STORAGE_KEY, 'true');
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDoNotShowAgain(e.target.checked);
    };

    return (
        <Modal title={t('howToPlay')} isOpen={isModalOpen} onClose={handleClose} maxWidth="780px">
            <RulesGameAnimation />

            <div className={s.container}>
                <p className={s.text}>{t('rules.content1')}</p>
                <Checkbox 
                    label={t('doNotShowAgain')} 
                    size="small" 
                    className={s.checkbox} 
                    checked={doNotShowAgain}
                    onChange={handleCheckboxChange}
                />
            </div>
        </Modal>
    );
};

export default HowToPlayModal;