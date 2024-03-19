"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Heading } from "@chakra-ui/react";
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./miniGallery.css";


const MiniGallery = () => {

    const photos = [
        { src: "https://picsum.photos/800/600", width: 800, height: 600 },
        { src: "https://picsum.photos/1600/900", width: 1600, height: 900 },
        { src: "https://picsum.photos/1200/800", width: 1200, height: 800 },
        { src: "https://picsum.photos/1000/700", width: 1000, height: 700 },
        { src: "https://picsum.photos/1400/1000", width: 1400, height: 1000 },
        { src: "https://picsum.photos/900/600", width: 900, height: 600 },
        { src: "https://picsum.photos/1100/750", width: 1100, height: 750 },
        { src: "https://picsum.photos/1300/850", width: 1300, height: 850 }
    ];

    return (
        <Box as="section" pt={10} mb={8}>
            <Heading
                as={motion.h3}
                size={['xl', 'xl', 'lg']}
                textAlign="center"
                initial={{
                    opacity: 0
                }}
                whileInView={{
                    opacity: 1,
                    transition: {
                        duration: 1
                    }
                }}
                viewport={{ once: true }}
            >
                Take a look
            </Heading>
            <Box
                as={motion.div}
                mt={8}
                overflow="hidden"
                mx="auto"
                initial={{
                    opacity: 0,
                    width: 0
                }}
                whileInView={{
                    opacity: 1,
                    width: "100%",
                    transition: {
                        duration: 1
                    }
                }}
                viewport={{ once: true }}
            >
                <Swiper
                    effect={'coverflow'}
                    grabCursor
                    centeredSlides
                    loop
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                >
                    {photos.map((item, index) => (
                        <SwiperSlide key={index} >
                            <Image src={item.src} height={item.height} width={item.width} alt="dsmjsd" loading="lazy" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
}

export default MiniGallery;