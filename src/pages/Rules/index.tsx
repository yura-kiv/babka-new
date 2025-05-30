import PageTitle from "@/components/ui/PageTitle";
import WidthWrapper from "@/components/ui/WidthWrapper";
import { useTranslation } from "react-i18next";
import DoorGrid from "@/components/shared/DoorGrid";
import type { DoorState } from "@/components/shared/DoorGrid";
import s from './styles.module.scss';

const Rules: React.FC = () => {
    const { t } = useTranslation();

    const activeRow = 0;
    const activeCell = 1;

    return (
        <WidthWrapper>
            <PageTitle title={t('gameRules')} subtitle={t('generalRules')} />
            <WidthWrapper maxWidth={992} noPadding>
                <DoorGrid>
                    {[[1, 2, 3, 4]].map((row, rowIndex) => (
                        <DoorGrid.Row 
                            key={`row-${rowIndex}`} 
                            isActive={rowIndex === activeRow}
                        >
                            {row.map((cellId) => {
                                const doorState: DoorState = cellId === activeCell ? 'bomb' : 'closed';
                                
                                return (
                                    <DoorGrid.Door
                                        key={`cell-${cellId}`}
                                        state={doorState}
                                        isActive={rowIndex === activeRow && cellId === activeCell}
                                        onClick={() => {
                                            console.log(`Клік на двері ${cellId} в рядку ${rowIndex}`);
                                        }}
                                    />
                                );
                            })}
                        </DoorGrid.Row>
                    ))}
                </DoorGrid>
            </WidthWrapper>

            <div className={s.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ad atque eos asperiores qui modi enim vitae rerum, et debitis, sit nulla labore deserunt, velit amet quibusdam. Quam, numquam earum?
            </div>
        </WidthWrapper>
    );
};

export default Rules;