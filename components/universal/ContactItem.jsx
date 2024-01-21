"use client";
import NextLink from "next/link";
import Image from "next/image";
import { Link } from '@chakra-ui/react'
import tinycolor from "tinycolor2";

export default function ContactItem({ icon, color, href }) {

    const gradientColor = tinycolor(color);

    const lighterColor = gradientColor.lighten(16).toString();
    const darkerColor = gradientColor.darken(16).toString();

    return (
        <>
            <Link
                as={NextLink}
                href={href}
                target="_blank"
                
            >
                <section className="itemContainer">
                    <span className="layer1"></span>
                    <span className="layer2"></span>
                    <span className="layer3"></span>
                    <span className="layer4"></span>
                    <span className="layer5">
                        <Image src={icon} alt="contact icon" height={50} width={50} />
                    </span>
                </section>
            </Link>

            <style jsx>
                {`
                    .itemContainer {
                        position: relative;
                        height: 7rem;
                        width: 7rem;
                        transform: rotate(-30deg) skewY(0deg) skewX(25deg);
                        background-color: #ccc;
                        margin: 0 auto;
                    }

                    .itemContainer > span {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        transition-duration: 500ms;
                        background-image: linear-gradient(to right, ${lighterColor}, ${darkerColor});
                        border-radius: 0.25rem;
                    }

                    .itemContainer:hover .layer1 {
                        opacity: 0.2;
                    }

                    .layer2 {
                        transition-duration: 500ms;
                        transform: translateX(0px) translateY(0px);
                        opacity: 0.4;
                    }

                    .itemContainer:hover .layer2 {
                        transform: translateX(10px) translateY(-10px);
                        opacity: 0.6;
                    }

                    .layer3 {
                        transition-duration: 500ms;
                        transform: translateX(0px) translateY(0px);
                        opacity: 0.6;
                    }

                    .itemContainer:hover .layer3 {
                        transform: translateX(20px) translateY(-20px);
                        opacity: 0.8;
                    }

                    .layer4 {
                        transition-duration: 500ms;
                        transform: translateX(0px) translateY(0px);
                        opacity: 0.8;
                    }

                    .itemContainer:hover .layer4 {
                        transform: translateX(30px) translateY(-30px);
                        opacity: 1;
                    }

                    .layer5 {
                        transition-duration: 500ms;
                        transform: translateX(0px) translateY(0px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .itemContainer:hover .layer5 {
                        transform: translateX(40px) translateY(-40px);
                    }
                `}
            </style>

        </>
    );
}