import { useState, useRef, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { type AnimationItem } from 'lottie-web';
import { ANIMATIONS } from "@/constants";
import s from './styles.module.scss';
import WidthWrapper from "@/components/ui/WidthWrapper";
import DoorGrid, { type DoorState } from "@/components/shared/DoorGrid";
import FlyingBomb, { type FlyingBombCoords } from "@/components/shared/FlyingBomb";
import { getBombPoints } from '@/utils';

const RulesGameAnimation = () => {
    const [doorStates, setDoorStates] = useState<(DoorState)[]>(['closed', 'closed', 'closed', 'closed']);
    const [animationStep, setAnimationStep] = useState(0);
    const [bombAnimation, setBombAnimation] = useState<FlyingBombCoords | null>(null);

    const lottieRef = useRef<AnimationItem | undefined>(undefined);
    const doorRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

    const handleGrandmaAnimationComplete = () => {
        // @ts-ignore
        const grandmaRef = lottieRef.current?.wrapper;
        
        setAnimationStep(1);
        const { from, to } = getBombPoints(grandmaRef!, doorRefs.current[0]!);
        setBombAnimation({ from, to });
    };

    const onBombAnimationComplete = () => {
        // @ts-ignore
        const grandmaRef = lottieRef.current?.wrapper;
        
        if (animationStep === 1) {
            setBombAnimation(null);
            setAnimationStep(2);
            setDoorStates(prev => {
                const newStates = [...prev];
                newStates[0] = 'open';
                return newStates;
            });
            setTimeout(() => {
                const { from, to } = getBombPoints(grandmaRef!, doorRefs.current[1]!);
                setBombAnimation({ from, to });
            }, 50);
        }
        if (animationStep === 2) {
            setBombAnimation(null);
            setAnimationStep(3);
            setDoorStates(prev => {
                const newStates = [...prev];
                newStates[1] = 'open';
                return newStates;
            });
            setTimeout(() => {
                const { from, to } = getBombPoints(grandmaRef!, doorRefs.current[2]!);
                setBombAnimation({ from, to });
            }, 50);
        }
        if (animationStep === 3) {
            setBombAnimation(null);
            setAnimationStep(4);
            setDoorStates(prev => {
                const newStates = [...prev];
                newStates[2] = 'prize';
                return newStates;
            });
        }
    };

    useEffect(() => {
        if (animationStep === 4) {
            setTimeout(() => {
                setBombAnimation(null);
                setAnimationStep(5);
                setDoorStates(prev => {
                    const newStates = [...prev];
                    newStates[3] = 'bomb';
                    return newStates;
                });
            }, 1000);
        }
        if (animationStep === 5) {
            setTimeout(() => {
                setBombAnimation(null);
                setAnimationStep(0);
                setDoorStates(['closed', 'closed', 'closed', 'closed']);
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
                    <DoorGrid.Row key={`row-${rowIndex}`} state='demo'>
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

            {bombAnimation && (
                <FlyingBomb
                    coords={bombAnimation}
                    onAnimationComplete={onBombAnimationComplete}
                />
            )}
        </WidthWrapper>
    );
};

export default RulesGameAnimation;