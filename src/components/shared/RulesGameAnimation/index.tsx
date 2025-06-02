import { useState, useRef, useEffect } from 'react';
import LottiePlayer from "@/components/ui/LottiePlayer";
import type { LottiePlayerMethods } from "@/components/ui/LottiePlayer";
import { ANIMATIONS } from "@/constants";
import s from './styles.module.scss';
import WidthWrapper from "@/components/ui/WidthWrapper";
import DoorGrid, { type DoorState } from "@/components/shared/DoorGrid";
import FlyingBomb from "@/components/shared/FlyingBomb";

const RulesGameAnimation = () => {
    const [doorStates, setDoorStates] = useState<(DoorState)[]>(['closed', 'closed', 'closed', 'closed']);
    const [animationStep, setAnimationStep] = useState(0);
    const [bombAnimation, setBombAnimation] = useState<{
        startPosition: { x: number; y: number };
        targetPosition: { x: number; y: number };
    } | null>(null);

    const lottieRef = useRef<LottiePlayerMethods | null>(null);
    const grandmaRef = useRef<HTMLDivElement | null>(null);
    const doorRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

    const getGrandmaPosition = () => {
        const grandmaElement = grandmaRef.current;
        if (!grandmaElement) return null;
        const rect = grandmaElement.getBoundingClientRect();
        const scrollY = window.scrollY;
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2 + scrollY,
        };
    };

    const getDoorPosition = (doorIndex: number) => {
        const doorElement = doorRefs.current[doorIndex];
        if (!doorElement) return null;
        const rect = doorElement.getBoundingClientRect();
        const scrollY = window.scrollY;
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height - 20 + scrollY,
        };
    };

    const handleGrandmaAnimationComplete = () => {
        setAnimationStep(1);
        setBombAnimation({
            startPosition: getGrandmaPosition()!,
            targetPosition: getDoorPosition(0)!
        });
    };

    const onBombAnimationComplete = () => {
        if (animationStep === 1) {
            setBombAnimation(null);
            setAnimationStep(2);
            setDoorStates(prev => {
                const newStates = [...prev];
                newStates[0] = 'open';
                return newStates;
            });
            setTimeout(() => {
                setBombAnimation({
                    startPosition: getGrandmaPosition()!,
                    targetPosition: getDoorPosition(1)!
                });
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
                setBombAnimation({
                    startPosition: getGrandmaPosition()!,
                    targetPosition: getDoorPosition(2)!
                });
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
                    lottieRef.current.stop();
                    setTimeout(() => {
                        lottieRef.current?.play();
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
                                ref={(ref: HTMLDivElement | null) => {
                                    doorRefs.current[cellId] = ref;
                                    return undefined;
                                }}
                                className={s.doorWrapper}
                            >
                                <DoorGrid.Door
                                    state={doorStates[cellId]}
                                />
                            </div>
                        ))}
                    </DoorGrid.Row>
                ))}
            </DoorGrid>

            <LottiePlayer
                lottieRef={lottieRef}
                containerRef={grandmaRef}
                src={ANIMATIONS.GRANDMA}
                width="200px"
                height="200px"
                autoplay={true}
                loop={false}
                onComplete={handleGrandmaAnimationComplete}
            />


            {bombAnimation && (
                <FlyingBomb
                    startPosition={bombAnimation.startPosition}
                    targetPosition={bombAnimation.targetPosition}
                    onAnimationComplete={onBombAnimationComplete}
                />
            )}
        </WidthWrapper>
    );
};

export default RulesGameAnimation;