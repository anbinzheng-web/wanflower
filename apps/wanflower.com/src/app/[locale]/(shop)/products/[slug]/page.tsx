// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import currency from "currency.js";
import { SvgIcon } from "@/components";
import clsx from "clsx";
import { TopAction } from "./topActions";

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const t = await getTranslations();

	const product = {
		// 商品的名称
		name: "Wan Flower Cup",
		// 商品的描述，必须限制字数的。
		description:
			"Ageratum is a genus of 40 to 60 tropical and warm temperate flowering annuals and perennials from the family Asteraceae, tribe Eupatorieae. Most species are native to Central America",
		price: 199.99,
		reviews: 268,
		images: [
			"https://gw.alicdn.com/bao/uploaded/i1/3690962258/O1CN01W7UY4i1SYDOyyabOw_!!3690962258.jpg_.webp",
		],
		// Product information
		// TODO：需要设计一个表格来展示这些信息
		// 然后这些信息有些比较重要会放在前面，并且需要设计 icon。（比如材质和容量）
		specs: [
			{
				label: "Origin",
				value: "China",
			},
			{
				label: "Material",
				value: "Ceramic",
			},
			// {
			//   label: 'Style',
			//   value: 'Creative'
			// },
			{
				label: "Volume",
				value: "350ml",
			},
		],
		mark: 4.8,
		commentCount: 268,
		heart: 1500,
		// 这个商品的一些评论
		// 字段包含，
	};

	console.log("slug", slug);
	// const t = useTranslations();

	return (
		<div className="relative">
			{/* 顶部的操作栏 */}
			<TopAction />

			{/* 商品的核心内容信息 */}
			<div className="mb-[100px]">
				<img src={product.images[0]} className="w-full" alt="wan flower cup" />
				<div className="bg-gray-100 flex flex-col gap-3">
					<div className="pt-4 px-5 bg-white">
						<div className="flex justify-between items-center mb-5">
							<div className="text-lg font-bold">${product.price}</div>
							<div className="flex items-center gap-1">
								<div>{product.mark}</div>
								<div>({product.reviews} Reviews)</div>
							</div>
						</div>
						<div className="text-14px pb-4">
							Ageratum is a genus of 40 to 60 tropical and warm temperate
							flowering annuals and perennials from the family Asteraceae, tribe
							Eupatorieae. Most species are native to Central America...
						</div>
					</div>

					<div className="bg-white px-5 flex flex-col gap-3 py-4">
						{/* 物流信息 */}
						<div className="flex gap-2.5 text-3 text-[#69ab9a]">
							{t("Free Shipping")} <span className="text-gray-500">|</span>
							{t("7 Days Return Policy")}
						</div>
						<div className="border-b border-solid border-b-gray-50"></div>
						{/* 保障 */}

						{/* 产品规格 */}
						<div className="flex w-full gap-5">
							{product.specs.map((spec, index) => (
								<div
									key={spec.label}
									className={clsx(
										"flex-1 flex flex-col gap-3 not-last:border-r border-solid border-r-gray-100",
										product.specs.length - 1 === index && "justify-end",
									)}
								>
									<div className="text-black/40 text-sm">{spec.label}</div>
									<div className="text-bold text-lg">{spec.value}</div>
								</div>
							))}
						</div>
					</div>

					{/* Product description 商品详情 */}
					<div className="bg-white pt-4 flex flex-col gap-3">
						<div className="px-5">Product description</div>
						<div>
							{[
								"https://img.alicdn.com/imgextra/i1/2793385536/O1CN01LPijZ31qlXgU8nhbc_!!2793385536.jpg",
								"https://img.alicdn.com/imgextra/i1/2793385536/O1CN010IqmYG1qlXgNeuw0H_!!2793385536.jpg",
								"https://img.alicdn.com/imgextra/i3/2793385536/O1CN01cb1gey1qlXgNevba4_!!2793385536.jpg",
								"https://img.alicdn.com/imgextra/i1/2793385536/O1CN01avlsLM1qlXgV7KafS_!!2793385536.jpg",
								"https://img.alicdn.com/imgextra/i1/2793385536/O1CN01avlsLM1qlXgV7KafS_!!2793385536.jpg",
							].map((url) => (
								<img src={url} alt="text" key={url} />
							))}
						</div>
					</div>

					{/* Product videos 商品视频 */}
					<div className="bg-white px-5 py-4">
						<div>Product Videos</div>
						可以放生产过程的视频
					</div>

					{/* Product information 商品规格 */}
					<div className="bg-white px-5 py-4">
						<div>Product information</div>
					</div>
				</div>
			</div>

			{/* 底部的购买栏 */}
			<div className="px-5 flex justify-between items-center fixed bottom-0 w-full pb-6 pt-2 bg-white border-t border-solid border-t-gray-200">
				<div className="flex items-center gap-4">
					<div className="flex flex-col items-center gap-1">
						<SvgIcon name="MessageSquare" size={24} />
						{product.commentCount}
					</div>
					<div className="flex flex-col items-center gap-1">
						<SvgIcon name="HeartLine" size={24} />
						{product.heart}
					</div>
				</div>
				<div className="flex gap-3">
					<div className="py-4 min-w-35 rounded-full bg-[#69ab9a] text-white text-center">
						{t("Add to Cart")}
					</div>
					<div className="py-4 min-w-35 rounded-full bg-[#69ab9a] text-white text-center">
						{t("Buy now")}
					</div>
				</div>
			</div>
		</div>
	);
}
