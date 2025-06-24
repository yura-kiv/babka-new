import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';

// @ts-ignore
import 'swiper/css';

import s from './styles.module.scss';

const slides = [
  {
    id: 1,
    img: '/imgs/mainSwiper/game-001.jpg',
    alt: 'Game 1',
  },
  {
    id: 2,
    img: '/imgs/mainSwiper/game-002.jpg',
    alt: 'Game 2',
  },
  {
    id: 3,
    img: '/imgs/mainSwiper/game-003.jpg',
    alt: 'Game 3',
  },
  {
    id: 4,
    img: '/imgs/mainSwiper/game-001.jpg',
    alt: 'Game 1',
  },
  {
    id: 5,
    img: '/imgs/mainSwiper/game-002.jpg',
    alt: 'Game 2',
  },
  {
    id: 6,
    img: '/imgs/mainSwiper/game-003.jpg',
    alt: 'Game 3',
  },
];

type HomeSwiperProps = {
  className?: string;
};

const HomeSwiper: React.FC<HomeSwiperProps> = ({ className }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const paginationContainerRef = useRef<HTMLDivElement>(null);

  const handleSlideChange = (swiperInstance: SwiperInstance) => {
    const uniqueIndex = swiperInstance.realIndex % 3;
    setActiveSlide(uniqueIndex);
  };

  return (
    <div className={classNames(s.container, className)}>
      <div className={s.swiperContainer}>
        <Swiper
          spaceBetween={1}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSlideChange={handleSlideChange}
          onSwiper={setSwiper}
          modules={[Autoplay]}
          className={s.swiperWrapper}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className={s.swiperSlide}>
              <div
                className={classNames(s.swiperSlideContent, {
                  [s.active]: activeSlide === (slide.id - 1) % 3,
                })}
              >
                <img src={slide.img} alt={slide.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div ref={paginationContainerRef} className={s.customPagination}>
          {[0, 1, 2].map((bullet) => (
            <div
              key={bullet}
              onClick={() => swiper?.slideToLoop(bullet)}
              className={classNames(s.paginationBullet, {
                [s.paginationBulletActive]: activeSlide % 3 === bullet,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSwiper;
