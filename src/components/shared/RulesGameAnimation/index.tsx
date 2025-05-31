import LottiePlayer from "@/components/ui/LottiePlayer";
import { ANIMATIONS } from "@/constants";
import s from './styles.module.scss';
import WidthWrapper from "@/components/ui/WidthWrapper";
import DoorGrid from "@/components/shared/DoorGrid";

const RulesGameAnimation = () => {
    return (
        <WidthWrapper maxWidth={992} noPadding className={s.wrapper}>
            <DoorGrid>
                {[[1, 2, 3, 4]].map((row, rowIndex) => (
                    <DoorGrid.Row key={`row-${rowIndex}`} state='demo'>
                        {row.map((cellId) => (<DoorGrid.Door key={`cell-${cellId}`} state='closed' />))}
                    </DoorGrid.Row>
                ))}
            </DoorGrid>

            <div className={s.grandma}>
                <LottiePlayer
                    src={ANIMATIONS.GRANDMA}
                    width="200px"
                    height="200px"
                    autoplay={true}
                    loop={false}
                />
            </div>
            
        </WidthWrapper>
    );
};

export default RulesGameAnimation;