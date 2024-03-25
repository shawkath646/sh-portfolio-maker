"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Heading } from "@chakra-ui/react";
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MiniGalleryItemType } from "@/types/types";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./miniGallery.css";


const MiniGallery = ({ miniGalleryItems }: { miniGalleryItems: MiniGalleryItemType[] }) => (
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
                {miniGalleryItems.map((item, index) => (
                    <SwiperSlide key={index} >
                        <Image src={item} height={item.height} width={item.width} alt="dsmjsd" loading="lazy" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    </Box>
);


export default MiniGallery;