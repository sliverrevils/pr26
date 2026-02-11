"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";

import Image from "next/image";
import { ArrowRightIco } from "@/icons/iconsSvg";

interface SlideData {
    title: string;
    text: string;
    image: string;
    showButton?: boolean;
    gradient: string;
}

const SLIDES: SlideData[] = [
    {
        title: "AI-driven computer vision algorithms used for billiard stats collection",
        text: "We provide every pool player a personal dashboard evaluating their level and skill dynamics",
        image: "/svg/swiper-picture1.svg",
        showButton: true,
        gradient: "bg-(image:--gradient-PurpleTopBottom)",
    },
    {
        title: "Automated online analytics of practice sessions",
        text: "Track the growth and dynamics of your training, evaluate the result, and receive personalized recommendations to improve your level of play",
        image: "/svg/swiper-picture2.svg",
        gradient: "bg-(image:--gradient-PurpleGreenTopBottom)",
    },
    {
        title: "Automatic online evaluation of billiard playing skills",
        text: "Receive a personal certificate indicating your current level of play. Compare yourself against well-known players",
        image: "/svg/swiper-picture3.svg",
        gradient: "bg-(image:--gradient-PurpleIcon)",
    },
];

export default function MainSlider() {
    const [curSlide, setCurSlide] = useState(1);

    const [swiper, setSwiper] = useState<SwiperClass | null>(null);

    const swiperIndex = useMemo(() => (swiper?.realIndex ?? 0) + 1, [swiper?.realIndex]);

    const boxes = useMemo(
        () => (
            <div className="flex gap-2">
                {new Array(SLIDES.length).fill("").map((_, idx) => (
                    <div
                        key={idx + "_bullet"}
                        className={`w-16.5 h-2.5 ${swiperIndex === idx + 1 ? "bg-white" : "bg-white/20"}`}
                        onClick={() => swiper?.slideTo(idx)}
                    ></div>
                ))}
            </div>
        ),
        [swiperIndex],
    );
    return (
        <div className="relative w-full ">
            <Swiper
                modules={[
                    Navigation,
                    //Pagination,
                    A11y,
                    Autoplay,
                ]}
                onSwiper={setSwiper}
                onSlideChange={(s) => setCurSlide(s.realIndex)}
                onRealIndexChange={(s) => setCurSlide(s.realIndex)}
                className="w-full h-227 "
                direction="horizontal"
                speed={700}
                effect="slide"
                loop
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
            >
                {SLIDES.map((slide, index) => (
                    <SwiperSlide key={slide.image}>
                        <div className="relative h-full w-full overflow-hidden">
                            {/* Градиентный фон и контент */}
                            <div className={`h-full w-full flex justify-center ${slide.gradient}`}>
                                <div
                                    className="w-full container flex flex-col-reverse  items-center justify-center gap-5   px-6
                                                lg:flex-row lg:gap-10 lg:justify-between
                                                "
                                >
                                    <div className="flex flex-col  max-w-xl">
                                        <div className="text-lg leading-snug  font-medium text-white/80 mb-2.5">
                                            Welcome to new analytics service
                                        </div>

                                        <div
                                            className="text-3xl leading-snug font-bold text-white mb-5 
                                                        md:text-4xl
                                                        lg:text-5xl
                                                        "
                                        >
                                            {slide.title}
                                        </div>

                                        <div className="text-2xl text-white/80 leading-relaxed mb-5">
                                            {slide.text}
                                        </div>

                                        {slide.showButton && (
                                            <Link
                                                href="/about-us"
                                                className="btn-40 bg-f-green-main/80 hover:bg-f-green-main transition shadow-2xl self-start flex gap-2"
                                            >
                                                <div className="text-white">More</div>
                                                <ArrowRightIco />
                                            </Link>
                                        )}
                                    </div>

                                    <div
                                        className="shrink-0 
                                                    lg:block
                                                    "
                                    >
                                        <Image
                                            src={slide.image}
                                            alt="about us"
                                            width={527}
                                            height={463}
                                            className="w-70 
                                                      xl:w-full
                                                        "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Image
                            src={"/svg/sliderFooter.svg"}
                            width={853}
                            height={42}
                            alt="bg"
                            className="absolute bottom-0 left-0 w-full"
                            priority
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute left-1/2 bottom-8 flex flex-col items-center gap-2 z-10 -translate-x-1/2 text-2xl ">
                {boxes}
                <div className="flex gap-1">
                    <div className="text-white">{`0${swiperIndex} /`}</div>
                    <div className="text-white/40">0{SLIDES.length}</div>
                </div>
            </div>
        </div>
    );
}
