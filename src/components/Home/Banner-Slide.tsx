"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

function Banner_Slide() {
	console.log("Banner_Slide Rendered");

	const router = useRouter();
	const slideData = [
		{
			id: 1,
			src: "/img/banner-1.png",
			href: "/home",
		},
		{
			id: 2,
			src: "/img/banner-1.png",
			href: "/home",
		},
		{
			id: 3,
			src: "/img/banner-1.png",
			href: "/home",
		},
	];

	return (
		<>
			<div className="swiper-container">
				<Swiper
					loop={true}
					spaceBetween={0}
					slidesPerView={1}
					navigation={false}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
					}}
				>
					{slideData.map((slide) => (
						<SwiperSlide key={slide.id}>
							<button
								className="flex"
								onClick={(e) => {
									e.preventDefault();
									router.push(slide.href);
								}}
							>
								<Image
									src={slide.src}
									alt=""
									width={375}
									height={194}
									placeholder="blur"
									blurDataURL="/img/banner-1.png"
								/>
								<div className="flex justify-center items-center absolute w-[45px] h-[20px] bg-black bg-opacity-50 rounded-xl bottom-3 right-5">
									<text className="text-[12px] text-white">
										{slide.id} / {slideData.length}
									</text>
								</div>
							</button>
						</SwiperSlide>
					))}
				</Swiper>
				<button
					className="flex flex-row items-center h-[43px] w-full bg-black pl-5 gap-2"
					onClick={() => {}}
				>
					<img src="/img/banner-icon.png" alt="이미지 테스트" />
					<text className="text-white text-[12px] font-bold">
						매칭 항목 선택하고 딱 맞는 스터디 추천받기 {">"}
					</text>
				</button>
			</div>
		</>
	);
}

export default Banner_Slide;
