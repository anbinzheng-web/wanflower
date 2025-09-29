"use client";
import { useScroll, useMotionValueEvent } from "motion/react";
import { SvgIcon } from "@/components";
import { useState } from "react";
import clsx from "clsx";

export const TopAction = () => {
	const { scrollYProgress } = useScroll();

	const [opacity, setOpacity] = useState(0);

	function mapRange(
		x: number,
		inMin: number,
		inMax: number,
		outMin: number,
		outMax: number,
	) {
		return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
	}

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		if (current <= 0.2) {
			setOpacity(mapRange(current, 0, 0.2, 0, 1));
		} else {
			setOpacity(1);
		}
	});

	return (
		<div
			className={clsx(
				"fixed top-0 w-full h-12 flex items-center",
				opacity > 0.8 && "border-b border-solid border-b-gray-200",
			)}
			style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
		>
			<div className="flex justify-between items-center w-full px-5">
				<SvgIcon name="ArrowLeftIcon" size={24} />

				<div className="flex gap-3 items-center">
          <SvgIcon name="Share" size={24} />
					<SvgIcon name="CartIcon" size={24} />
					<SvgIcon name="MenuIcon" size={24} />
				</div>
			</div>
		</div>
	);
};
