import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative, Autoplay } from 'swiper/modules';
import ielts2 from '../../../../assets/ielts2.avif';
import ielts3 from '../../../../assets/ielts3.avif';
import ielts4 from '../../../../assets/ielts4.avif';
import ielts5 from '../../../../assets/ielts5.avif';
import ielts6 from '../../../../assets/ielts6.avif';
import ielts7 from '../../../../assets/ielts7.avif';
import ielts8 from '../../../../assets/ielts8.avif';
import ielts9 from '../../../../assets/ielts9.avif';
import ielts10 from '../../../../assets/ielts10.avif';
import ielts11 from '../../../../assets/ielts11.avif';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Swiperslide = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
    });
    Aos.refresh();
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="w-[90%] max-w-[340px] h-[330px] overflow-visible relative cursor-grab px-5 mx-auto md:max-w-[350px] md:h-[400px] lg:max-w-[450px] lg:h-[500px] min-[1100px]:max-w-[500px] min-[1100px]:h-[550px] xl:max-w-[550px] xl:h-[500px] 2xl:max-w-[750px] 2xl:h-[700px] min-[1750px]:max-w-[830px] min-[1750px]:h-[800px]"
    >
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: false,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        className="mySwiper"
      >
        <SwiperSlide className="flex-shrink-0 w-full h-full flex items-center justify-center rounded-[18px] overflow-hidden shadow-none">
          <img
            src={ielts5}
            alt="ielts score 8.5"
            loading="lazy"
            className="swiper-image max-w-[280px] w-full max-h-[330px] h-full m-auto rounded-4xl lg:max-w-[450px] lg:max-h-[500px] min-[1100px]:max-w-[500px] min-[1100px]:max-h-[550px] xl:max-w-[550px] xl:max-h-[500px] 2xl:max-w-[750px] 2xl:max-h-[700px] min-[1750px]:max-w-[830px] min-[1750px]:max-h-[800px] object-cover block"
          />
        </SwiperSlide>
        <SwiperSlide className="flex-shrink-0 w-full h-full flex items-center justify-center rounded-[18px] overflow-hidden shadow-none">
          <img
            src={ielts2}
            alt="ielts score 8"
            loading="lazy"
            className="swiper-image max-w-[280px] w-full max-h-[330px] h-full m-auto rounded-4xl lg:max-w-[450px] lg:max-h-[500px] min-[1100px]:max-w-[500px] min-[1100px]:max-h-[550px] xl:max-w-[550px] xl:max-h-[500px] 2xl:max-w-[750px] 2xl:max-h-[700px] min-[1750px]:max-w-[830px] min-[1750px]:max-h-[800px] object-cover block"
          />
        </SwiperSlide>
        <SwiperSlide className="flex-shrink-0 w-full h-full flex items-center justify-center rounded-[18px] overflow-hidden shadow-none">
          <img
            src={ielts4}
            alt="ielts score 8"
            loading="lazy"
            className="swiper-image max-w-[280px] w-full max-h-[330px] h-full m-auto rounded-4xl lg:max-w-[450px] lg:max-h-[500px] min-[1100px]:max-w-[500px] min-[1100px]:max-h-[550px] xl:max-w-[550px] xl:max-h-[500px] 2xl:max-w-[750px] 2xl:max-h-[700px] min-[1750px]:max-w-[830px] min-[1750px]:max-h-[800px] object-cover block"
          />
        </SwiperSlide>
        <SwiperSlide className="flex-shrink-0 w-full h-full flex items-center justify-center rounded-[18px] overflow-hidden shadow-none">
          <img
            src={ielts7}
            alt="ielts score 8"
            loading="lazy"
            className="swiper-image max-w-[280px] w-full max-h-[330px] h-full m-auto rounded-4xl lg:max-w-[450px] lg:max-h-[500px] min-[1100px]:max-w-[500px] min-[1100px]:max-h-[550px] xl:max-w-[550px] xl:max-h-[500px] 2xl:max-w-[750px] 2xl:max-h-[700px] min-[1750px]:max-w-[830px] min-[1750px]:max-h-[800px] object-cover block"
          />
        </SwiperSlide>
        <SwiperSlide className="flex-shrink-0 w-full h-full flex items-center justify-center rounded-[18px] overflow-hidden shadow-none">
          <img
            src={ielts6}
            alt="ielts score 8"
            loading="lazy"
            className="swiper-image max-w-[280px] w-full max-h-[330px] h-full m-auto rounded-4xl lg:max-w-[450px] lg:max-h-[500px] min-[1100px]:max-w-[500px] min-[1100px]:max-h-[550px] xl:max-w-[550px] xl:max-h-[500px] 2xl:max-w-[750px] 2xl:max-h-[700px] min-[1750px]:max-w-[830px] min-[1750px]:max-h-[800px] object-cover block"
          />
        </SwiperSlide>
        <SwiperSlide className="flex-shrink-0 w-full h-full flex items-center justify-center rounded-[18px] overflow-hidden shadow-none">
          <img
            src={ielts3}
            alt="ielts score 7.5"
            loading="lazy"
            className="swiper-image max-w-[280px] w-full max-h-[330px] h-full m-auto rounded-4xl lg:max-w-[450px] lg:max-h-[500px] min-[1100px]:max-w-[500px] min-[1100px]:max-h-[550px] xl:max-w-[550px] xl:max-h-[500px] 2xl:max-w-[750px] 2xl:max-h-[700px] min-[1750px]:max-w-[830px] min-[1750px]:max-h-[800px] object-cover block"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Swiperslide;