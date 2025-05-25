import React from 'react';
import classNames from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';

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

const HomeSwiper: React.FC = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.realIndex);
  };

  return (
    <div className={s.container}>
      <div className={s.swiperContainer}>
        <Swiper
          spaceBetween={1}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSlideChange={handleSlideChange}
          modules={[Pagination, Autoplay]}
          className={s.swiperWrapper}
        >
          {slides.map((slide) => (
            <SwiperSlide 
              key={slide.id} 
              className={s.swiperSlide}
            >
              <div className={classNames(s.swiperSlideContent, {
                [s.active]: activeSlide === slide.id - 1,
              })}>
                <img src={slide.img} alt={slide.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSwiper;