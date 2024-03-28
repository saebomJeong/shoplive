import { LegacyRef, RefObject, useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import SwiperCore, { Swiper as SwiperClass } from "swiper";
import "swiper/swiper-bundle.css";
import styled from "styled-components";

SwiperCore.use([]);

interface Props {
  colors: string[];
  height: number;
}

const Description = styled.div`
  text-align: center;
`;

const Slide = (props: Props) => {
  const { colors, height } = props;
  const [description, setDescription] = useState<string>("AUTO TRANSITON");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isAutoplaying, setIsAutoplaying] = useState<boolean>(true);
  const swiperRef = useRef<SwiperRef>(null);
  const [swiperWidth, setSwiperWidth] = useState<number>(0);

  const handleTouchStart = (swiper: SwiperCore, event: TouchEvent) => {
    setIsAutoplaying(false);
    if (event.touches && event.touches.length > 0) {
      setTouchStartX(event.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX) {
      const deltaX = touchStartX - touchStartX;

      if (Math.abs(deltaX) < swiperWidth / 2) {
        setDescription("CANCEL");
        swiperRef.current?.swiper.slideTo(swiperRef.current.swiper.activeIndex);
      }
    }

    setTouchStartX(null);
  };

  const handleTouchMove = (swiper: SwiperCore, event: TouchEvent) => {
    if (!touchStartX) {
      return;
    }

    const touchEndX = event.touches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 0) {
      setDescription("SWIPE right");
    } else {
      setDescription("SWIPE left");
    }
  };

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (isAutoplaying && swiperRef.current) {
        swiperRef.current.swiper.slideNext();
        setDescription("AUTO TRANSITION");
      }
    }, 3000);

    return () => clearInterval(3000);
  }, [isAutoplaying]);

  useEffect(() => {
    const updateSwiperWidth = () => {
      if (swiperRef.current) {
        const swiperElem = swiperRef.current.swiper.el;
        if (swiperElem) {
          const { width } = swiperElem.getBoundingClientRect();
          setSwiperWidth(width);
        }
      }
    };

    window.addEventListener("resize", updateSwiperWidth);
    updateSwiperWidth();

    return () => window.removeEventListener("resize", updateSwiperWidth);
  }, []);

  return (
    <>
      <Description>{description}</Description>
      <Swiper
        style={{
          width: "100%",
        }}
        effect="fade"
        loop
        height={height}
        onTouchEnd={handleTouchEnd}
        onTouchStart={(
          swiper: SwiperClass,
          event: MouseEvent | TouchEvent | PointerEvent
        ) => handleTouchStart(swiper, event as TouchEvent)}
        onTouchMove={(
          swiper: SwiperClass,
          event: MouseEvent | TouchEvent | PointerEvent
        ) => handleTouchMove(swiper, event as TouchEvent)}
        ref={swiperRef}
      >
        {colors.map((color: string) => (
          <SwiperSlide
            style={{
              background: color,
              color: "white",
              textAlign: "center",
            }}
            key={color}
          >
            <b>{color}</b>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slide;
