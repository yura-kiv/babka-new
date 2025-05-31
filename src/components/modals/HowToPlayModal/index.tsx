import RulesGameAnimation from "@/components/shared/RulesGameAnimation";
import Checkbox from "@/components/ui/Checkbox";
import Modal from "@/components/ui/Modal";
import { useTranslation } from "react-i18next";
import s from './styles.module.scss'
import { useState } from "react";

const HowToPlayModal: React.FC = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <Modal title={t('howToPlay')} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <RulesGameAnimation />

            <div className={s.container}>
                <p className={s.text}>{t('rules.content1')}</p>
                <Checkbox label={t('doNotShowAgain')} size="small" className={s.checkbox} />
            </div>
        </Modal>
    );
};

export default HowToPlayModal;