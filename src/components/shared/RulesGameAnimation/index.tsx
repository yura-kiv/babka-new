import { useState, useRef, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { type AnimationItem } from 'lottie-web';
import { ANIMATIONS } from "@/constants";
import s from './styles.module.scss';
import WidthWrapper from "@/components/ui/WidthWrapper";
import DoorGrid, { RowState, DoorState } from "@/components/shared/DoorGrid";
import FlyingBomb, { type FlyingBombParams } from "@/components/shared/FlyingBomb";
import { getBombPoints } from '@/utils';

const RulesGameAnimation = () => {
    const [doorStates, setDoorStates] = useState<(DoorState)[]>([DoorState.CLOSED, DoorState.CLOSED, DoorState.CLOSED, DoorState.CLOSED]);
    const [animationStep, setAnimationStep] = useState(0);
    const [bomb, setBomb] = useState<FlyingBombParams | null>(null);

    const lottieRef = useRef<AnimationItem | undefined>(undefined);
    const doorRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

    const handleGrandmaAnimationComplete = () => {
        // @ts-ignore
        const grandmaRef = lottieRef.current?.wrapper;
        
        setAnimationStep(1);
        const { from, to } = getBombPoints(grandmaRef!, doorRefs.current[0]!);
        setBomb({ from, to });
    };

    const onBombComplete = () => {
        // @ts-ignore
        const grandmaRef = lottieRef.current?.wrapper;
        
        if (animationStep === 1) {
            setBomb(null);
            setAnimationStep(2);
            setDoorStates(prev => {
                const newStates = [...prev];
                newStates[0] = DoorState.OPEN;
                return newStates;
            });
            setTimeout(() => {
                const { from, to } = getBombPoints(grandmaRef!, doorRefs.current[1]!);
                setBomb({ from, to });
            }, 50);
        }
        if (animationStep === 2) {
            setBomb(null);
            setAnimationStep(3);
            setDoorStates(prev => {
                const newStates = [...prev];
                newStates[1] = DoorState.OPEN;
                return newStates;
            });
            setTimeout(() => {
                const { from, to } = getBombPoints(grandmaRef!, doorRefs.current[2]!);
                setBomb({ from, to });
            }, 50);
        }
        if (animationStep === 3) {
            setBomb(null);
            setAnimationStep(4);
            setDoorStates(prev => {
                const newStates = [...prev];
                newStates[2] = DoorState.PRIZE;
                return newStates;
            });
        }
    };

    useEffect(() => {
        if (animationStep === 4) {
            setTimeout(() => {
                setBomb(null);
                setAnimationStep(5);
                setDoorStates(prev => {
                    const newStates = [...prev];
                    newStates[3] = DoorState.BOMB;
                    return newStates;
                });
            }, 1000);
        }
        if (animationStep === 5) {
            setTimeout(() => {
                setBomb(null);
                setAnimationStep(0);
                setDoorStates([DoorState.CLOSED, DoorState.CLOSED, DoorState.CLOSED, DoorState.CLOSED]);
                if (lottieRef.current) {
                    setTimeout(() => {
                        lottieRef.current?.goToAndPlay(0);
                    }, 50);
                }
            }, 2000);
        }
    }, [animationStep]);

    return (
        <WidthWrapper maxWidth={992} noPadding className={s.wrapper}>
            <DoorGrid>
                {[[0, 1, 2, 3]].map((row, rowIndex) => (
                    <DoorGrid.Row key={`row-${rowIndex}`} state={RowState.DEMO}>
                        {row.map((cellId) => (
                            <div
                                key={`cell-${cellId}`}
                                className={s.doorWrapper}
                                ref={(ref: HTMLDivElement | null) => {
                                    doorRefs.current[cellId] = ref;
                                    return undefined;
                                }}
                            >
                                <DoorGrid.Door
                                    state={doorStates[cellId]}
                                />
                            </div>
                        ))}
                    </DoorGrid.Row>
                ))}
            </DoorGrid>


            <Lottie
                ref={lottieRef}
                path={ANIMATIONS.GRANDMA}
                style={{ height: '220px', width: '220px', margin: '0 auto' }}
                loop={false}
                onComplete={handleGrandmaAnimationComplete}
                play
            />

            {bomb && <FlyingBomb params={{ ...bomb, onComplete: onBombComplete }} />}
        </WidthWrapper>
    );
};

export default RulesGameAnimation;