import { Box, Image } from "@mantine/core";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import BigSale from "../../../../assets/big-sale-discounts-products_23-2150336669.avif";
import Black from "../../../../assets/black-friday-super-sale-web-banner-template_120329-2158.avif";
import Gaming from "../../../../assets/gaming-laptop-sale-promotion-banner_252779-743.avif";
import Smart from "../../../../assets/smart-phone-sale-promotion-black-friday-sale-web-banner-template_179771-192.avif";
import classes from "./Performances.module.css";

export default function Performances() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  return (
    <Box>
      
      <Carousel
        height={250}
        withIndicators
        className={classes.carousel}
        loop
        plugins={[autoplay.current]}
        // onMouseEnter={autoplay.current.stop}
        // onMouseLeave={autoplay.current.reset}
        style={{ borderRadius: "10px", overflow: "hidden" }}
        styles={{
          viewport: { borderRadius: "10px" },
          control: {
            border: "0px",
            height: "42px",
            borderRadius: "4px",
            backgroundColor: "#ffffff52",
          },
        }}
      >
        <Carousel.Slide className={classes.slide}>
          <Image src={BigSale} className={classes.imageSlide} />
        </Carousel.Slide>
        <Carousel.Slide className={classes.slide}>
          <Image src={Black} className={classes.imageSlide} />
        </Carousel.Slide>
        <Carousel.Slide className={classes.slide}>
          <Image src={Gaming} className={classes.imageSlide} />
        </Carousel.Slide>
        <Carousel.Slide className={classes.slide}>
          <Image src={Smart} className={classes.imageSlide} />
        </Carousel.Slide>
      </Carousel>
    </Box>
  );
}
