import React, { useState, useEffect, useRef } from 'react';
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
    alt: 'Game 1'
  },
  {
    id: 2,
    img: '/imgs/mainSwiper/game-002.jpg',
    alt: 'Game 2'
  },
  {
    id: 3,
    img: '/imgs/mainSwiper/game-003.jpg',
    alt: 'Game 3'
  },
  {
    id: 4,
    img: '/imgs/mainSwiper/game-001.jpg',
    alt: 'Game 1'
  },
  {
    id: 5,
    img: '/imgs/mainSwiper/game-002.jpg',
    alt: 'Game 2'
  },
  {
    id: 6,
    img: '/imgs/mainSwiper/game-003.jpg',
    alt: 'Game 3'
  },
]

const uniqueSlides = slides.slice(0, 3);

const HomeSwiper: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const paginationContainerRef = useRef<HTMLDivElement>(null);

  const handleSlideChange = (swiperInstance: SwiperInstance) => {
    const uniqueIndex = swiperInstance.realIndex % 3;
    setActiveSlide(uniqueIndex);
  };

  useEffect(() => {
    if (!paginationContainerRef.current || !swiper) return;

    const paginationContainer = paginationContainerRef.current;
    paginationContainer.innerHTML = '';

    uniqueSlides.forEach((_, index) => {
      const bullet = document.createElement('div');
      bullet.className = `${s.paginationBullet} ${index === activeSlide ? s.paginationBulletActive : ''}`;
      
      bullet.addEventListener('click', () => {
        const currentUniqueIndex = swiper.realIndex % 3;
        const currentGroup = Math.floor(swiper.realIndex / 3);
        
        let targetIndex;
        if (index === currentUniqueIndex) {
          return;
        } else {
          targetIndex = currentGroup * 3 + index;
          
          if (Math.abs(index - currentUniqueIndex) > 1) {
            if (index > currentUniqueIndex) {
              targetIndex = (currentGroup - 1) * 3 + index;
            } else {
              targetIndex = (currentGroup + 1) * 3 + index;
            }
          }
        }
        
        if (targetIndex < 0) targetIndex += slides.length;
        if (targetIndex >= slides.length) targetIndex -= slides.length;
        
        swiper.slideToLoop(targetIndex);
      });
      
      paginationContainer.appendChild(bullet);
    });
  }, [swiper, activeSlide]);

  return (
    <div className={s.container}>
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
            <SwiperSlide 
              key={slide.id} 
              className={s.swiperSlide}
            >
              <div className={classNames(s.swiperSlideContent, {
                [s.active]: activeSlide === (slide.id - 1) % 3,
              })}>
                <img src={slide.img} alt={slide.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div ref={paginationContainerRef} className={s.customPagination}></div>
      </div>
    </div>
  );
};

export default HomeSwiper;